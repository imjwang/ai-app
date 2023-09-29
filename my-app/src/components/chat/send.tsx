"use client";

import { Button } from "@/components/ui/button";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import LoadingSpinner from "@/components/ui/spinner";
import { useAtomValue } from "jotai";
import { isLoadingAtom } from "@/lib/hooks/use-chat";

import { cn } from "@/lib/utils";

interface SendButtonProps {
  className?: string;
  loading?: boolean;
  disable?: boolean;
}

const SendButton = ({ className, disable }: SendButtonProps) => {
  const loading = useAtomValue(isLoadingAtom);

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

export default SendButton;
