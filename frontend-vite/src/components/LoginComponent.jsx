import React, {useState} from "react";
import {ethers} from "ethers";

const LoginComponent = () => {
  const [formType, setFormType] = useState("lawyer");
  const [fullName, setFullName] = useState("");
  const [aadharUID, setAadharUID] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

  const [signingUpAs, setSigningUpAs] = useState("lawyer");

  const connectMetamaskWallet = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = ethers.utils.getAddress(accounts[0]);
    setWalletAddress(account);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if any of the required fields are empty
    if (!fullName || !aadharUID || !walletAddress) {
      alert("Please fill in all the required fields.");
      return; // Prevent form submission
    }

    const formData = {
      fullName,
      aadharUID,
      walletAddress,
      signingUpAs,
    };
    console.log("Submitted data :", formData);

    // If all required fields are filled, you can proceed with form submission logic here
  };

  const renderFormFields = () => {
    switch (formType) {
      case "lawyer":
        return (
          <>
            <div className="mb-4">
              <label className="block mb-2">Full Name</label>
              <input
                type="text"
                className="border rounded-lg py-2 px-4 w-full"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
          </>
        );
      case "client":
        return (
          <>
            <div className="mb-4">
              <label className="block mb-2">Full Name</label>
              <input
                type="text"
                className="border rounded-lg py-2 px-4 w-full"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
          </>
        );
      case "judge":
        return (
          <>
            <div className="mb-4">
              <label className="block mb-2">Full Name</label>
              <input
                type="text"
                className="border rounded-lg py-2 px-4 w-full"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-5">
      <div className="bg-white p-8 font-montserrat w-1/2">
        <h1 className="text-3xl font-montserrat mb-4 text-center">
          E-Vault login
          {/* {formType === "lawyer"
            ? "Lawyer"
            : formType === "client"
            ? "Client"
            : "Judge"} */}
        </h1>
        <div className="mb-4 flex justify-center space-x-4">
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
          {renderFormFields()}
          {/* Rest of the common form fields */}

          <div className="mb-4">
            <label className="block mb-2">Aadhar UID</label>
            <input
              type="text"
              className="border rounded-lg py-2 px-4 w-full"
              value={aadharUID}
              onChange={(e) => setAadharUID(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Wallet Address</label>
            <div className="flex">
              <input
                type="text"
                className="border rounded-lg py-2 px-4 w-3/4"
                value={
                  walletAddress.slice(0, 6) +
                  "..." +
                  walletAddress.slice(30, 42)
                }
                onChange={(e) => setWalletAddress(e.target.value)}
              />
              <button
                type="button"
                className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
                onClick={connectMetamaskWallet}
              >
                Connect Wallet
              </button>
            </div>
          </div>
          <div className="text-center mt-4 w-full">
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
