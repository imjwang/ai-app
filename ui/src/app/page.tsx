import { Button } from "@/components/ui/button";

export default async function Page() {
  return (
    <>
      <div className="sticky isolate px-6 pt-14 lg:px-8 h-[80vh] top-0">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ffff00] to-[#008000] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#00FFFF] to-[#FF00FF] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(80% 0%, 100% 20%, 90% 40%, 95% 60%, 85% 80%, 75% 60%, 70% 40%, 60% 25%, 50% 15%, 40% 10%, 30% 0%, 20% 20%, 10% 35%, 0% 50%)",
            }}
          />
        </div>

        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#FFFF00] to-[#1E90FF] opacity-30 sm:left-[calc(50%-36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(20% 40%, 0% 65%, 5% 20%, 15% 5%, 20% 10%, 25% 30%, 45% 60%, 50% 70%, 55% 50%, 60% 35%, 70% 80%, 90% 70%, 80% 100%, 70% 75%, 30% 95%, 25% 40%, 75% 40%, 100% 65%, 95% 20%, 85% 5%, 80% 10%, 75% 30%, 55% 60%, 50% 70%, 45% 50%, 40% 35%, 30% 80%, 10% 70%, 20% 100%, 30% 75%, 70% 95%)",
            }}
          />
        </div>

        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative px-3 py-1 text-sm text-gray-600 dark:text-white">
              Introducing v1.0.0, available for production now!{" "}
              <a
                href="#"
                className="font-semibold text-indigo-600 dark:text-indigo-400"
              >
                <span className="absolute inset-0" aria-hidden="true" />
                Read more at our blog...
              </a>
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
            <Button
              className="bg-black text-white dark:text-black dark:bg-white hover:bg-green-700 dark:hover:bg-green-500"
              size="lg"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
      <div className="dark:bg-white bg-green-700 h-[100vh] pl-64 pt-64 sticky top-0">
        <div className="prose prose-2xl w-1/4">
          <h1 className="text-white dark:text-black">
            It doesn&apos;t have to be so hard
          </h1>
        </div>
      </div>
    </>
  );
}
