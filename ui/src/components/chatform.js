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
}) => {
  const { control, reset } = useForm();

  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleResize = (reset = false) => {
    if (reset) {
      ref.current.style.height = "50px";
    } else if (ref.current && ref.current.scrollHeight > 50) {
      ref.current.style.height = "auto";
      ref.current.style.height = `${ref.current.scrollHeight}px`;
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

  const ref = useRef(null);

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
              ref={ref}
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
