"use client";
import Input from "./input";

import { useChat } from "@/lib/ai";
import { useRef, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
// import ExamplePrompts from "@/components/exampleprompts";
import MessageBox from "./message-box";
import Annoucement from "./announcement";
import { useAtom, useAtomValue } from "jotai";
import { inputAtom, messageAtom, isLoadingAtom } from "@/lib/hooks/use-chat";

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
  const [input, setInput] = useAtom(inputAtom);
  const loading = useAtomValue(isLoadingAtom);
  const message = useAtomValue(messageAtom);

  const chatRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (loading === false) {
      scrollToBottom();
    }
  }, [loading]);

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
      {message == null || message.size === 0 ? (
        <Announcement announcements={announcements} />
      ) : (
        <ChatBox ref={containerRef} />
      )}
      <ChatInput chatRef={chatRef} placeholder="Send a message!" />
    </div>
  );
}
