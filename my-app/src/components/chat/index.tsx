"use client";
import Input from "./input";

import { useChat } from "ai/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";
// import ExamplePrompts from "@/components/exampleprompts";
import Message from "./message";

interface ChatProps {
  className?: string;
}

export default function Chat({ className }: ChatProps) {
  const { setInput, input, handleInputChange, handleSubmit, messages } =
    useChat();

  const chatRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div
      className={cn(
        "flex flex-col items-center grow overflow-hidden",
        className
      )}
    >
      {messages.length === 0 ? (
        <p>asdf</p>
      ) : (
        <div className="flex flex-col-reverse grow w-full mb-4 overflow-auto transition-[flex-grow] ease-in-out">
          {[...messages].reverse().map(({ role, content, id }) => {
            return <Message key={id} variant={role} message={content} />;
          })}
        </div>
      )}
      <Input
        setInput={setInput}
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        chatRef={chatRef}
      />
    </div>
  );
}
