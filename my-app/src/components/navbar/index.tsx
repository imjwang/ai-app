import ThemeSwitch from "@/components/ui/theme-switch";
// import { useRouter } from "next/navigation";
import Links from "./links";
import Link from "next/link";

const NavBar = () => {
  return (
    <nav className="h-fit bg-green-700 dark:bg-background w-screen flex flex-col">
      <div className="flex flex-row place-content-between items-center p-2">
        <Link className="no-underline" href="/">
          <div className="prose">
            <h1 className="text-green-300 dark:text-green-700 cursor-pointer select-none">
              chaatUI
            </h1>
          </div>
        </Link>
        <ThemeSwitch className="place-self-end" />
      </div>
      <div className="flex flex-row place-content-between">
        <Links />
      </div>
    </nav>
  );
};

export default NavBar;
