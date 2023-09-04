"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/navbar";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { useRef, useState, useEffect, useCallback } from "react";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { useForm, Controller, set } from "react-hook-form";

export default function Home() {
  const { control, handleSubmit, reset } = useForm();
  const formRef = useRef(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResize = (reset = false) => {
    if (reset) {
      ref.current.style.height = "40px";
    } else if (ref.current && ref.current.scrollHeight > 40) {
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
      //create a timer for 3 seconds of loading
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
    <>
      <main className="flex min-h-screen flex-col items-center justify-between px-24 pb-24">
        <NavBar />
        <Card className="absolute bottom-10 w-4/5 p-4">
          <CardTitle>Chat Interface</CardTitle>
          <CardDescription>Talking to Patchy the Pirate! 🏴‍☠️</CardDescription>
          <CardContent>
            <form
              className="flex w-full items-center my-2 relative"
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
                    className="pr-20"
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
              {loading ? (
                <div className="inline-flex items-center justify-center absolute w-12 h-8 mr-1 right-0.5 bottom-1">
                  <div className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] text-blue-500"></div>
                </div>
              ) : (
                <Button
                  size="icon"
                  variant="primary"
                  className="absolute w-12 h-8 mr-1 right-0.5 bottom-1 bg-teal-400 hover:bg-teal-500"
                  type="submit"
                  disabled={message === ""}
                >
                  <PaperPlaneIcon className="fill-white stroke-white" />
                </Button>
              )}
            </form>
          </CardContent>
          <CardFooter>
            <div className="prose dark:prose-invert tracking-tight text-sm">
              <p>
                <strong>
                  Press{" "}
                  <kbd className="bg-slate-400 py-0.5 px-1.5 rounded">⏎</kbd> to
                  send,{" "}
                  <kbd className="bg-slate-400 py-0.5 px-1.5 rounded">
                    shift
                  </kbd>{" "}
                  + <kbd className="bg-slate-400 py-0.5 px-1.5 rounded">⏎</kbd>{" "}
                  to add a new line.
                </strong>
              </p>
            </div>
          </CardFooter>
        </Card>
      </main>
    </>
  );
}
