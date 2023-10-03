from fastapi import FastAPI, UploadFile, HTTPException, Request, status
from fastapi.responses import HTMLResponse, StreamingResponse
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from langchain.document_loaders.blob_loaders import Blob
from langchain.document_loaders.parsers.generic import MimeTypeBasedParser
from langchain.document_loaders.parsers.pdf import PyPDFParser
from langchain.text_splitter import RecursiveCharacterTextSplitter
from typing import Annotated, Iterator, AsyncIterable, Awaitable, Optional
from langchain.vectorstores import Chroma
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.chains import RetrievalQA
from langchain.chat_models import ChatOpenAI
from langchain.llms.openai import OpenAI
import logging
import os
from dotenv import load_dotenv
import json
from pydantic import BaseModel
import asyncio
from langchain.prompts import PromptTemplate
import uvicorn
from langchain.callbacks.streaming_aiter import AsyncIteratorCallbackHandler
import langchain
import chromadb
from chromadb import CollectionMetadata

from langchain.agents import AgentExecutor
from langchain.agents.output_parsers import ReActSingleInputOutputParser
from langchain.agents.format_scratchpad import format_log_to_str
from langchain.tools.render import render_text_description
from langchain import hub
from langchain.agents import load_tools


langchain.debug = True

load_dotenv()
logger = logging.getLogger(__name__)
app = FastAPI()


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
# llm = ChatOpenAI(
#     streaming=True,
#     verbose=True,
#     callbacks=[callback],
# )
# qa = RetrievalQA.from_llm(llm, retriever=db.as_retriever(), verbose=True)

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


async def send_message(message: str) -> AsyncIterable[str]:
    response_tokens = []
    callback2 = AsyncIteratorCallbackHandler()

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
        data = {'data': token}
        yield f"data: {json.dumps(data)}"

    await task


class StreamRequest(BaseModel):
    """Request body for streaming."""
    message: str


@app.post("/stream")
def stream(body: StreamRequest):
    return StreamingResponse(send_message(body.message), media_type="text/event-stream")


class GenerateRequest(BaseModel):
    """Request body for generating."""
    message: str


def helper(output: str):
    i, j = 0, len(output)-1
    while i < j:
        if output[i] == '<' and output[j] == '>':
            return i, j
        if output[i] != '<':
            i += 1
        if output[j] != '>':
            j -= 1

    return i, j


@app.post("/generate")
def generate(body: GenerateRequest):
    llm = OpenAI(model_name="gpt-4")
    tools = load_tools(["llm-math"], llm=llm)
    prompt = hub.pull("hwchase17/react")
    prompt = prompt.partial(
        tools=render_text_description(tools),
        tool_names=", ".join([t.name for t in tools]),
    )
    llm_with_stop = llm.bind(stop=["\nObservation"])

    agent = {
        "input": lambda x: x["input"],
        "agent_scratchpad": lambda x: format_log_to_str(x['intermediate_steps'])
    } | prompt | llm_with_stop | ReActSingleInputOutputParser()

    agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=True)
    test = agent_executor.invoke({"input": body.message})

    i, j = helper(test["output"])
    return {"component": test["output"][i:j+1]}


@app.get("/chroma")
def chroma():
    client = chromadb.PersistentClient(path=os.environ["PERSIST_DIRECTORY"])
    collections = client.list_collections()
    return collections


@app.delete("/chroma", status_code=status.HTTP_200_OK)
def chroma():
    client = chromadb.PersistentClient(path=os.environ["PERSIST_DIRECTORY"])
    result = client.reset()
    if result:
        return {"message": "chroma database reset"}

    return {"message": "failed to reset chroma database"}


class CreateCollectionRequest(BaseModel):
    """
    name - The name of the collection to create.
    metadata - Optional metadata to associate with the collection.
    embedding_function - Optional function to use to embed documents. Uses the default embedding function if not provided.
    get_or_create - If True, return the existing collection if it exists.
    """
    name: str
    metadata: Optional[CollectionMetadata] = None


@app.post("/chroma", status_code=status.HTTP_201_CREATED)
def chroma(body: CreateCollectionRequest):
    client = chromadb.PersistentClient(path=os.environ["PERSIST_DIRECTORY"])
    try:
        client.create_collection(**body.dict())
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    return {"message": f"chroma collection: {body.name} created"}


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
