import MessageBubble from "./message";
import { forwardRef } from "react";
import { Message } from "@/lib/hooks/use-chat";
import { useAtomValue } from "jotai";
import { messageAtom } from "@/lib/hooks/use-chat";

interface MessageBoxProps {
  messages: Message[];
}

const MessageBox = forwardRef<HTMLDivElement, MessageBoxProps>(
  ({ messages }, ref) => {
    const message = useAtomValue(messageAtom);
    const test = [...message.values()]
      .reverse()
      .map(({ role, content, id }) => {
        return <MessageBubble key={id} variant={role} message={content} />;
      });

    return (
      <div
        ref={ref}
        className="flex flex-col-reverse grow w-full mb-4 overflow-auto transition-[flex-grow] ease-in-out scroll-smooth"
      >
        {test}
      </div>
    );
  }
);

MessageBox.displayName = "MessageBox";

export default MessageBox;
