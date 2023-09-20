import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { forwardRef } from "react";

interface ThemeIconProps {
  theme: string | undefined;
}

const ThemeIcon = forwardRef((props: ThemeIconProps, ref: any) => {
  const { theme } = props;
  return (
    <div ref={ref} {...props}>
      {theme === "dark" ? <MoonIcon /> : <SunIcon />}
    </div>
  );
});

ThemeIcon.displayName = "ThemeIcon";

export default ThemeIcon;
