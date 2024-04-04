import React from "react";

const Loader = () => {
  return (
    <div class="flex justify-center items-center h-screen">
      <div class="relative inline-flex">
        {/* <div class="w-12 h-12 bg-blue-500 rounded-full"></div> */}
        <div class="w-16 h-16 bg-blue-500 rounded-full border-2 border-blue-800 relative top-0 left-0 animate-ping"></div>
        <div class="w-16 h-16 bg-blue-500 rounded-full border-2 border-blue-800 absolute top-0 left-0 animate-ping"></div>
        {/* <div class="w-12 h-12 bg-blue-500 rounded-full relative top-0 left-0 animate-pulse"></div> */}
      </div>
    </div>
  );
};

export default Loader;
