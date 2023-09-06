"use client";

import Tip from "./tip";
import ChatForm from "./chatform";
import { useChat } from "ai/react";
import Message from "@/components/message";

const ChatBox = () => {
  const { setInput, input, handleInputChange, handleSubmit, messages } =
    useChat();
  return (
    <div className="flex flex-col items-center p-24 grow overflow-hidden">
      <div className="flex flex-col-reverse grow w-full mb-4 overflow-auto transition-[flex-grow] ease-in-out">
        {[...messages].reverse().map(({ role, content, id }) => {
          return <Message key={id} variant={role} message={content} />;
        })}
      </div>
      <div className="flex w-full flex-col">
        <ChatForm
          setInput={setInput}
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
        <Tip />
      </div>
    </div>
  );
};

export default ChatBox;
