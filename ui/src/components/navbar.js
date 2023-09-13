"use client";

import ThemeSwitch from "@/components/ui/ThemeSwitch";
import { useRouter } from "next/navigation";
import NavMenu from "@/components/navlinks";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Chat from "@/components/chat";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

const NavBar = () => {
  const router = useRouter();
  let isMobile = false;
  if (typeof window !== "undefined") {
    isMobile = window?.innerWidth < 640;
  }

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
            chaatUI
          </h1>
        </div>
        <ThemeSwitch className="place-self-end" />
      </div>
      <div className="flex flex-row place-content-between">
        <NavMenu />
        <Dialog>
          <DialogTrigger asChild>
            {isMobile ? (
              <div className="relative">
                <MagnifyingGlassIcon className="w-7 h-7 absolute bottom-1 right-1" />
              </div>
            ) : (
              <div
                style={{
                  WebkitUserSelect: "none",
                  MozUserSelect: "none",
                  msUserSelect: "none",
                  userSelect: "none",
                }}
                className="flex space-x-10 items-center mx-2 h-8 border bg-background border-black dark:border-stone-500 w-40 rounded-md pl-2 cursor-pointer text-sm"
              >
                <p className="text-stone-700 dark:text-stone-400">Search...</p>
                <p className="text-stone-400 dark:text-stone-700">⌘ K</p>
              </div>
            )}
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Chat Dialog</DialogTitle>
              <DialogDescription>ask anything</DialogDescription>
            </DialogHeader>
            <Chat className="p-5" />
            {/* <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" value="Pedro Duarte" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input id="username" value="@peduarte" className="col-span-3" />
              </div>
            </div> */}
            <DialogFooter>
              {/* <Button type="submit">Save changes</Button> */}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </nav>
  );
};

export default NavBar;
