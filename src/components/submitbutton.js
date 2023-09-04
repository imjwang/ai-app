"use client";

import { Button } from "@/components/ui/button";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import LoadingSpinner from "./spinner";

import { cn } from "@/lib/utils";

const SubmitButton = ({ loading, disable }) => {
  if (loading) return <LoadingSpinner />;
  return (
    <Button
      size="icon"
      className="absolute w-12 h-10 mr-1 right-0.5 bottom-1"
      type="submit"
      disabled={disable}
    >
      <PaperPlaneIcon
        shapeRendering="crispEdges"
        className={cn(
          "fill-white stroke-white",
          disable &&
            "fill-stone-200 stroke-stone-200 dark:fill-stone-700 dark:stroke-stone-700",
          "w-6",
          "h-6"
        )}
      />
    </Button>
  );
};

export default SubmitButton;
