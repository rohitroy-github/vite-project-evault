import React, {useState} from "react";
import {Link} from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white p-5 w-full border-b border-gray-300">
      <div className="container flex justify-between items-center">
        <div className="text-black font-montserrat text-xl">
          <Link to="/">E-Vault Project</Link>
        </div>
        <div className="hidden md:flex space-x-4">
          <Link
            to="/"
            className="text-black font-montserrat hover:text-blue-300"
          >
            Home
          </Link>
          <Link
            to="/signup"
            className="text-black font-montserrat hover:text-blue-300"
          >
            SignUp
          </Link>
          <Link
            to="/login"
            className="text-black font-montserrat hover:text-blue-300"
          >
            Login
          </Link>
          <Link
            to="/trialpage"
            className="text-black font-montserrat hover:text-blue-300"
          >
            Trial
          </Link>
        </div>
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleNavbar}
            className="text-black focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-300 z-10">
          <div className="flex flex-col p-4">
            <Link
              to="/"
              className="text-black font-montserrat hover:text-blue-300 mb-2"
            >
              Home
            </Link>
            <Link
              to="/signup"
              className="text-black font-montserrat hover:text-blue-300 mb-2"
            >
              SignUp
            </Link>
            <Link
              to="/login"
              className="text-black font-montserrat hover:text-blue-300"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
