import { Textarea } from "@/components/ui/textarea";
import { useRef, useState } from "react";
import SendButton from "./send";
import { useAtom } from "jotai";
import { inputAtom } from "@/lib/utils";

interface ChatFormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  placeholder?: string;
  setIsFocused: React.Dispatch<React.SetStateAction<boolean>>;
  chatRef: React.RefObject<HTMLTextAreaElement>;
}

const ChatForm = ({
  handleSubmit,
  placeholder = "Message Patchy the Pirate! 🏴‍☠️",
  setIsFocused,
  chatRef,
}: ChatFormProps) => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);

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
    handleResize(true);
    setLoading(true);
    handleSubmit(e);

    setLoading(false);
  };

  const handleEnter = (e: any) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleform(e);
    }
  };

  return (
    <form
      className="flex items-center my-2 relative"
      onSubmit={handleform}
      ref={formRef}
    >
      <div className="w-full ">
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
        className="absolute w-12 h-10 mr-1 right-0.5 bottom-1"
        loading={loading}
        disable={input === "" || loading}
      />
    </form>
  );
};

export default ChatForm;
