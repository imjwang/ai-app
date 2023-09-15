import { Button } from "@/components/ui/button";

const ExamplePrompts = ({
  exampleTexts = [],
  placeholder = "Ask questions about the documents you've selected",
  handleClick,
}) => {
  return (
    <div className="flex h-full items-center justify-center prose animate-emerge">
      <div className="flex w-full flex-col items-center justify-center dark:text-white">
        <h1 className="mb-2 w-3/4 text-center font-bold dark:text-stone-600">
          {placeholder}
        </h1>
        <div className="m-auto flex w-full flex-wrap justify-center dark:text-stone-600">
          {exampleTexts.map(t => {
            return (
              <Button
                key={t}
                onClick={() => handleClick(t)}
                className="rounded-full m-2"
                variant="outline"
              >
                {t}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExamplePrompts;
