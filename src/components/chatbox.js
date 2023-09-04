import Tip from "./tip";
import ChatForm from "./chatform";

const ChatBox = () => {
  return (
    <div className="w-4/5">
      <ChatForm />
      <Tip />
    </div>
  );
};

export default ChatBox;
