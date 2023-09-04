import NavBar from "@/components/navbar";
import ChatBox from "@/components/chatbox";

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between px-24 pb-8 bg-stone-100 dark:bg-stone-900">
        <NavBar />
        <div className="flex flex-col h-full w-full space-y-6">
          <div className="mb-4">
            <div className="prose max-w-full bg-blue-300 p-6 rounded-r-xl rounded-tl-xl">
              Hello, this is a left-aligned
              message!Hello,asdfawefawefawefawefawawefawefawefawefawefawawefawefawefawefawefawefawefawefawefawefawefawefawef
            </div>
          </div>

          <div className="mb-4 text-right">
            <div className="prose max-w-full bg-green-300 p-6 inline-block rounded-l-xl rounded-tr-xl">
              And this is a right-aligned message!
            </div>
          </div>
        </div>
        <ChatBox />
      </main>
    </>
  );
}
