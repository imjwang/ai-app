"use client";

import { Button } from "@/components/ui/button";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import LoadingSpinner from "./spinner";

const SubmitButton = ({ loading, disable }) => {
  if (loading) return <LoadingSpinner />;
  return (
    <Button
      size="icon"
      className="absolute w-12 h-8 mr-1 right-0.5 bottom-1"
      type="submit"
      disabled={disable}
    >
      <PaperPlaneIcon
        shapeRendering="crispEdges"
        className="fill-white stroke-white w-5 h-5"
      />
    </Button>
  );
};

export default SubmitButton;
