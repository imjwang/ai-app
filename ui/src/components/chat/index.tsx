"use client";
import Input from "./input";

import { useRef, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
// import ExamplePrompts from "@/components/exampleprompts";
import MessageBox from "./message-box";
import Annoucement from "./announcement";
import { useAtomValue, Provider } from "jotai";
import { messageAtom, isLoadingAtom, initAtom } from "@/lib/hooks/use-chat";
import { useHydrateAtoms } from "jotai/utils";

interface ChatProps {
  className?: string;
  ChatInput?: React.ComponentType<any>;
  ChatBox?: React.ComponentType<any>;
  Announcement?: React.ComponentType<any>;
  announcements?: string[];
}

function ChatLayout({
  className,
  ChatInput = Input,
  ChatBox = MessageBox,
  Announcement = Annoucement,
  announcements = [],
}: ChatProps) {
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

  return (
    <div
      className={cn(
        "flex flex-col items-center grow overflow-hidden",
        className
      )}
    >
      {message == null || message.size === 0 ? (
        <Announcement announcements={announcements} chatRef={chatRef} />
      ) : (
        <ChatBox ref={containerRef} />
      )}
      <ChatInput chatRef={chatRef} placeholder="Send a message!" />
    </div>
  );
}

function HydrateAtoms({ initialValues, children }: any) {
  useHydrateAtoms(initialValues);
  return children;
}

export default function Chat({
  className,
  ChatInput = Input,
  ChatBox = MessageBox,
  Announcement = Annoucement,
  announcements = [],
  initialMessageValues = null,
}: ChatProps & { initialMessageValues?: any }) {
  return (
    <Provider>
      <HydrateAtoms initialValues={[[initAtom, initialMessageValues]]}>
        <ChatLayout className={className} announcements={announcements} />
      </HydrateAtoms>
    </Provider>
  );
}
