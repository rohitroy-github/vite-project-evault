import React, {useState, useEffect} from "react";
import {ethers} from "ethers";
import registerNewCase from "../blockchain-api/registerNewCase";

const RegisterANewCaseComponent = ({cientAccount}) => {
  const [UIDOfParty1, setUIDOfParty1] = useState("");
  const [UIDOfParty2, setUIDOfParty2] = useState("");
  const [associatedJudge, setAssociatedJudge] = useState("");
  const [caseSubject, setCaseSubject] = useState("");
  const [associatedLawyers, setAssociatedLawyers] = useState([]);
  const [callerAccount, setCallerAccount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any of the required fields are empty
    if (
      !UIDOfParty1 ||
      !UIDOfParty2 ||
      !associatedJudge ||
      !caseSubject ||
      !associatedLawyers ||
      !callerAccount
    ) {
      alert("Please fill in all the required fields.");
      return;
    }

    const formData = {
      UIDOfParty1,
      UIDOfParty2,
      associatedJudge,
      caseSubject,
      associatedLawyers,
      account: callerAccount,
    };

    console.log("Submitted data :", formData);
    try {
      const register = await registerNewCase(formData);
      alert(register);
    } catch (error) {
      console.error("Error during registration >>> ", error);
    }
  };

  useEffect(() => {
    const fetchCallerAccount = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });

          if (accounts.length > 0) {
            setCallerAccount(accounts[0]); // Set the first account as the callerAccount
          }
        } catch (error) {
          console.error("Error fetching caller account: ", error);
        }
      }
    };

    fetchCallerAccount();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen p-5">
      <div className="bg-white p-8 font-montserrat w-[50%]">
        <h1 className="text-3xl font-montserrat mb-5 text-center">
          Register A New Legal Case
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            {/* Replace the label with a placeholder */}
            <input
              type="text"
              className="border rounded-lg py-2 px-4 w-full"
              placeholder="Enter UID for Part 1 ? "
              value={UIDOfParty1}
              onChange={(e) => setUIDOfParty1(e.target.value)}
            />
          </div>
          <div className="mb-5">
            {/* Replace the label with a placeholder */}
            <input
              type="text"
              className="border rounded-lg py-2 px-4 w-full"
              placeholder="Enter UID for Part 2 ? "
              value={UIDOfParty2}
              onChange={(e) => setUIDOfParty2(e.target.value)}
            />
          </div>
          <div className="mb-5">
            {/* Replace the label with a placeholder */}
            <input
              type="text"
              className="border rounded-lg py-2 px-4 w-full"
              placeholder="Case Subject ? "
              value={caseSubject}
              onChange={(e) => setCaseSubject(e.target.value)}
            />
          </div>
          <div className="mb-5">
            {/* Replace the label with a placeholder */}
            <input
              type="text"
              className="border rounded-lg py-2 px-4 w-full"
              placeholder="Case Judge ? "
              value={associatedJudge}
              onChange={(e) => setAssociatedJudge(e.target.value)}
            />
          </div>
          <div className="mb-5">
            {/* Replace the label with a placeholder */}
            <input
              type="text"
              className="border rounded-lg py-2 px-4 w-full"
              placeholder="Associated Lawyers (comma-separated) ? "
              value={associatedLawyers}
              onChange={(e) =>
                setAssociatedLawyers(
                  e.target.value.split(",").map((lawyer) => lawyer.trim())
                )
              }
            />
          </div>
          <div className="text-center mt-5 w-full">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg w-1/2"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterANewCaseComponent;
