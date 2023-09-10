"use client";
import { RenderConversations } from "@/components/documentchat";
import { useState } from "react";
import ChatForm from "@/components/chatform";
import { useChat } from "ai/react";
import Tip from "@/components/tip";
import ChatInput from "@/components/chatinput";
import Chat from "@/components/chat";

export default function Page() {
  const { setInput, input, handleInputChange, handleSubmit, messages } =
    useChat();

  // console.log(messages);
  return (
    <div className="flex h-5/6 w-[44vw] flex-col items-center border-r-2 p-3">
      <div className="flex w-[44vw] flex-grow flex-col overflow-scroll">
        <RenderConversations messages={messages} setUserMessage={setInput} />
      </div>
      <div className="relative flex w-full items-center border-b-2 border-t">
        <ChatInput
          setInput={setInput}
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
