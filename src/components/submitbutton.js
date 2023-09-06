"use client";

import { Button } from "@/components/ui/button";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import LoadingSpinner from "./spinner";

import { cn } from "@/lib/utils";

const SubmitButton = ({ className, loading, disable }) => {
  if (loading) return <LoadingSpinner className={className} />;
  return (
    <Button size="icon" className={className} type="submit" disabled={disable}>
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
