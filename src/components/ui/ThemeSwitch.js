"use client";

import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import ThemeIcon from "./ThemeIcon";

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  const handleCheck = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <Switch checked={theme === "dark"} onCheckedChange={handleCheck} asChild>
      <ThemeIcon theme={theme} />
    </Switch>
  );
};

export default ThemeSwitch;
