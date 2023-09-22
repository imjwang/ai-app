"use client";
import Input from "./input";

import { useChat } from "@/lib/ai";
import { useRef, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
// import ExamplePrompts from "@/components/exampleprompts";
import MessageBox from "./message-box";
import Annoucement from "./announcement";
import { useAtom } from "jotai";
import { inputAtom } from "@/lib/utils";

interface ChatProps {
  className?: string;
  ChatInput?: React.ComponentType<any>;
  ChatBox?: React.ComponentType<any>;
  Announcement?: React.ComponentType<any>;
  announcements?: string[];
}

export default function Chat({
  className,
  ChatInput = Input,
  ChatBox = MessageBox,
  Announcement = Annoucement,
  announcements = [],
}: ChatProps) {
  const { handleSubmit, messages, isLoading } = useChat({ inputAtom });

  const [input, setInput] = useAtom(inputAtom);

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
        <Announcement announcements={announcements} />
      ) : (
        <ChatBox messages={messages} ref={containerRef} />
      )}
      <ChatInput
        handleSubmit={handleSubmit}
        chatRef={chatRef}
        placeholder="Send a message!"
      />
    </div>
  );
}
