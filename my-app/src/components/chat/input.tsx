"use client";

import Tip from "./tip";
import ChatForm from "./form";
import { useState, useRef } from "react";
import { useChat } from "ai/react";

interface ChatInputProps {
  tip?: boolean;
}

const ChatInput = ({
  // setInput,
  // input,
  // handleSubmit,
  // handleInputChange,
  // placeholder,
  tip = true,
}: // chatRef,
ChatInputProps) => {
  const { input, setInput, handleSubmit, handleInputChange } = useChat();
  const chatRef = useRef<HTMLTextAreaElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  return (
    <div className="flex w-full flex-col">
      <ChatForm
        setInput={setInput}
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        setIsFocused={setIsFocused}
        chatRef={chatRef}
      />
      {tip && <Tip isFocused={isFocused} />}
    </div>
  );
};

export default ChatInput;
