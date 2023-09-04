import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const messageContainerVariants = cva("flex my-10", {
  variants: {
    variant: {
      default: "justify-center",
      user: "justify-start sm:mr-8 md:mr-16 lg:mr-24",
      ai: "justify-end sm:ml-8 md:ml-16 lg:ml-24",
    },
  },
  defaultVariant: "default",
});

const messageVariants = cva("prose break-words p-6 w-fit max-w-full", {
  variants: {
    variant: {
      default: "",
      user: "bg-blue-300 rounded-br-lg rounded-tl-lg",
      ai: "bg-green-300 rounded-bl-lg rounded-tr-lg",
    },
  },
  defaultVariant: "default",
});

const MessageContainer = ({ variant, children }) => {
  return (
    <div className={cn(messageContainerVariants({ variant }))}>{children}</div>
  );
};

const Message = ({ variant, className, message, ...props }) => {
  return (
    <MessageContainer variant={variant}>
      <p className={cn(messageVariants({ variant }))}>{message}</p>
    </MessageContainer>
  );
};

export default Message;
