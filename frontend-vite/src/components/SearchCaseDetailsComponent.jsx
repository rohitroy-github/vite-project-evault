import React, {useState, useEffect} from "react";
import {useNavigate, Link} from "react-router-dom";
import {ethers} from "ethers";
import getCaseDetailsByCaseID from "../blockchain-api/getCaseDetailsByCaseID";

const SearchCaseDetailsComponent = () => {
  const [caseID, setCaseID] = useState("");
  const [caseDetails, setCaseDetails] = useState(null);

  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);

  const navigate = useNavigate();

  const connectToBlockchain = async () => {
    try {
      // Request Ethereum accounts
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length === 0) {
        throw new Error("No Ethereum accounts available.");
      }

      // Convert and set the first account address
      const account = ethers.utils.getAddress(accounts[0]);
      setAccount(account);

      // Set up an event listener for account changes
      window.ethereum.on("accountsChanged", async () => {
        const updatedAccounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        if (updatedAccounts.length === 0) {
          throw new Error("No Ethereum accounts available.");
        }

        const updatedAccount = ethers.utils.getAddress(updatedAccounts[0]);
        setAccount(updatedAccount);
      });
    } catch (error) {
      console.error("Error connecting to Ethereum:", error);
      alert(
        "Error connecting to Ethereum. Please check MetaMask or your wallet settings."
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!caseID) {
      alert("Please fill in all the required fields.");
      return;
    }

    try {
      const caseDetails = await getCaseDetailsByCaseID(caseID);
      setCaseDetails(caseDetails);
      console.log("Fetched case details:", caseDetails);
    } catch (error) {
      console.error("Error fetching case details:", error);
      alert(
        "Error fetching case details. There's isn't any case registered with this caseID !"
      );
    }
  };

  useEffect(() => {
    connectToBlockchain();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 font-montserrat w-full">
        <h1 className="text-3xl font-montserrat mb-2 text-center">
          Search for case details ?
        </h1>
        <p className="text-gray-600 text-center mb-4">
          Only associated clients, lawyers, and judges of the case can access
          the relevant case details and information!
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 text-center">
            <input
              type="text"
              className="border rounded-lg py-2 px-4 w-1/2"
              placeholder="Please enter the case ID"
              value={caseID}
              onChange={(e) => setCaseID(e.target.value)}
            />
          </div>
          <div className="mb-4 text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg w-1/4"
            >
              Search
            </button>
          </div>
        </form>

        {/* Display case details table if available */}
        {caseDetails && (
          <div className="mt-10 text-center">
            {/* <h2 className="text-2xl font-semibold">Case Details</h2> */}
            <table className="w-full mt-2 border-collapse border ">
              <thead>
                <tr>
                  <th className="border  p-2">Case ID</th>
                  <th className="border  p-2">Case Subject</th>
                  <th className="border  p-2">Party 1</th>
                  <th className="border  p-2">Party 2</th>
                  <th className="border  p-2">Filing Date</th>
                  <th className="border  p-2">Appointed Judge</th>
                  <th className="border  p-2">Appointed Lawyers</th>
                  <th className="border  p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border  p-2">{caseDetails.caseId}</td>
                  <td className="border  p-2">{caseDetails.caseSubject}</td>
                  <td className="border  p-2">{caseDetails.UIDOfParty1}</td>
                  <td className="border  p-2">{caseDetails.UIDOfParty2}</td>
                  <td className="border  p-2">
                    {caseDetails.filedOnDate.toString()}
                  </td>
                  <td className="border  p-2">{caseDetails.associatedJudge}</td>
                  <td className="border  p-2">
                    {caseDetails.associatedLawyers.join(", ")}
                  </td>
                  <td className="border  p-2">
                    <Link to={`/case-details?caseid=${caseDetails.caseId}`}>
                      <button className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full">
                        Details
                      </button>
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchCaseDetailsComponent;
