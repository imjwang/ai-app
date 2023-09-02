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

export default function Home() {
  return (
    <>
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
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
          <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
            Get started by editing&nbsp;
            <code className="font-mono font-bold">src/app/page.js</code>
          </p>
          <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
            <a
              className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
              href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                className="dark:invert"
                width={100}
                height={24}
                priority
              />
            </a>
          </div>
        </div>
        <Card className="absolute bottom-0 w-2/3 p-4">
          <CardTitle>Chat Interface</CardTitle>
          <CardDescription>Talking to Patchy the Pirate! 🏴‍☠️</CardDescription>
          <CardContent>
            <div className="items-center my-2">
              <Textarea style={{ resize: "none" }} />
            </div>
          </CardContent>
          <CardFooter className="justify-center">
            <Button>Submit</Button>
          </CardFooter>
        </Card>
      </main>
    </>
  );
}
