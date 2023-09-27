from io import BytesIO
from fastapi import FastAPI, UploadFile, HTTPException
from fastapi.responses import HTMLResponse
from fastapi import FastAPI
from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from langchain.document_loaders.blob_loaders import Blob
from langchain.document_loaders.parsers.generic import MimeTypeBasedParser
from langchain.document_loaders.parsers.pdf import PyPDFParser
from langchain.text_splitter import RecursiveCharacterTextSplitter
from typing import Annotated
from langchain.vectorstores import Chroma
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.chains import RetrievalQA
from langchain.chat_models import ChatOpenAI
import os
from dotenv import load_dotenv


load_dotenv()

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
llm = ChatOpenAI(model_name="gpt-3.5-turbo")
qa = RetrievalQA.from_llm(llm, retriever=db.as_retriever())

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


@app.post("/chat/")
async def chat(query: str):
    try:
        results = qa.run(query)
        return {"results": results}
    except Exception as e:
        raise HTTPException(status_code=400, detail="Query failed.")


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
