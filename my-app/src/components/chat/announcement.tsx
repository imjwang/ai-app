import { Button } from "@/components/ui/button";

interface AnnouncementProps {
  announcements?: string[];
  title?: string;
  handleClick: (t: string) => void;
}

const Announcement = ({
  announcements = [],
  title = "ChatUI",
  handleClick,
}: AnnouncementProps) => {
  return (
    <div className="flex h-full items-center justify-center prose animate-emerge">
      <div className="flex w-full flex-col items-center justify-center dark:text-white">
        <h1 className="mb-2 w-3/4 text-center font-bold dark:text-stone-600">
          {title}
        </h1>
        <div className="m-auto flex w-full flex-wrap justify-center dark:text-stone-600">
          {announcements.map(t => {
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

export default Announcement;
