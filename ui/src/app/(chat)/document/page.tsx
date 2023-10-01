"use client";

// import { RenderConversations } from "@/components/documentchat";
import { useRef } from "react";
import Chat from "@/components/chat";

export default function Page() {
  return (
    <div className="flex w-[50vw] h-full border-r-2">
      <Chat
        announcements={[
          "Where is Thomas Jefferson's Home?",
          "What was Alexander Hamilton's role in the American Revolution?",
          "Where was The First Continental Congress held?",
        ]}
        className="p-12"
      />
    </div>
  );
}
