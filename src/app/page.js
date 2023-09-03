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
      reset();
      setMessage("");
      handleResize(true);
    },
    [reset]
  );

  const ref = useRef(null);
  useEffect(() => {
    const handleSubmitShortcut = e => {
      if (ref.current === document.activeElement && e.key === "Enter") {
        if (e.ctrlKey || e.metaKey) {
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
        <Card className="absolute bottom-10 w-3/4 p-4">
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
              {/* <Textarea
                className="py-4 pr-20"
                rows={1}
                style={{ resize: "none" }}
                {...field}
                ref={ref}
                onChange={e => {
                  field.onChange(e);
                  handleResize(e);
                }}
              /> */}
              <Button
                size="icon"
                variant="outline"
                className="absolute w-12 h-8 mr-1 right-0.5 bottom-1"
                type="submit"
              >
                <PaperPlaneIcon />
              </Button>
            </form>
          </CardContent>
          <CardFooter className="justify-end"></CardFooter>
        </Card>
      </main>
    </>
  );
}
