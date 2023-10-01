import { Button } from "@/components/ui/button";
import Blobs from "./blobs";
import Link from "next/link";

export default async function Page() {
  return (
    <>
      <div className="sticky isolate p-64 h-[80vh] top-0 justify-center flex">
        <Blobs />
        <div className="max-w-2xl p-12 z-10 round-lg">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative px-3 py-1 text-sm text-gray-600 dark:text-white">
              Introducing v1.0.0, available for production now!{" "}
              <Link
                href="#"
                className="font-semibold text-indigo-600 dark:text-indigo-400"
              >
                <span className="absolute inset-0" aria-hidden="true" />
                Read more at our blog...
              </Link>
            </div>
          </div>
          <div className="prose prose-2xl text-center">
            <h1 className="tracking-tight text-bold dark:text-green-300">
              Welcome to the UI for Chat!!
            </h1>
            <p className="text-lg leading-8 text-gray-600 dark:text-yellow-300">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
              lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
              fugiat aliqua.
            </p>
            <Link href="/chat">
              <Button
                className="bg-black text-white dark:text-black dark:bg-white hover:bg-green-700 dark:hover:bg-green-500"
                size="lg"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="dark:bg-black bg-green-300 h-[300vh] pl-64 pt-64 sticky top-0 selection:bg-white">
        <div className="prose prose-2xl w-1/4 prose-white dark:prose-invert">
          <h1>It doesn&apos;t have to be so hard</h1>
        </div>
      </div>
      <div className="dark:bg-black bg-amber-300 h-[300vh] pl-64 pt-64 sticky top-0 dark:selection:bg-green-700">
        <div className="prose prose-2xl w-1/4 prose-white dark:prose-invert">
          <h1>It doesn&apos;t have to be so hard</h1>
        </div>
      </div>
      <div className="dark:bg-stone-800 bg-white h-[80vh] pl-64 pt-64 sticky top-0">
        <div className="prose prose-2xl w-1/4 prose-black dark:prose-invert tracking-tight">
          <h1>Something Something</h1>
        </div>
      </div>
      <div className="bg-black h-[20vh] p-12 sticky top-0">
        <div className="prose prose-white">
          <h3 className="text-white">Footer</h3>
        </div>
      </div>
    </>
  );
}
