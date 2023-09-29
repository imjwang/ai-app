import MessageBubble from "./message";
import { forwardRef } from "react";
import { Message } from "@/lib/hooks/use-chat";
import { useAtomValue } from "jotai";
import { messageAtom } from "@/lib/hooks/use-chat";


const MessageBox = forwardRef<HTMLDivElement>(
  (_, ref) => {
    const message = useAtomValue(messageAtom);
    const messages = [...message.values()]
      .map(({ role, content, id }) => {
        return <MessageBubble key={id} variant={role} message={content} />;
      });

    return (
      <div
        ref={ref}
        className="flex flex-col-reverse grow w-full mb-4 overflow-auto transition-[flex-grow] ease-in-out scroll-smooth"
      >
        {messages}
      </div>
    );
  }
);

MessageBox.displayName = "MessageBox";

export default MessageBox;
