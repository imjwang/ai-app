"use client";
import Input from "./input";

import { useChat } from "ai/react";
import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
// import ExamplePrompts from "@/components/exampleprompts";
import MessageBox from "./message-box";
import Message from "./message";

interface ChatProps {
  className?: string;
  ChatInput?: React.ComponentType<any>;
  ChatBox?: React.ComponentType<any>;
  Placeholder?: React.ComponentType<any>;
}

export default function Chat({
  className,
  ChatInput = Input,
  ChatBox = MessageBox,
  Placeholder = Message,
}: ChatProps) {
  const {
    setInput,
    input,
    handleInputChange,
    handleSubmit,
    messages,
    isLoading,
  } = useChat();

  const chatRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (isLoading === false) {
      scrollToBottom();
    }
  }, [isLoading]);

  const handleClick = (t: string) => {
    setInput(t);
    if (chatRef) {
      chatRef.current!.focus();
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center grow overflow-hidden",
        className
      )}
    >
      {messages.length === 0 ? (
        <Placeholder handleClick={handleClick} />
      ) : (
        <MessageBox messages={messages} ref={containerRef} />
      )}
      <ChatInput
        setInput={setInput}
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        chatRef={chatRef}
      />
    </div>
  );
}
