import {useState, useEffect} from "react";
import {ethers} from "ethers";

import eVaultMain from "../abis/eVaultMain.json";
import config from "../backend-config.json";

import registerToEVault from "../blockchain-api/registerToEVault";

const SignUpComponent = () => {
  const [formType, setFormType] = useState("lawyer");
  const [fullName, setFullName] = useState("");
  const [religion, setReligion] = useState("");
  const [nationality, setNationality] = useState("");
  const [sex, setSex] = useState("");
  const [dob, setDob] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [aadharUID, setAadharUID] = useState("");
  const [pan, setPan] = useState("");
  const [signingUpAs, setSigningUpAs] = useState("lawyer");

  const [provider, setProvider] = useState(null);
  const [eVaultContract, setEVaultContract] = useState({});
  const [account, setAccount] = useState(null);

  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

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

  const connectToBlockchain = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    const account = ethers.utils.getAddress(accounts[0]);
    setAccount(account);

    // updateAccountOfRefreshing/AlteringAccounts
    window.ethereum.on("accountsChanged", async () => {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const account = ethers.utils.getAddress(accounts[0]);
      setAccount(account);
    });

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);

    const connectedNetwork = await provider.getNetwork();

    const eVaultContract = new ethers.Contract(
      config[connectedNetwork.chainId].contract.address,
      eVaultMain,
      provider.getSigner()
    );

    setEVaultContract(eVaultContract);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any of the required fields are empty
    if (
      !fullName ||
      !religion ||
      !nationality ||
      !sex ||
      !dob ||
      !contactNumber ||
      !aadharUID ||
      !pan
    ) {
      alert("Please fill in all the required fields.");
      return; // Prevent form submission
    }

    const formData = {
      fullName,
      religion,
      nationality,
      sex,
      dob,
      contactNumber,
      aadharUID,
      pan,
      walletAddress,
      signingUpAs,
    };

    // console.log("Submitted data :", formData);
    try {
      const register = await registerToEVault(formData);
      alert(register);
    } catch (error) {
      console.error("Error during registration >>> ", error);
    }
  };

  const renderFormFields = () => {
    switch (formType) {
      case "lawyer":
        return (
          <>
            <div className="mb-5">
              <input
                type="text"
                className="border rounded-lg py-2 px-4 w-full"
                placeholder="Enter your full name ?"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="mb-5 flex gap-5">
              <div className="w-1/3">
                <select
                  className="border rounded-lg py-2 px-4 w-full"
                  value={religion}
                  onChange={(e) => setReligion(e.target.value)}
                >
                  <option value="">Select your religion ?</option>
                  <option value="Hinduism">Hinduism</option>
                  <option value="Islam">Islam</option>
                  <option value="Christianity">Christianity</option>
                </select>
              </div>
              <div className="w-1/3">
                <select
                  className="border rounded-lg py-2 px-4 w-full"
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                >
                  <option value="">Select your nationality ?</option>
                  <option value="Indian">Indian</option>
                </select>
              </div>
              <div className="w-1/3">
                <select
                  className="border rounded-lg py-2 px-4 w-full"
                  value={sex}
                  onChange={(e) => setSex(e.target.value)}
                >
                  <option value="">Select your sex ?</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Transgender">Transgender</option>
                  <option value="Rather not say">Rather not say</option>
                </select>
              </div>
            </div>
            <div className="mb-5">
              <input
                type="text"
                className="border rounded-lg py-2 px-4 w-full"
                placeholder="Enter your DOB (Date Of Birth) ?"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </div>
          </>
        );
      case "client":
        return (
          <>
            <div className="mb-5">
              <input
                type="text"
                className="border rounded-lg py-2 px-4 w-full"
                placeholder="Enter your full name ?"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="mb-5 flex gap-5">
              <div className="w-1/3">
                <select
                  className="border rounded-lg py-2 px-4 w-full"
                  value={religion}
                  onChange={(e) => setReligion(e.target.value)}
                >
                  <option value="">Select your religion ?</option>
                  <option value="Hinduism">Hinduism</option>
                  <option value="Islam">Islam</option>
                  <option value="Christianity">Christianity</option>
                </select>
              </div>
              <div className="w-1/3">
                <select
                  className="border rounded-lg py-2 px-4 w-full"
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                >
                  <option value="">Select your nationality ?</option>
                  <option value="Indian">Indian</option>
                </select>
              </div>
              <div className="w-1/3">
                <select
                  className="border rounded-lg py-2 px-4 w-full"
                  value={sex}
                  onChange={(e) => setSex(e.target.value)}
                >
                  <option value="">Select your sex ?</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Transgender">Transgender</option>
                  <option value="Rather not say">Rather not say</option>
                </select>
              </div>
            </div>
            <div className="mb-5">
              <input
                type="text"
                className="border rounded-lg py-2 px-4 w-full"
                placeholder="Enter your DOB (Date Of Birth) ?"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </div>
          </>
        );
      case "judge":
        return (
          <>
            <div className="mb-5">
              <input
                type="text"
                className="border rounded-lg py-2 px-4 w-full"
                placeholder="Enter your full name ?"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="mb-5 flex gap-5">
              <div className="w-1/3">
                <select
                  className="border rounded-lg py-2 px-4 w-full"
                  value={religion}
                  onChange={(e) => setReligion(e.target.value)}
                >
                  <option value="">Select your religion ?</option>
                  <option value="Hinduism">Hinduism</option>
                  <option value="Islam">Islam</option>
                  <option value="Christianity">Christianity</option>
                </select>
              </div>
              <div className="w-1/3">
                <select
                  className="border rounded-lg py-2 px-4 w-full"
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                >
                  <option value="">Select your nationality ?</option>
                  <option value="Indian">Indian</option>
                </select>
              </div>
              <div className="w-1/3">
                <select
                  className="border rounded-lg py-2 px-4 w-full"
                  value={sex}
                  onChange={(e) => setSex(e.target.value)}
                >
                  <option value="">Select your sex ?</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Transgender">Transgender</option>
                  <option value="Rather not say">Rather not say</option>
                </select>
              </div>
            </div>
            <div className="mb-5">
              <input
                type="text"
                className="border rounded-lg py-2 px-4 w-full"
                placeholder="Enter your DOB (Date Of Birth) ?"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  // useEffect(() => {
  //   // connectsWalletButtonInsideTheSignUpFormOnPageLoad
  //   connectToBlockchain();
  // }, []);

  return (
    <div className="flex items-center justify-center min-h-screen p-5">
      <div className="bg-white p-8 font-montserrat w-[75%]">
        <h1 className="text-3xl font-montserrat mb-5 text-center">
          E-Vault Sign Up
          {/* {formType === "lawyer"
            ? "Lawyer"
            : formType === "client"
            ? "Client"
            : "Judge"} */}
        </h1>
        <h3 className="text-md font-montserrat mb-4 text-center">{account}</h3>
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
            Sign up as a lawyer
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
            Sign up as a client
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
            Sign up as a judge
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {renderFormFields()}
          {/* Rest of the common form fields */}

          <div className="mb-5">
            <input
              type="text"
              className="border rounded-lg py-2 px-4 w-full"
              placeholder="Enter your contact number ?"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
            />
          </div>

          <div className="mb-5 flex gap-5">
            <div className="w-1/2">
              <input
                type="text"
                className="border rounded-lg py-2 px-4 w-full"
                placeholder="Enter your Aadhar UID ?"
                value={aadharUID}
                onChange={(e) => setAadharUID(e.target.value)}
              />
            </div>

            <div className="w-1/2">
              <input
                type="text"
                className="border rounded-lg py-2 px-4 w-full"
                placeholder="Enter your PAN ?"
                value={pan}
                onChange={(e) => setPan(e.target.value)}
              />
            </div>
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
                className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full"
                onClick={connectMetamaskWallet}
              >
                {isConnected ? "Wallet Connected" : "Connect Wallet"}
              </button>
            </div>
          </div>

          <div className="text-center mt-5 w-full">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg w-1/3"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpComponent;
