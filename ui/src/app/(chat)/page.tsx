"use client";
import Chat from "@/components/chat";
import { Provider } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import { initAtom } from "@/lib/hooks/use-chat";


const HydrateAtoms = ({initialValues, children}:any) => {
  useHydrateAtoms(initialValues);
  return children;
}

const ChatDisplay = ({initialMessageValues}:any) => (
  <Provider>
    <HydrateAtoms initialValues={[[initAtom, initialMessageValues]]}>
      <Chat
        className="p-2 lg:pb-12 lg:px-64 md:px-48 md:pb-8 sm:px-32 sm:pb-6"
        announcements={[
          "Who was the first person on the Moon?",
          "What is the capital of France?",
          "What is the largest country in the world?",
        ]}
      />
    </HydrateAtoms>
  </Provider>
)

export default function Home() {
  return (
    <>
    <ChatDisplay initialMessageValues={null} />
    {/* <ChatDisplay initialMessageValues={null} /> */}
    </>
  );
}
