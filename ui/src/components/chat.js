"use client";

import { useChat } from "ai/react";
import Message from "@/components/message";
import { useRef, useEffect } from "react";
import ChatInput from "./chatinput";
import { cn } from "@/lib/utils";
import ExamplePrompts from "@/components/exampleprompts";
import { getGreeter } from "@jwai/npm-test";
import { Container } from "lucide-react";

const Chat = ({ className }) => {
  const {
    setInput,
    input,
    handleInputChange,
    handleSubmit,
    messages,
    isLoading,
  } = useChat();

  const t = getGreeter({ name: "Jeff", age: 25, happiness: 11 });
  t.greet();

  const chatRef = useRef(null);
  const containerRef = useRef(null);

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

  const handleClick = t => {
    setInput(t);
    if (chatRef) {
      chatRef.current.focus();
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
        <ExamplePrompts
          placeholder="Chat UI"
          exampleTexts={[
            "Which company had the highest revenue?",
            "Who is Alexander Hamilton?",
            "What are the biggest discussed risks?",
          ]}
          handleClick={handleClick}
        />
      ) : (
        <div
          className="flex flex-col-reverse grow w-full mb-4 overflow-auto transition-[flex-grow] ease-in-out scroll-smooth"
          ref={containerRef}
        >
          {[...messages].reverse().map(({ role, content, id }) => {
            return <Message key={id} variant={role} message={content} />;
          })}
        </div>
      )}

      <ChatInput
        setInput={setInput}
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        placeholder="Send a Message..."
        chatRef={chatRef}
      />
    </div>
  );
};

export default Chat;
