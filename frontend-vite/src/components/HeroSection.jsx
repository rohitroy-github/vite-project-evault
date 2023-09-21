import React, {useState} from "react";
import {Link} from "react-router-dom";

const HeroSection = () => {
  const [showPopup, setShowPopup] = useState(false);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-white">
      <div className="text-center text-black">
        <h1 className="text-4xl font-montserrat mb-4">Project E-Vault</h1>
        <p className="text-xl font-montserrat mb-4">
          A modernized blockchain-based eVault system for Indian Judicial record
          system.
        </p>
      </div>
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
        <Link
          to="/login/client"
          className="bg-white border border-gray-300 text-black font-montserrat py-2 px-4 rounded-md"
        >
          Continue as a Client
        </Link>
        <Link
          to="/login/lawyer"
          className="bg-white border border-gray-300 text-black font-montserrat py-2 px-4 rounded-md"
        >
          Continue as a Lawyer
        </Link>
        <Link
          to="/login/judge" // Specify the route you want to link to
          className="bg-white border border-gray-300 text-black font-montserrat py-2 px-4 rounded-md"
        >
          Continue as a Judge
        </Link>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white w-96 p-6 rounded-lg shadow-md">
            <RegisterAsLawyer onClose={closePopup} />
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSection;
