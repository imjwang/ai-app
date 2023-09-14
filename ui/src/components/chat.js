"use client";

import { useChat } from "ai/react";
import Message from "@/components/message";
import { useState } from "react";
import ChatInput from "./chatinput";
import { cn } from "@/lib/utils";
import ExamplePrompts from "@/components/exampleprompts";

const Chat = ({ className }) => {
  const { setInput, input, handleInputChange, handleSubmit, messages } =
    useChat();

  return (
    <div
      className={cn(
        "flex flex-col items-center grow overflow-hidden",
        className
      )}
    >
      {messages.length === 0 ? (
        <ExamplePrompts
          placeholder="Chat UI"
          exampleTexts={[
            "Which company had the highest revenue?",
            "Who is Alexander Hamilton?",
            "What are the biggest discussed risks?",
          ]}
          setUserMessage={setInput}
        />
      ) : (
        <div className="flex flex-col-reverse grow w-full mb-4 overflow-auto transition-[flex-grow] ease-in-out">
          {[...messages].reverse().map(({ role, content, id }) => {
            return <Message key={id} variant={role} message={content} />;
          })}
        </div>
      )}

      <ChatInput
        setInput={setInput}
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        placeholder="Send a Message..."
      />
    </div>
  );
};

export default Chat;
