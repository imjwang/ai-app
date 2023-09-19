import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const messageContainerVariants = cva("flex my-2", {
  variants: {
    variant: {
      default: "justify-center",
      assistant: "justify-start sm:mr-4 md:mr-8 lg:mr-12",
      user: "justify-end sm:ml-4 md:ml-8 lg:ml-12",
      function: "justify-center sm:mr-4 md:mr-8 lg:mr-12",
    },
  },
  defaultVariant: "default",
});

const messageVariants = cva(
  "prose break-words p-3 md:p-6 w-fit max-w-full whitespace-pre-wrap",
  {
    variants: {
      variant: {
        default: "",
        user: "bg-blue-300 rounded-br-lg rounded-tl-lg",
        assistant: "bg-green-300 rounded-bl-lg rounded-tr-lg",
        // TODO: need to do testing on functions agent
        // function: "bg-green-700 rounded-bl-lg rounded-tr-lg text-black",
      },
    },
    defaultVariant: "default",
  }
);

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
