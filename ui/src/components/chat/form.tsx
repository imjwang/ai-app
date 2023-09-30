import { Textarea } from "@/components/ui/textarea";
import { useRef, useState } from "react";
import SendButton from "./send";
import { useAtom, useAtomValue } from "jotai";
import { inputAtom, useChat, isLoadingAtom } from "@/lib/hooks/use-chat";

interface ChatFormProps {
  placeholder?: string;
  setIsFocused: React.Dispatch<React.SetStateAction<boolean>>;
  chatRef: React.RefObject<HTMLTextAreaElement>;
}

const ChatForm = ({
  placeholder = "Message Patchy the Pirate! 🏴‍☠️",
  setIsFocused,
  chatRef,
}: ChatFormProps) => {
  const { searchHandler } = useChat();
  const formRef = useRef(null);
  const loading = useAtomValue(isLoadingAtom);

  const [input, setInput] = useAtom(inputAtom);

  const handleResize = (reset = false) => {
    if (reset) {
      chatRef.current!.style.height = "50px";
    } else if (chatRef.current && chatRef.current.scrollHeight > 50) {
      chatRef.current.style.height = "auto";
      chatRef.current.style.height = `${chatRef.current.scrollHeight}px`;
    }
  };

  const handleform = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleResize(true);
    searchHandler();
  };

  const handleEnter = (e: any) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleform(e);
    }
  };

  return (
    <form
      className="flex items-center relative"
      onSubmit={handleform}
      ref={formRef}
    >
      <div className="w-full">
        <Textarea
          className="pr-20 text-lg resize-none"
          placeholder={placeholder}
          ref={chatRef}
          value={input}
          onKeyPress={handleEnter}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={e => {
            setInput(e.target.value);
            handleResize(e.target.value === "");
          }}
        />
      </div>
      <SendButton
        className="absolute w-12 h-10 right-1 bottom-1"
        loading={loading}
        disable={input === "" || loading}
      />
    </form>
  );
};

export default ChatForm;
