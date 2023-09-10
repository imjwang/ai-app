const Tip = ({ isFocused }) => {
  return (
    <div
      className={`prose dark:prose-invert tracking-tight text-xs ${
        isFocused ? "" : "invisible"
      }`}
    >
      <p>
        <strong>
          Press{" "}
          <kbd className="bg-slate-400 dark:bg-slate-600 py-0.5 px-1 rounded">
            ⏎
          </kbd>{" "}
          to send,{" "}
          <kbd className="bg-slate-400 dark:bg-slate-600 py-0.5 px-1 rounded">
            shift
          </kbd>{" "}
          +{" "}
          <kbd className="bg-slate-400 dark:bg-slate-600 py-0.5 px-1 rounded">
            ⏎
          </kbd>{" "}
          to add a new line.
        </strong>
      </p>
    </div>
  );
};

export default Tip;
