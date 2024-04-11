import React, {useState, useEffect} from "react";
import {ethers} from "ethers";
import {Link} from "react-router-dom"; // Import Redirect from React Router
import {useNavigate} from "react-router-dom";

import loginAsAClient from "../blockchain-api/loginAsAClient";
import loginAsALawyer from "../blockchain-api/loginAsALawyer";
import loginAsAJudge from "../blockchain-api/loginAsAJudge";

const LoginComponent = ({initialFormType}) => {
  const [formType, setFormType] = useState(initialFormType);
  const [aadharUID, setAadharUID] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [signingUpAs, setSigningUpAs] = useState("lawyer");
  const [isConnected, setIsConnected] = useState(false);

  const navigate = useNavigate();

  const connectMetamaskWallet = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = ethers.utils.getAddress(accounts[0]);
      setWalletAddress(account);
      setIsConnected(true);
    } catch (error) {
      console.error("Error connecting to Ethereum:", error);
      setIsConnected(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!aadharUID || !walletAddress) {
      alert("Please fill in all the required fields.");
      return;
    }

    const formData = {
      aadharUID,
      walletAddress,
      signingUpAs,
    };

    console.log("Submitted data :", formData);

    if (signingUpAs === "lawyer") {
      const isLawyerLoggedIn = await loginAsALawyer(aadharUID);
      if (isLawyerLoggedIn) {
        // Lawyer login logic
        alert("Login as a lawyer successful!");
        navigate(`/admin/lawyer/${aadharUID}`);
      } else {
        alert("Login as a lawyer failed.");
      }
    } else if (signingUpAs === "judge") {
      const isJudgeLoggedIn = await loginAsAJudge(aadharUID);
      if (isJudgeLoggedIn) {
        // Judge login logic
        alert("Login as a judge successful!");
        navigate(`/admin/judge/${aadharUID}`);
      } else {
        alert("Login as a judge failed.");
      }
    } else if (signingUpAs === "client") {
      const isClientLoggedIn = await loginAsAClient(aadharUID);
      if (isClientLoggedIn) {
        // Client login logic
        alert("Login as a client successful!");
        navigate(`/admin/client/${aadharUID}`);
      } else {
        alert("Login as a client failed.");
      }
    }
  };

  // useEffect(() => {
  //   // connectsWalletButtonInsideTheLoginFormOnPageLoad
  //   connectMetamaskWallet();
  // }, []);

  return (
    <div className="flex md:flex-row flex-col items-center justify-center md:min-h-screen min-h-[87vh] md:p-5">
      <div className="left-section md:w-[45%] w-full bg-white md:p-8 md:pl-0 pb-10 font-montserrat items-center justify-center flex flex-col">
        <p className="md:text-3xl text-xl font-montserrat pb-3 text-center">
          E-Vault Login
        </p>
        <div>
          <Link to="/signup">
            <p className="text-center pb-0 md:text-base text-xs text-blue-500">
              New user ?
            </p>
            <p className="text-center pb-3 md:text-base text-xs text-blue-500">
              New user? Register with E-Vault here
            </p>
          </Link>
        </div>
        <div className="flex flex-col md:justify-evenly xs:w-3/5 gap-3 md:text-base text-sm">
          <div className="flex">
            <button
              className={`py-2 px-4 rounded-sm w-full ${
                formType === "lawyer"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
              onClick={() => {
                setFormType("lawyer");
                setSigningUpAs("lawyer");
              }}
            >
              Login as a lawyer
            </button>
          </div>

          <div className="flex">
            <button
              className={`py-2 px-4 rounded-sm w-full ${
                formType === "client"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
              onClick={() => {
                setFormType("client");
                setSigningUpAs("client");
              }}
            >
              Login as a client
            </button>
          </div>

          <div className="flex">
            <button
              className={`py-2 px-4 rounded-sm w-full ${
                formType === "judge"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
              onClick={() => {
                setFormType("judge");
                setSigningUpAs("judge");
              }}
            >
              Login as a judge
            </button>
          </div>
        </div>
      </div>
      <div className="right-section md:w-[55%] w-full bg-white md:p-8 md:pr-0 pb-10 font-montserrat md:border-l md:border-blue-500 items-center justify-center flex">
        <form
          onSubmit={handleSubmit}
          className="md:w-[90%] w-full md:text-base text-sm"
        >
          <div className="md:pb-5 pb-3 flex">
            <input
              type="text"
              className="border rounded-sm py-2 px-4 w-full"
              placeholder="Enter your Aadhar number ? "
              value={aadharUID}
              onChange={(e) => setAadharUID(e.target.value)}
            />
          </div>

          <div className="md:pb-10 pb-3 flex md:flex-row md:gap-3 gap-3 flex-col items-center">
            <div className="md:w-2/3 w-full">
              <input
                type="text"
                className="border rounded-sm py-2 px-4 w-full"
                placeholder="Click on 'Connect Wallet' here !"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
              />
            </div>
            <div className="md:w-1/3 w-1-3 md:text-base text-xs">
              <button
                type="button"
                className="bg-blue-500 text-white py-2 px-4 rounded-sm w-full"
                onClick={connectMetamaskWallet}
              >
                {isConnected ? "Connected" : "Connect Wallet"}
              </button>
            </div>
          </div>

          <div className="text-center w-full">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-300 text-white py-2 px-4 rounded-sm md:w-2/5 w-3/5 md:text-base text-sm"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;
