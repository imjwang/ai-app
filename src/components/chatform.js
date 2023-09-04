"use client";

import { Textarea } from "@/components/ui/textarea";
import { useForm, Controller } from "react-hook-form";
import { useRef, useState, useEffect, useCallback } from "react";
import SubmitButton from "./submitbutton";

const ChatForm = () => {
  const { control, handleSubmit, reset } = useForm();
  const formRef = useRef(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResize = (reset = false) => {
    if (reset) {
      ref.current.style.height = "50px";
    } else if (ref.current && ref.current.scrollHeight > 50) {
      ref.current.style.height = "auto";
      ref.current.style.height = `${ref.current.scrollHeight}px`;
    }
  };

  const handleform = useCallback(
    data => {
      console.log(data);
      setMessage("");
      reset({ message: "" });
      handleResize(true);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    },
    [reset]
  );

  const ref = useRef(null);
  useEffect(() => {
    const handleSubmitShortcut = e => {
      if (ref.current === document.activeElement && e.key === "Enter") {
        if (!e.shiftKey) {
          e.preventDefault();
          handleSubmit(handleform)();
        }
      }
    };
    window.addEventListener("keydown", handleSubmitShortcut);
    return () => {
      window.removeEventListener("keydown", handleSubmitShortcut);
    };
  }, [handleSubmit, handleform]);

  return (
    <form
      className="flex items-center my-2 relative"
      onSubmit={handleSubmit(handleform)}
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
            placeholder="Message Patchy the Pirate! 🏴‍☠️"
            ref={ref}
            style={{ resize: "none" }}
            value={message}
            onChange={e => {
              setMessage(e.target.value);
              handleResize(e.target.value === "");
              field.onChange(e);
            }}
          />
        )}
      />
      <SubmitButton loading={loading} disable={message === ""} />
    </form>
  );
};

export default ChatForm;
