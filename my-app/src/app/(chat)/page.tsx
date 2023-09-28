"use client";
import Chat from "@/components/chat";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChat } from "@/lib/hooks/use-chat";
import { useState } from "react";
import { useAtom } from "jotai";
import { messageAtom } from "@/lib/hooks/use-chat";
import { inputAtom } from "@/lib/hooks/use-chat";

export default function Home() {
  const [messages, setMessages] = useAtom(messageAtom);
  const { searchHandler } = useChat();
  const [input, setInput] = useAtom(inputAtom);

  return (
    <>
      <Chat
        className="p-2 lg:pb-12 lg:px-64 md:px-48 md:pb-8 sm:px-32 sm:pb-6"
        announcements={[
          "Who was the first person on the Moon?",
          "What is the capital of France?",
          "What is the largest country in the world?",
        ]}
      />
      <div className="prose">
        <p>{messages?.content}</p>
      </div>
      <Input value={input} onChange={e => setInput(e.target.value)} />
      <Button onClick={searchHandler}>useChat</Button>
    </>
  );
}
