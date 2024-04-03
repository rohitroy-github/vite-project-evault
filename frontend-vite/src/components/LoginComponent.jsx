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
    <div className="flex items-center justify-center min-h-screen p-5">
      <div className="left-section w-[45%] bg-white p-8 pl-0 font-montserrat items-center justify-center flex flex-col">
        <p className="text-2xl font-montserrat mb-5 text-center">
          E-Vault Login
        </p>
        <div className="mb-5 text-center text-md">
          <Link to="/signup" className="text-blue-500">
            New user? Register with E-Vault here !
          </Link>
        </div>
        <div className="flex justify-center space-x-4 text-sm">
          <button
            className={`py-2 px-4 rounded-md ${
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
          <button
            className={`py-2 px-4 rounded-md ${
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
          <button
            className={`py-2 px-4 rounded-md ${
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
      <div className="right-section w-[55%] bg-white p-8 pr-0 font-montserrat border-l border-gray-300 items-center justify-center flex">
        <form onSubmit={handleSubmit} className="w-[90%]">
          <div className="mb-5 flex gap-5">
            <input
              type="text"
              className="border rounded-lg py-2 px-4 w-full"
              placeholder="Enter your Aadhar number ? "
              value={aadharUID}
              onChange={(e) => setAadharUID(e.target.value)}
            />
          </div>

          <div className="mb-10 flex gap-5">
            <div className="w-2/3">
              <input
                type="text"
                className="border rounded-lg py-2 px-4 w-full"
                placeholder="Click on 'Connect Wallet' here !"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
              />
            </div>
            <div className="w-1/3">
              <button
                type="button"
                className="bg-blue-500 text-white py-2 px-4 rounded-md w-full"
                onClick={connectMetamaskWallet}
              >
                {isConnected ? "Wallet Connected" : "Connect Wallet"}
              </button>
            </div>
          </div>

          <div className="text-center mt-5 w-full">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md w-1/3"
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
