import ThemeSwitch from "@/components/ui/ThemeSwitch";

const NavBar = () => {
  return (
    <div className="h-16 bg-blue-400 w-screen flex flex-row place-content-between items-center px-3">
      <div className="prose">
        <h1
          className="text-blue-200"
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
