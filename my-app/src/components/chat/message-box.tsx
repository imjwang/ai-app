import { Message } from "ai";
import MessageBubble from "./message";
import { forwardRef } from "react";

interface MessageBoxProps {
  messages: Message[];
}

const MessageBox = forwardRef<HTMLDivElement, MessageBoxProps>(
  ({ messages }, ref) => {
    return (
      <div
        ref={ref}
        className="flex flex-col-reverse grow w-full mb-4 overflow-auto transition-[flex-grow] ease-in-out scroll-smooth"
      >
        {[...messages].reverse().map(({ role, content, id }) => {
          return <MessageBubble key={id} variant={role} message={content} />;
        })}
      </div>
    );
  }
);

MessageBox.displayName = "MessageBox";

export default MessageBox;
