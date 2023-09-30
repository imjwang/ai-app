"use client";

import Tip from "./tip";
import ChatForm from "./form";
import { useState } from "react";

interface ChatInputProps {
  placeholder?: string;
  tip?: boolean;
  chatRef: React.RefObject<HTMLTextAreaElement>;
}

const ChatInput = ({ placeholder, tip = true, chatRef }: ChatInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div className="flex w-full flex-col gap-3">
      <ChatForm
        setIsFocused={setIsFocused}
        chatRef={chatRef}
        placeholder={placeholder}
      />
      {tip && <Tip isFocused={isFocused} />}
    </div>
  );
};

export default ChatInput;
