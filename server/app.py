from io import BytesIO
from fastapi import FastAPI, UploadFile, HTTPException
from fastapi.responses import HTMLResponse
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from langchain.document_loaders.blob_loaders import Blob
from langchain.document_loaders.parsers.generic import MimeTypeBasedParser
from langchain.document_loaders.parsers.pdf import PyMuPDFParser, PyPDFParser
import fitz


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


@app.post("/upload/")
async def upload_file(file: UploadFile = UploadFile(...)):
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
            print(document)
        except Exception as e:
            print(e)
        # You can now process the file_contents or save it, etc.
        return {"filename": file.filename}
    except Exception as e:
        raise HTTPException(status_code=400, detail="File upload failed.")


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
