"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Control() {
  const [collectionName, setCollectionName] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("http://127.0.0.1:8000/chroma", {
        method: "POST",
        body: JSON.stringify({ name: collectionName }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(await res.json());
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteDatabase = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/chroma", {
        method: "DELETE",
      });
      console.log(await res.json());
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="inline-flex gap-6">
        {/* TODO form can include metadata */}
        <Input
          className="w-1/2"
          value={collectionName}
          onChange={e => setCollectionName(e.target.value)}
        />
        <Button type="submit">Add</Button>
      </form>
      <Button variant="destructive" size="lg" onClick={handleDeleteDatabase}>
        Reset Database
      </Button>
    </>
  );
}
