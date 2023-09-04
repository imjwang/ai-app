const LoadingSpinner = () => {
  return (
    <div className="inline-flex items-center justify-center absolute w-12 h-8 mr-1 right-0.5 bottom-1">
      <div className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] text-blue-500"></div>
    </div>
  );
};
export default LoadingSpinner;
