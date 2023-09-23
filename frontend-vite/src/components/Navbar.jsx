import React, {useState} from "react";
import {Link, useLocation} from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const isAdminRoute = location.pathname === "/admin";

  return (
    <nav className="bg-white w-full border-b border-gray-300 px-10 py-5">
      <div className="flex justify-between items-center">
        <div className="text-black font-montserrat text-xl">
          <Link to="/">E-Vault Project</Link>
        </div>
        <div className="hidden md:flex space-x-10 ">
          {!isAdminRoute && (
            <>
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
                to="/get-case-details"
                className="text-black font-montserrat hover:text-blue-300"
              >
                Get Case Details
              </Link>
            </>
          )}
          {isAdminRoute ? (
            <>
              <Link
                to="/logout"
                className="text-black font-montserrat hover:text-blue-300"
              >
                Logout
              </Link>
              <Link
                to="/admin"
                className="text-black font-montserrat hover:text-blue-300"
              >
                Test
              </Link>
            </>
          ) : (
            <Link
              to="/admin"
              className="text-black font-montserrat hover:text-blue-300"
            >
              Admin
            </Link>
          )}
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
            {!isAdminRoute && (
              <>
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
              </>
            )}
            {isAdminRoute ? (
              <>
                <Link
                  to="/logout"
                  className="text-black font-montserrat hover:text-blue-300 mb-2"
                >
                  Logout
                </Link>
                <Link
                  to="/admin"
                  className="text-black font-montserrat hover:text-blue-300"
                >
                  Test
                </Link>
              </>
            ) : (
              <Link
                to="/admin"
                className="text-black font-montserrat hover:text-blue-300"
              >
                Admin
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
