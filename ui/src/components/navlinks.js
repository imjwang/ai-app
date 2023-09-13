"use client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { usePathname } from "next/navigation";
import Link from "next/link";

const NavMenu = () => {
  const pathname = usePathname();
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem
          className={`${
            pathname === "/" ? "text-primary border-b-2 border-primary" : ""
          }`}
        >
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Chat
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem
          className={`${
            pathname === "/document"
              ? "text-primary border-b-2 border-primary"
              : ""
          }`}
        >
          <Link href="/document" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Document
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem
          className={`${
            pathname === "/upload"
              ? "text-primary border-b-2 border-primary"
              : ""
          }`}
        >
          <Link href="/upload" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Upload
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavMenu;
