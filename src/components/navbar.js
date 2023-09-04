import ThemeSwitch from "@/components/ui/ThemeSwitch";

const NavBar = () => {
  return (
    <div className="h-16 bg-green-700 dark:bg-black w-screen flex flex-row place-content-between items-center px-3">
      <div className="prose">
        <h1
          className="text-green-300 dark:text-green-700"
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
  );
};

export default NavBar;
