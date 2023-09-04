import NavBar from "@/components/navbar";
import ChatBox from "@/components/chatbox";
import Message from "@/components/message";

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between px-24 pb-8 bg-stone-100 dark:bg-stone-900">
        <NavBar />
        <div className="flex flex-col-reverse h-full w-full space-y-6 px-24">
          <Message
            variant="user"
            message="And this is a right-alignawefkajwopeijfiawefawefaiowjefoiajweofijawoiefjoiawioejfaoiwjefoiajweoifjawioefwjaoeifjaowiejfoiawjefoiawjefiooiawjefoiajweoifjawoiejfoawiajfwoiefjoaiwjefoiajweoifoiwajefoiajwoiefjwaoiefed message!aiowejfoijawoiefj"
          />

          <Message
            variant="ai"
            message="And this is a right-aligneapoawjkefopijaiwejfoiajwefoiwd message!aiowejfoijawoiefj"
          />
        </div>
        <ChatBox />
      </main>
    </>
  );
}
