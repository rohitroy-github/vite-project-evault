import {useState} from "react";
import {ethers} from "ethers";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";

import registerToEVault from "../blockchain-api/registerToEVault";

import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {shortenWalletAddress} from "@/lib/utils";

const SignUpComponent = ({initialFormType}) => {
  const navigate = useNavigate();

  const [formType, setFormType] = useState(initialFormType || "");
  const [isConnected, setIsConnected] = useState(false);

  const [fullName, setFullName] = useState("");
  const [religion, setReligion] = useState("");
  const [nationality, setNationality] = useState("");
  const [sex, setSex] = useState("");
  const [dob, setDob] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [aadharUID, setAadharUID] = useState("");
  const [pan, setPan] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [signingUpAs, setSigningUpAs] = useState("lawyer");

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
      return;
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

    try {
      const register = await registerToEVault(formData);

      // Customization: https://fkhadra.github.io/react-toastify/how-to-style/
      // Customization: https://fkhadra.github.io/react-toastify/how-to-style/
      toast("Evault login successfull ✅", {
        position: "top-right",
        autoClose: 1000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        icon: false,
        hideProgressBar: true,
        closeButton: false,
      });

      // resettingToDefaultValues
      setFullName("");
      setReligion("");
      setNationality("");
      setSex("");
      setDob("");
      setContactNumber("");
      setAadharUID("");
      setPan("");
      setWalletAddress("");

      setTimeout(() => {
        navigate(`/admin/lawyer/${aadharUID}`);
      }, 2000);
    } catch (error) {
      console.error("Error during registration: ", error);
    }
  };

  const renderFormFields = () => {
    switch (formType) {
      case "lawyer":
        return (
          <>
            <div className="md:pb-5 pb-3 flex gap-5">
              <input
                type="text"
                className="border rounded-sm py-2 px-4 w-full"
                placeholder="Enter your full name ?"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="md:pb-5 pb-3 flex md:flex-row md:gap-5 gap-3 flex-col items-center">
              <div className="md:w-1/3 w-full">
                <select
                  className="border rounded-sm py-2 px-4 w-full"
                  value={religion}
                  onChange={(e) => setReligion(e.target.value)}
                >
                  <option value="">Religion ?</option>
                  <option value="Hinduism">Hinduism</option>
                  <option value="Islam">Islam</option>
                  <option value="Christianity">Christianity</option>
                </select>
              </div>
              <div className="md:w-1/3 w-full">
                <select
                  className="border rounded-sm py-2 px-4 w-full"
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                >
                  <option value="">Nationality ?</option>
                  <option value="Indian">Indian</option>
                </select>
              </div>
              <div className="md:w-1/3 w-full">
                <select
                  className="border rounded-sm py-2 px-4 w-full"
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
            <div className="md:pb-5 pb-3 flex">
              <input
                type="text"
                className="border rounded-sm py-2 px-4 w-full"
                placeholder="Enter your DOB (Date Of Birth) ?"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </div>
            <div className="md:pb-5 pb-3 flex">
              <input
                type="text"
                className="border rounded-sm py-2 px-4 w-full"
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

  return (
    <div className="flex md:flex-row flex-col items-center justify-center md:min-h-screen min-h-[87vh] md:p-5">
      <div className="left-section md:w-[45%] w-full bg-white md:p-8 md:pl-0 pb-10 pt-10 font-montserrat items-center justify-center flex flex-col">
        <p className="md:text-3xl text-xl font-montserrat pb-3 text-center">
          E-Vault Registration
        </p>
        <div>
          <Link to={`/login/${formType}`}>
            <p className="text-center pb-0 md:text-base text-xs text-blue-500">
              Already have an acccount ?
            </p>
            <p className="text-center pb-3 md:text-base text-xs text-blue-500">
              Login to E-Vault here
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
              Lawyer Registration
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
              Client Registration
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
              Judge Registration
            </button>
          </div>
        </div>
      </div>

      <div className="right-section md:w-[55%] w-full bg-white md:p-8 md:pr-0 pb-10 font-montserrat md:border-l md:border-blue-500 items-center justify-center flex">
        <form
          onSubmit={handleSubmit}
          className="md:w-[90%] w-full md:text-base text-sm"
        >
          {renderFormFields()}

          <div className="md:pb-5 pb-3 flex md:flex-row flex-col md:gap-5 gap-3">
            <div className="md:w-1/2 w-full">
              <input
                type="text"
                className="border rounded-sm py-2 px-4 w-full"
                placeholder="Enter your Aadhar UID ?"
                value={aadharUID}
                onChange={(e) => setAadharUID(e.target.value)}
              />
            </div>

            <div className="md:w-1/2 w-full">
              <input
                type="text"
                className="border rounded-sm py-2 px-4 w-full"
                placeholder="Enter your PAN ?"
                value={pan}
                onChange={(e) => setPan(e.target.value)}
              />
            </div>
          </div>

          <div className="md:pb-10 pb-3 flex md:flex-row md:gap-3 gap-3 flex-col items-center">
            <div className="md:w-2/3 w-full">
              <input
                type="text"
                className="border rounded-sm py-2 px-4 w-full"
                placeholder="Connect your metamask wallet 🔒"
                value={
                  walletAddress
                    ? shortenWalletAddress(walletAddress)
                    : walletAddress
                }
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
              Sign Up
            </button>
          </div>
        </form>
      </div>

      <ToastContainer
        toastClassName={"font-montserrat bg-blue-500 text-white text-center"}
        bodyClassName={"text-base p-3 rounded-sm"}
      />
    </div>
  );
};

export default SignUpComponent;
