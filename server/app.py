from fastapi import FastAPI, UploadFile, HTTPException, Request
from fastapi.responses import HTMLResponse, StreamingResponse
from fastapi import FastAPI
from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from langchain.document_loaders.blob_loaders import Blob
from langchain.document_loaders.parsers.generic import MimeTypeBasedParser
from langchain.document_loaders.parsers.pdf import PyPDFParser
from langchain.text_splitter import RecursiveCharacterTextSplitter
from typing import Annotated, Iterator, AsyncIterable, Awaitable
from langchain.vectorstores import Chroma
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.chains import RetrievalQA
from langchain.chat_models import ChatOpenAI
from langchain.llms.openai import OpenAI
import logging
import os
from dotenv import load_dotenv
import anyio
from anyio.streams.memory import MemoryObjectSendStream
from sse_starlette.sse import EventSourceResponse
from starlette.concurrency import run_in_threadpool, iterate_in_threadpool
from functools import partial
import json
from pydantic import BaseModel
import asyncio
from langchain.chains import LLMChain
from langchain.schema import (
    HumanMessage
)
from langchain.prompts.chat import ChatPromptTemplate
from langchain.prompts import PromptTemplate
import uvicorn
from langchain.callbacks.streaming_aiter import AsyncIteratorCallbackHandler
import langchain
import chromadb


langchain.debug = True

load_dotenv()
logger = logging.getLogger(__name__)
app = FastAPI()


async def get_event_publisher(
    request: Request,
    inner_send_chan: MemoryObjectSendStream,
    iterator: Iterator,
):
    async with inner_send_chan:
        try:
            async for chunk in iterate_in_threadpool(iterator):
                await inner_send_chan.send(dict(data=json.dumps(chunk)))
                if await request.is_disconnected():
                    raise anyio.get_cancelled_exc_class()()
            await inner_send_chan.send(dict(data="[DONE]"))
        except anyio.get_cancelled_exc_class() as e:
            print("disconnected")
            with anyio.move_on_after(1, shield=True):
                print(
                    f"Disconnected from client (via refresh/close) {request.client}")
                raise e


# Add CORS middleware
origins = [
    "http://localhost:3000",  # React default
    "http://localhost:8000",  # FastAPI default
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


embeddings = OpenAIEmbeddings()
db = Chroma(collection_name="my_collection", embedding_function=embeddings,
            persist_directory=os.environ["PERSIST_DIRECTORY"])
# llm = ChatOpenAI(model_name="gpt-3.5-turbo", streaming=True)
callback = AsyncIteratorCallbackHandler()
llm = ChatOpenAI(
    streaming=True,
    verbose=True,
    callbacks=[callback],
)
qa = RetrievalQA.from_llm(llm, retriever=db.as_retriever(), verbose=True)

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=256,
    chunk_overlap=32,
    length_function=len,
    is_separator_regex=False
)


@app.post("/upload/")
async def upload_file(file: UploadFile | None = None):
    try:
        file_contents = await file.read()
        blob = Blob.from_data(
            file_contents, mime_type=file.content_type, path=file.filename)

        parser = MimeTypeBasedParser(
            handlers={
                "application/pdf": PyPDFParser(),
            },
            fallback_parser=None,
        )
        try:
            document = parser.parse(blob)
            split_documents = text_splitter.split_documents(document)
            db.add_documents(split_documents)
        except Exception as e:
            print(e)
        # You can now process the file_contents or save it, etc.
        return {"filename": file.filename}
    except Exception as e:
        raise HTTPException(status_code=400, detail="File upload failed.")


@app.post("/query/")
async def query(query: str):
    try:
        results = db.similarity_search(query)
        return {"results": results}
    except Exception as e:
        raise HTTPException(status_code=400, detail="Query failed.")


class Message(BaseModel):
    message: str


@app.post("/chat/completions/")
async def chat(request: Request, message: Message):
    results = await run_in_threadpool(qa.stream, message.message)

    if isinstance(results, Iterator):
        first_response = await run_in_threadpool(next, results)

        def iterator():
            yield first_response
            yield from results

        send, recv = anyio.create_memory_object_stream(10)
        return EventSourceResponse(
            recv,
            data_sender_callable=partial(
                get_event_publisher,
                request=request,
                inner_send_chan=send,
                iterator=iterator()
            )
        )


async def send_message(message: str) -> AsyncIterable[str]:
    response_tokens = []
    callback2 = AsyncIteratorCallbackHandler()
    chat_llm = ChatOpenAI(
        streaming=True,
        verbose=True,
        callbacks=[callback2],
    )

    TEST_PROMPT = ChatPromptTemplate.from_messages([
        ("system", "You are a wondrous wizard of math."),
        ("human", f"{message}"),
    ])
    headlessChain = LLMChain(llm=chat_llm, prompt=TEST_PROMPT)

    llm = OpenAI(model_name="gpt-4",
                 streaming=True, callbacks=[callback2])

    embeddings = OpenAIEmbeddings()

    prompt_template = """Use the following pieces of context to answer the question at the end. If you don't know the answer, make up a ridiculous one.

{context}

Question: {question}
Answer like the most outrageous pirate and always make a joke after answering:
"""

    PROMPT = PromptTemplate(
        template=prompt_template, input_variables=["context", "question"]
    )

    chain_type_kwargs = {"prompt": PROMPT}

    db = Chroma(collection_name="my_collection", embedding_function=embeddings,
                persist_directory=os.environ["PERSIST_DIRECTORY"])

    qa = RetrievalQA.from_chain_type(llm, chain_type="stuff", retriever=db.as_retriever(
    ), chain_type_kwargs=chain_type_kwargs, verbose=True)

    async def wrap_done(fn: Awaitable, event: asyncio.Event):
        """Wrap an awaitable with a event to signal when it's done or an exception is raised."""
        try:
            await fn
        except Exception as e:
            # TODO: handle exception
            print(f"Caught exception: {e}")
        finally:
            # Signal the aiter to stop.
            event.set()

    # Begin a task that runs in the background.
    # test getting chat history
    task = asyncio.create_task(wrap_done(
        # headlessChain.acall({}),
        qa.acall(message),
        callback.done),
    )

    async for token in callback2.aiter():
        # Use server-sent-events to stream the response
        logger.info(f"Sending token: {token}")
        response_tokens.append(token)
        test = {'data': token}
        yield f"data: {json.dumps(test)}"

    await task

    test = "".join(response_tokens)
    # print(test)


class StreamRequest(BaseModel):
    """Request body for streaming."""
    message: str


@app.post("/stream")
def stream(body: StreamRequest):
    return StreamingResponse(send_message(body.message), media_type="text/event-stream")


@app.get("/chroma")
def chroma():
    client = chromadb.PersistentClient(path=os.environ["PERSIST_DIRECTORY"])
    collections = client.list_collections()
    return collections


# TODO replace this or remove
@app.get("/")
def main():
    content = """
<body>
<form ref='uploadForm' 
      action='/upload/' 
      method='post' 
      enctype='multipart/form-data'>
  <input type="file" name="file" />
  <input type='submit' value='Upload!' />
</form>     
</body>
    """
    return HTMLResponse(content=content)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
