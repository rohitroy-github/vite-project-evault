import React, {useState} from "react";
import {Link} from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="md:h-screen h-[70vh] flex flex-col justify-center items-center bg-white">
      <div className="text-center text-black">
        <p className="md:text-4xl text-3xl font-montserrat md:mb-8 mb-5 text-blue-500">
          Project E-Vault
        </p>
        <p className="md:text-xl text-base font-montserrat md:mb-8 mb-5">
          A modernized blockchain based eVault storage solution for the Indian
          Judiciary.
        </p>
      </div>
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-5">
        <Link
          to="/login/client"
          className="bg-white border border-gray-300 text-black font-montserrat py-2 px-4 rounded-md hover:bg-blue-500 hover:text-white"
        >
          Continue as a Client
        </Link>
        <Link
          to="/login/lawyer"
          className="bg-white border border-gray-300 text-black font-montserrat py-2 px-4 rounded-md hover:bg-blue-500 hover:text-white"
        >
          Continue as a Lawyer
        </Link>
        <Link
          to="/login/judge"
          className="bg-white border border-gray-300 text-black font-montserrat py-2 px-4 rounded-md hover:bg-blue-500 hover:text-white"
        >
          Continue as a Judge
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
