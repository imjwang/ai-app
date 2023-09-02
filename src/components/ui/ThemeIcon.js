import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { forwardRef } from "react";

const ThemeIcon = forwardRef((props, ref) => {
  const { theme } = props;
  return (
    <div ref={ref} {...props}>
      {theme === "dark" ? <MoonIcon /> : <SunIcon />}
    </div>
  );
});

ThemeIcon.displayName = "ThemeIcon";

export default ThemeIcon;
