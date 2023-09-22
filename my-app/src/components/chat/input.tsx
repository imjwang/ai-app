"use client";

import Tip from "./tip";
import ChatForm from "./form";
import { useState } from "react";

interface ChatInputProps {
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  placeholder?: string;
  tip?: boolean;
  chatRef: React.RefObject<HTMLTextAreaElement>;
}

const ChatInput = ({
  handleSubmit,
  handleInputChange,
  placeholder,
  tip = true,
  chatRef,
}: ChatInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div className="flex w-full flex-col">
      <ChatForm
        handleSubmit={handleSubmit}
        setIsFocused={setIsFocused}
        chatRef={chatRef}
        placeholder={placeholder}
      />
      {tip && <Tip isFocused={isFocused} />}
    </div>
  );
};

export default ChatInput;
