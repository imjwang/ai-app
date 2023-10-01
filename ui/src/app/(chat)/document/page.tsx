"use client";

// import { RenderConversations } from "@/components/documentchat";
import { useRef, useState } from "react";
import Chat from "@/components/chat";
import { Separator } from "@/components/ui/separator";
import { Document, pdfjs, Page as PDFPage } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import type { PDFDocumentProxy } from "pdfjs-dist";

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
  const [numPages, setNumPages] = useState<number>();

  function onFileChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { files } = event.target;

    if (files && files[0]) {
      setFile(files[0] || null);
    }
  }

  return (
    <div className="flex w-full h-full justify-around">
      <Chat
        announcements={[
          "Where is Thomas Jefferson's Home?",
          "What was Alexander Hamilton's role in the American Revolution?",
          "Where was The First Continental Congress held?",
        ]}
        className="p-12"
      />
      <Separator orientation="vertical" />
      <div className="w-[50vw] p-10 overflow-hidden">
        <div className="">
          <label htmlFor="file">Load from file:</label>{" "}
          <input onChange={onFileChange} type="file" />
        </div>
        <Document file={file}>
          <PDFPage pageNumber={1} />
        </Document>
      </div>
    </div>
  );
}
