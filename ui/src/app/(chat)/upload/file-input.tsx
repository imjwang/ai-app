"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { UploadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

const FileInput = () => {
  const [file, setFile] = useState<File | null>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files![0]);
  };

  const handleSubmit = async () => {
    //TODO change the html to a form
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("http://localhost:8000/upload/", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        setFile(null);
      }
    }
  };

  return (
    <>
      {file ? (
        <div className="prose">
          <h3 className="dark:text-white">Selected:</h3>
          <p className="text-sm italic dark: text-blue-400">{file.name}</p>
          <div className="flex space-x-3">
            <Button onClick={handleSubmit}>Upload</Button>
            <Button variant="destructive" onClick={() => setFile(null)}>
              Clear
            </Button>
          </div>
        </div>
      ) : (
        <div className="h-[60vh] w-full lg:w-1/2 sm:w-3/4 items-center bg-background">
          <Input
            className="cursor-pointer h-full w-full border-8 hover:border-green-700 border-dashed z-10 bg-transparent"
            type="file"
            onChange={handleFileChange}
          />
          <div className="flex flex-col items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <UploadIcon className="w-12 h-12 text-black dark:text-white" />
            <p className="pt-2 text-sm text-gray-600">
              Click or drag to upload
            </p>
          </div>
        </div>
      )}
    </>
  );
};
export default FileInput;
