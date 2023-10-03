"use client";

import Chat from "@/components/chat";
import { Separator } from "@/components/ui/separator";
import React, { useEffect, useState } from "react";

import * as BabelStandalone from "@babel/standalone";

function LLMComponent({ llmOutput }: any) {
  const [Component, setComponent] = useState<React.FC | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && BabelStandalone && llmOutput) {
      const jsxContent = `() => {   return (
        ${llmOutput}
      ); }`;

      // Transpile the JSX to JavaScript
      const transpiledCode = BabelStandalone.transform(jsxContent, {
        presets: ["react"],
      }).code;

      // Convert the JavaScript string into a function which returns a React element
      const DynamicReactComponent = new Function(
        "React",
        `return ${transpiledCode}`
      )(React);
      setComponent(() => DynamicReactComponent);
    }
  }, [llmOutput]);

  return Component ? <Component /> : null;
}

function unescapeJSXString(escapedStr: string): string {
  const replacements: { [key: string]: string } = {
    '\\"': '"',
    "\\'": "'",
    "\\n": "\n",
    "\\t": "\t",
    "\\\\": "\\",
  };

  return Object.keys(replacements).reduce((str, key) => {
    return str.replace(new RegExp(key, "g"), replacements[key]);
  }, escapedStr);
}

export default function Page() {
  // const llmOutput = `<div className=\"prose prose-2xl text-center hover:sepia hover:brightness-75 transition-all duration-200 ease-in-out\">\n  <h1 className=\"tracking-tight text-bold dark:text-green-300 hover:text-cyan-500 transition-colors duration-200\">\n    Welcome to the UI for <span className=\"text-cyan-500\">Chat</span>!! 🎉\n  </h1>\n  <p className=\"text-lg leading-8 text-gray-600 dark:text-yellow-300 hover:text-gray-500 transition-colors duration-200\">\n    Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui\n    lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat\n    fugiat aliqua.\n  </p>\n</div>`;
  const [llmOutput, setLlmOutput] = useState<string>("");
  // // const llmOutput =
  // // '<div className="p-4 bg-blue-500 text-white max-w-xs mx-auto">\n            Placeholder Text\n        </div>';
  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify({
          message: `Given this code, return a styled version that does some crazy bounce effects. You are only allowed to use react and tailwindcss. Be concise and do not explain the code! Code: 
          <div className="prose prose-2xl text-center filter sepia hover:sepia-0 transition duration-500 ease-in-out">
          <h1 className="tracking-tight text-bold dark:text-green-300 hover:text-purple-600 transition duration-500 ease-in-out">
            Welcome to the UI for <span className="text-cyan-500 hover:text-red-600 transition duration-500 ease-in-out">Chat</span>!! 🎉
          </h1>
          <p className="text-lg leading-8 text-gray-600 dark:text-yellow-300 hover:text-black transition duration-500 ease-in-out">
            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
            lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
            fugiat aliqua.
          </p>
        </div>`,
        }),
      });
      const data = await res.json();
      const cleanData = unescapeJSXString(data);
      setLlmOutput(cleanData);
    }
    fetchData();
  }, []);
  return (
    <div className="flex w-full h-[90vh] justify-around">
      <Chat
        announcements={[
          "Create a tailwind div that is w-64 h-64 and bg-purple-300",
        ]}
        className="p-12 w-[50vw]"
      />
      <Separator orientation="vertical" />
      <div className="w-[50vw] p-10 overflow-y-auto overscroll-contain">
        <LLMComponent llmOutput={llmOutput} />
      </div>
    </div>
  );
}
