"use client";

// import { RenderConversations } from "@/components/documentchat";
import { useRef, useState, useEffect } from "react";
import Chat from "@/components/chat";
import { Separator } from "@/components/ui/separator";
import { Document, pdfjs, Page as PDFPage, Outline } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import type { PDFDocumentProxy } from "pdfjs-dist";
import { Button } from "@/components/ui/button";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

type PDFFile = string | File | null;

export default function Page() {
  const [file, setFile] = useState<PDFFile>("");
  const [numPages, setNumPages] = useState<number>(1);
  const [scale, setScale] = useState<number>(1);
  const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null);

  useEffect(() => {
    console.log(pdf);
    if (pdf) {
      pdf.getOutline().then(outline => console.log(outline));
    }
    return () => {
      setPdf(null);
    };
  }, [pdf]);

  function onFileChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { files } = event.target;

    if (files && files[0]) {
      setFile(files[0] || null);
    }
  }

  return (
    <div className="flex w-full h-[90vh] justify-around">
      <Chat
        announcements={[
          "Where is Thomas Jefferson's Home?",
          "What was Alexander Hamilton's role in the American Revolution?",
          "Where was The First Continental Congress held?",
        ]}
        className="p-12 w-[50vw]"
      />
      <Separator orientation="vertical" />
      <div className="w-[50vw] p-10 overflow-y-auto overscroll-contain">
        <div>
          <label htmlFor="file">Load from file:</label>{" "}
          <input onChange={onFileChange} type="file" />
          {/* TODO set bounds */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => setNumPages(e => e - 1)}
          >
            {"<"}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setNumPages(e => e + 1)}
          >
            {">"}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setScale(e => e - 0.2)}
          >
            {"-"}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setScale(e => e + 0.2)}
          >
            {"+"}
          </Button>
        </div>
        <Document
          file={file}
          onLoadSuccess={pdf => {
            setPdf(pdf);
            setNumPages(pdf.numPages - 1);
          }}
        >
          <Outline
          // onItemClick={({ dest, pageIndex, pageNumber }) =>
          //   console.log(dest, pageIndex, pageNumber)
          // }
          />
          {Array.from(new Array(numPages), (el, index) => (
            <PDFPage
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              scale={scale}
            />
          ))}

          {/* <PDFPage pageNumber={numPages} scale={scale} /> */}
        </Document>
      </div>
    </div>
  );
}
