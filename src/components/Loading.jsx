import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center h-screen justify-center">
      <div className="flex gap-2 h-20 items-center justify-center">
        <div className="w-2 h-1 rounded-md bg-white loaderAnimation"></div>
        <div className="w-2 h-1 rounded-md bg-white loaderAnimation"></div>
        <div className="w-2 h-1 rounded-md bg-white loaderAnimation"></div>
        <div className="w-2 h-1 rounded-md bg-white loaderAnimation"></div>
        <div className="w-2 h-1 rounded-md bg-white loaderAnimation"></div>
        <div className="w-2 h-1 rounded-md bg-white loaderAnimation"></div>
        <div className="w-2 h-1 rounded-md bg-white loaderAnimation"></div>
        <div className="w-2 h-1 rounded-md bg-white loaderAnimation"></div>
        <div className="w-2 h-1 rounded-md bg-white loaderAnimation"></div>
        <div className="w-2 h-1 rounded-md bg-white loaderAnimation"></div>
      </div>
      <p className="text-white text-3xl font-bold">Loading...</p>
    </div>
  );
};

export default Loading;
