import React from "react";

const HeroSection = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-white">
      <div className="text-center text-black">
        <h1 className="text-4xl font-montserrat mb-4">Project E-Vault</h1>
        <p className="text-xl font-montserrat mb-4">
          A modernized blockchain-based eVault system for Indian Judicial
          records
        </p>
      </div>
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
        <button className="bg-white border border-gray-300 text-black font-montserrat py-2 px-4 rounded-md">
          Continue as a Client
        </button>
        <button className="bg-white border border-gray-300 text-black font-montserrat py-2 px-4 rounded-md">
          Continue as a Lawyer
        </button>
        <button className="bg-white border border-gray-300 text-black font-montserrat py-2 px-4 rounded-md">
          Continue as a Judge
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
