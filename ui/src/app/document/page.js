"use client";

import { RenderConversations } from "@/components/documentchat";
import { useChat } from "ai/react";
import ChatInput from "@/components/chatinput";

export default function Page() {
  const { setInput, input, handleInputChange, handleSubmit, messages } =
    useChat();

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
          placeholder="Talk to your documents..."
          tip={false}
        />
      </div>
    </div>
  );
}
