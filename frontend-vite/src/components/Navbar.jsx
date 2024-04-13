import React, {useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {ethers} from "ethers";

import indianJudiciaryLogo from "../assets/indianJudiciaryLogo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [isMetamaskConnected, setIsMetamaskConnected] = useState(false);
  const [metamaskAccount, setMetamaskAccount] = useState("");

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const isAdminRoute = location.pathname.startsWith("/admin/");

  const connectMetamask = async () => {
    if (window.ethereum) {
      try {
        // Request Metamask to connect
        await window.ethereum.request({method: "eth_requestAccounts"});
        setIsMetamaskConnected(true);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setMetamaskAccount(address);
      } catch (error) {
        console.error("Error connecting to Metamask:", error);
      }
    }
  };

  return (
    <nav className="bg-white w-full border-b border-gray-300 md:px-10 md:py-5">
      <div className="flex justify-between items-center xs:h-[7vh] md:h-auto">
        <div className="flex items-center md:w-1/2">
          <img
            src={indianJudiciaryLogo}
            alt="Indian Judiciary Logo"
            className="w-[8%] 3xl:w-[5%] 2xl:w-[6%] hidden md:block md:pr-3"
          />
          <div className="font-montserrat md:text-xl text-base text-blue-500">
            <Link to="/">Project E-Vault</Link>
          </div>
        </div>

        <div className="hidden md:flex space-x-10 items-center md:w-1/2 md:justify-end">
          {!isAdminRoute && (
            <>
              <Link
                to="/get-case-details"
                className="text-black font-montserrat hover:text-blue-300"
              >
                Get Case Details
              </Link>
              <Link
                to="/signup"
                className="text-black font-montserrat hover:text-blue-300"
              >
                Sign Up
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
                to="/admin/register-new-case"
                className="text-black font-montserrat hover:text-blue-300"
              >
                Register New Case
              </Link>
              <Link
                to="/get-case-details"
                className="text-black font-montserrat hover:text-blue-300"
              >
                Case Search
              </Link>
              <Link
                to="/logout"
                className="text-black font-montserrat hover:text-blue-300"
              >
                Logout
              </Link>

              {!isMetamaskConnected ? (
                <button
                  onClick={connectMetamask}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-montserrat py-2 px-4 rounded-sm"
                >
                  Connect Metamask
                </button>
              ) : (
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-montserrat py-2 px-4 rounded-sm">
                  Metamask Connected
                </button>
              )}
            </>
          ) : (
            <>
              {/* <Link
                to="/admin"
                className="text-black font-montserrat hover:text-blue-300"
              >
                Admin
              </Link> */}

              {!isMetamaskConnected ? (
                <button
                  onClick={connectMetamask}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-montserrat py-2 px-4 rounded"
                >
                  Connect Metamask
                </button>
              ) : (
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-montserrat py-2 px-4 rounded">
                  Metamask Connected
                </button>
              )}
            </>
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
        // <div className="md:hidden text-sm absolute top-16 left-0 w-full bg-white border-b border-gray-300 z-10">
        <div className="md:hidden text-sm absolute top-15 right-0 h-[90%] w-2/3 bg-white bg-opacity-75 z-10 p-5">
          <div className="flex flex-col h-full gap-8">
            {!isAdminRoute && (
              <>
                <Link
                  to="/get-case-details"
                  className="text-black font-montserrat hover:text-blue-300"
                >
                  Get Case Details
                </Link>
                <Link
                  to="/signup"
                  className="text-black font-montserrat hover:text-blue-300"
                >
                  Register
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
                  to="/admin/register-new-case"
                  className="text-black font-montserrat hover:text-blue-300"
                >
                  Register New Case
                </Link>
                <Link
                  to="/get-case-details"
                  className="text-black font-montserrat hover:text-blue-300"
                >
                  Search Case Details
                </Link>
                <Link
                  to="/logout"
                  className="text-black font-montserrat hover:text-blue-300"
                >
                  Logout
                </Link>
              </>
            ) : (
              <></>
            )}
            {!isMetamaskConnected ? (
              <button
                onClick={connectMetamask}
                className="bg-blue-500 hover:bg-blue-600 text-white font-montserrat py-2 px-4 rounded-sm"
              >
                Connect Metamask
              </button>
            ) : (
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-montserrat py-2 px-4 rounded-sm">
                Metamask Connected
              </button>
            )}
          </div>
          <div className="font-montserrat text-base text-blue-500 text-center">
            <Link to="/">Project E-Vault</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
