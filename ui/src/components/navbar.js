"use client";

import ThemeSwitch from "@/components/ui/ThemeSwitch";
import { useRouter } from "next/navigation";
import NavMenu from "@/components/navlinks";

const NavBar = () => {
  const router = useRouter();
  return (
    <nav className="h-fit bg-green-700 dark:bg-background w-screen flex flex-col">
      <div className="flex flex-row place-content-between items-center p-2">
        <div className="prose">
          <h1
            onClick={() => router.push("/")}
            className="text-green-300 dark:text-green-700 cursor-pointer"
            style={{
              WebkitUserSelect: "none",
              MozUserSelect: "none",
              msUserSelect: "none",
              userSelect: "none",
            }}
          >
            Chatbot
          </h1>
        </div>
        <ThemeSwitch className="place-self-end" />
      </div>
      <NavMenu />
    </nav>
  );
};

export default NavBar;
