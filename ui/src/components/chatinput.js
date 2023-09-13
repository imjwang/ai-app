import Tip from "./tip";
import ChatForm from "./chatform";
import { useState } from "react";

const ChatInput = ({
  setInput,
  input,
  handleSubmit,
  handleInputChange,
  placeholder,
  tip = true,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div className="flex w-full flex-col">
      <ChatForm
        setInput={setInput}
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        setIsFocused={setIsFocused}
        placeholder={placeholder}
      />
      {tip && <Tip isFocused={isFocused} />}
    </div>
  );
};

export default ChatInput;
