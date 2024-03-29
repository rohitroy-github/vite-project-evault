import {useState} from "react";
import {ethers} from "ethers";

import eVaultMain from "../abis/eVaultMain.json";
import config from "../backend-config.json";

import {Link} from "react-router-dom";

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
                  <option value="">Religion ?</option>
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
                  <option value="">Nationality ?</option>
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
            <div className="mb-5">
              <input
                type="text"
                className="border rounded-lg py-2 px-4 w-full"
                placeholder="Enter your contact number ?"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
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
            <div className="mb-5">
              <input
                type="text"
                className="border rounded-lg py-2 px-4 w-full"
                placeholder="Enter your contact number ?"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
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
            <div className="mb-5">
              <input
                type="text"
                className="border rounded-lg py-2 px-4 w-full"
                placeholder="Enter your contact number ?"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
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
      <div className="left-section w-[45%] bg-white p-8 pl-0 font-montserrat items-center justify-center flex flex-col">
        <h1 className="text-2xl font-montserrat mb-5 text-center">
          E-Vault Registration
          {/* {formType === "lawyer"
            ? "Lawyer"
            : formType === "client"
            ? "Client"
            : "Judge"} */}
        </h1>
        <div className="mb-5 text-center text-md">
          <Link to="/login" className="text-blue-500">
            Already registered ? Login with your credentials !
          </Link>
        </div>
        {/* <h3 className="text-lg font-montserrat mb-4 text-center">{account}</h3> */}
        <div className="flex justify-center space-x-4 text-sm">
          <button
            className={`py-2 px-4 rounded-sm ${
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
            className={`py-2 px-4 rounded-sm ${
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
            className={`py-2 px-4 rounded-sm ${
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
      </div>

      <div className="right-section w-[55%] bg-white p-8 pr-0 pl-5 font-montserrat border-l border-gray-300 items-center justify-center flex">
        <form onSubmit={handleSubmit} className="w-[90%]">
          {renderFormFields()}

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
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpComponent;
