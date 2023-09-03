"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import ThemeSwitch from "@/components/ui/ThemeSwitch";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { useRef, useState } from "react";
import { PaperPlaneIcon } from "@radix-ui/react-icons";

export default function Home() {
  const ref = useRef(null);
  const [expanded, setExpanded] = useState("right-0 bottom-0");
  const handleResize = () => {
    ref.current.style.height = "auto";
    ref.current.style.height = `${ref.current.scrollHeight}px`;
    if (ref.current?.scrollHeight > 36) {
      setExpanded("right-2 bottom-2");
    } else {
      setExpanded("right-1 bottom-1");
    }
  };

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between px-24 pb-24">
        <div className="h-16 bg-blue-400 w-screen flex flex-row place-content-between items-center px-3">
          <div className="prose">
            <h1
              className="text-blue-200"
              style={{
                WebkitUserSelect: "none",
                MozUserSelect: "none",
                msUserSelect: "none",
                userSelect: "none",
              }}
            >
              Chatbot
            </h1>
          </div>
          <ThemeSwitch className="place-self-end" />
        </div>
        <Card className="absolute bottom-10 w-3/4 p-4">
          <CardTitle>Chat Interface</CardTitle>
          <CardDescription>Talking to Patchy the Pirate! 🏴‍☠️</CardDescription>
          <CardContent>
            <div className="flex w-full items-center my-2 relative">
              <Textarea
                className="pr-24"
                rows={1}
                style={{ resize: "none" }}
                onChange={handleResize}
                ref={ref}
              />
              <Button
                size="icon"
                variant="outline"
                className={`absolute w-12 h-7 ${expanded}`}
              >
                <PaperPlaneIcon />
              </Button>
            </div>
          </CardContent>
          <CardFooter className="justify-end"></CardFooter>
        </Card>
      </main>
    </>
  );
}
