const Loader = () => {
  return (
    <div className="min-h-screen bg-[#0d1421] flex flex-col items-center justify-center gap-6">
      {/* Animated coin spinner */}
      <div className="relative">
        {/* Outer ring */}
        <div className="w-20 h-20 rounded-full border-4 border-purple-500/20 animate-pulse"></div>

        {/* Spinning gradient ring */}
        <div className="absolute inset-0 w-20 h-20 rounded-full border-4 border-transparent border-t-purple-500 border-r-purple-400 animate-spin"></div>

        {/* Inner glow */}
        <div className="absolute inset-2 w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/10 to-blue-500/10 animate-pulse"></div>

        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl animate-bounce">₿</span>
        </div>
      </div>

      {/* Loading text with shimmer effect */}
      <div className="text-center">
        <h2 className="text-xl font-semibold text-white mb-2">Loading</h2>
        <div className="flex items-center justify-center gap-1">
          <span
            className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          ></span>
          <span
            className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
            style={{ animationDelay: "150ms" }}
          ></span>
          <span
            className="w-2 h-2 bg-purple-300 rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}
          ></span>
        </div>
      </div>

      {/* Subtle tagline */}
      <p className="text-gray-500 text-sm">Fetching coin data...</p>
    </div>
  );
};

export default Loader;
