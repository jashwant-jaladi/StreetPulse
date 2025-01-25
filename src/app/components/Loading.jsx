import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 border-4 border-t-yellow-400 border-gray-700 rounded-full animate-spin"></div>
        <p className="text-yellow-400 text-lg font-medium">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
};

export default Loading;
