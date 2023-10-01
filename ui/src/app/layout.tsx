import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import JotaiProvider from "@/components/jotai-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className={inter.className}>
          <JotaiProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <div className="flex flex-col min-h-screen bg-stone-100 dark:bg-stone-900 dark:selection:bg-orange-700 dark:selection:text-white selection:bg-green-300 selection:text-black">
                {children}
              </div>
            </ThemeProvider>
          </JotaiProvider>
        </body>
      </html>
    </>
  );
}
