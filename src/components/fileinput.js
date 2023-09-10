import { Input } from "@/components/ui/input";
import { UploadIcon } from "@radix-ui/react-icons";

const FileInput = () => {
  return (
    <div className="grid h-3/4 w-1/2 items-center gap-1.5 bg-background">
      <Input
        className="cursor-pointer h-full w-full border-8 hover:border-green-700 border-dashed z-10 bg-transparent"
        type="file"
      />
      <div className="flex flex-col items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <UploadIcon className="w-12 h-12 text-black dark:text-white" />
        <p className="mt-2 text-sm text-gray-600">Click or drag to upload</p>
      </div>
    </div>
  );
};
export default FileInput;
