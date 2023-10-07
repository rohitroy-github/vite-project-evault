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
        navigate(`/admin/${aadharUID}`);
      } else {
        alert("Login as a lawyer failed.");
      }
    } else if (signingUpAs === "judge") {
      const isJudgeLoggedIn = await loginAsAJudge(aadharUID);
      if (isJudgeLoggedIn) {
        // Judge login logic
        alert("Login as a judge successful!");
        navigate(`/admin/${aadharUID}`);
      } else {
        alert("Login as a judge failed.");
      }
    } else if (signingUpAs === "client") {
      const isClientLoggedIn = await loginAsAClient(aadharUID);
      if (isClientLoggedIn) {
        // Client login logic
        alert("Login as a client successful!");
        navigate(`/admin/${aadharUID}`);
      } else {
        alert("Login as a client failed.");
      }
    }
  };

  useEffect(() => {
    connectMetamaskWallet();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen p-5">
      <div className="bg-white p-8 font-montserrat w-[50%]">
        <h1 className="text-3xl font-montserrat mb-5 text-center">
          E-Vault login
        </h1>
        <div className="mb-5 text-center">
          <Link to="/signup" className="text-blue-500">
            New user? Register with E-Vault here!
          </Link>
        </div>
        <div className="mb-10 flex justify-center space-x-4">
          <button
            className={`py-2 px-4 rounded-lg ${
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
            className={`py-2 px-4 rounded-lg ${
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
            className={`py-2 px-4 rounded-lg ${
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
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            {/* Replace the label with a placeholder */}
            <input
              type="text"
              className="border rounded-lg py-2 px-4 w-full"
              placeholder="Enter your Aadhar number ? "
              value={aadharUID}
              onChange={(e) => setAadharUID(e.target.value)}
            />
          </div>
          <div className="mb-10">
            <div className="flex">
              <input
                type="text"
                className="border rounded-lg py-2 px-4 w-[70%]"
                placeholder="Wallet Address"
                value={
                  walletAddress.slice(0, 15) +
                  ". . ." +
                  walletAddress.slice(28, 42)
                }
                // value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
              />
              <button
                type="button"
                className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg w-[35%]"
                onClick={connectMetamaskWallet}
              >
                {isConnected ? "Wallet Connected" : "Connect Wallet"}
              </button>
            </div>
          </div>
          <div className="text-center mt-5 w-full">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg w-1/2"
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
