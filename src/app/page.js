import ChatBox from "@/components/chatbox";

export default function Home() {
  return (
    <>
      <main className="flex flex-col p-4 md:p-12 h-[100vh] bg-stone-100 dark:bg-stone-900">
        <ChatBox />
      </main>
    </>
  );
}
