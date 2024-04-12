import {Link} from "react-router-dom";

import indianJudiciaryLogo from "../assets/indianJudiciaryLogo.png";

const HeroSection = () => {
  return (
    <div className="md:h-screen h-[87vh] flex flex-col justify-center items-center bg-white">
      <div className="text-center flex items-center justify-center pb-6">
        <img
          src={indianJudiciaryLogo}
          alt="Indian Judiciary Logo"
          className="w-[30%] md:w-[10%]"
        />
      </div>
      <div className="text-center text-black">
        <p className="md:text-4xl text-3xl font-montserrat md:mb-6 mb-5 text-blue-500">
          Project E-Vault
        </p>
        <p className="md:text-xl text-base font-montserrat md:mb-6 mb-5">
          A modernized blockchain based eVault storage solution for the Indian
          Judiciary.
        </p>
      </div>
      <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3 text-black font-montserrat text-sm md:text-base">
        <Link
          to="/login/client"
          className="bg-white border border-gray-300 py-2 px-4 rounded-sm hover:bg-blue-500 hover:text-white"
        >
          Continue as a Client
        </Link>
        <Link
          to="/login/lawyer"
          className="bg-white border border-gray-300 py-2 px-4 rounded-sm hover:bg-blue-500 hover:text-white"
        >
          Continue as a Lawyer
        </Link>
        <Link
          to="/login/judge"
          className="bg-white border border-gray-300 py-2 px-4 rounded-sm hover:bg-blue-500 hover:text-white"
        >
          Continue as a Judge
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
