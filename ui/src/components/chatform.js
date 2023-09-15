"use client";

import { Textarea } from "@/components/ui/textarea";
import { useForm, Controller } from "react-hook-form";
import { useRef, useState } from "react";
import SubmitButton from "./submitbutton";

const ChatForm = ({
  setInput,
  input,
  handleInputChange,
  handleSubmit,
  placeholder = "Message Patchy the Pirate! 🏴‍☠️",
  setIsFocused,
  chatRef,
}) => {
  const { control, reset } = useForm();

  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleResize = (reset = false) => {
    if (reset) {
      chatRef.current.style.height = "50px";
    } else if (chatRef.current && chatRef.current.scrollHeight > 50) {
      chatRef.current.style.height = "auto";
      chatRef.current.style.height = `${chatRef.current.scrollHeight}px`;
    }
  };

  const handleform = e => {
    setInput("");
    reset({ message: "" });

    handleResize(true);
    setLoading(true);
    handleSubmit(e);

    setLoading(false);
  };

  const handleEnter = e => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleform(e);
    }
  };

  return (
    <>
      <form
        className="flex items-center my-2 relative"
        onSubmit={handleform}
        ref={formRef}
      >
        <Controller
          name="message"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Textarea
              {...field}
              className="pr-20 text-lg"
              placeholder={placeholder}
              ref={chatRef}
              style={{ resize: "none" }}
              value={input}
              onKeyPress={handleEnter}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChange={e => {
                handleInputChange(e);
                handleResize(e.target.value === "");
                field.onChange(e);
              }}
            />
          )}
        />
        <SubmitButton
          className="absolute w-12 h-10 mr-1 right-0.5 bottom-1"
          loading={loading}
          disable={input === ""}
        />
      </form>
    </>
  );
};

export default ChatForm;
