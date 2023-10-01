import { ReactNode } from "react";
import NavBar from "@/components/navbar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="h-screen flex flex-col">
      <NavBar />
      {children}
    </div>
  );
}
