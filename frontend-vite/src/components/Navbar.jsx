import React, {useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {ethers} from "ethers";

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
    <nav className="bg-white w-full border-b border-gray-300 px-10 py-5">
      <div className="flex justify-between items-center">
        <div className="font-montserrat text-xl text-blue-500">
          <Link to="/">Project E-Vault</Link>
        </div>
        <div className="hidden md:flex space-x-10 items-center">
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
          {!isMetamaskConnected ? (
            <button
              onClick={connectMetamask}
              className="bg-blue-500 hover:bg-blue-600 text-white font-montserrat py-2 px-4 rounded mt-4"
            >
              Connect Metamask
            </button>
          ) : (
            <div className="mt-4">
              <p className="text-black font-montserrat">Metamask Connected</p>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
