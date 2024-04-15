import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";

import getCaseDetailsByCaseID from "../blockchain-api/getCaseDetailsByCaseID";
import getJudgeDetailsByUID from "@/blockchain-api/getJudgeDetailsByUID";
import getLawyerDetailsByUID from "@/blockchain-api/getLawyerDetailsByUID";
import getClientDetailsByUID from "@/blockchain-api/getClientDetailsByUID";

const SearchCaseDetailsComponent = () => {
  const [caseID, setCaseID] = useState("");
  const [caseDetails, setCaseDetails] = useState(null);

  const [isUserJudge, setIsUserJudge] = useState(false);
  const [isUserLawyer, setIsUserLawyer] = useState(false);
  const [isUserClient, setIsUserClient] = useState(false);

  const [userAddress, setUserAddress] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!caseID) {
      alert("Please fill in all the required fields.");
      return;
    }

    try {
      const caseDetails = await getCaseDetailsByCaseID(caseID);
      setCaseDetails(caseDetails);
      // console.log("Fetched case details:", caseDetails);

      checkForCaseAdmins(caseDetails);
    } catch (error) {
      console.error("Error fetching case details:", error);
      alert(
        "Error fetching case details. There's isn't any case registered with this caseID !"
      );
    }
  };

  // checkingIfCaseAdminsAreTryingToViewFurtherCaseDetails?
  const checkForCaseAdmins = async (caseDetails) => {
    const judgeDetails = await getJudgeDetailsByUID(
      caseDetails.associatedJudge,
      "walletAddress"
    );

    const lawyerDetails = await Promise.all(
      caseDetails.associatedLawyers.map(async (lawyerUID) => {
        const lawyerInfo = await getLawyerDetailsByUID(
          lawyerUID,
          "walletAddress"
        );
        return {
          walletAddress: lawyerInfo.walletAddress,
        };
      })
    );

    const party1Details = await getClientDetailsByUID(
      caseDetails.UIDOfParty1,
      "walletAddress"
    );
    const party2Details = await getClientDetailsByUID(
      caseDetails.UIDOfParty2,
      "walletAddress"
    );

    if (
      party1Details.walletAddress.toLowerCase() === userAddress.toLowerCase() ||
      party2Details.walletAddress.toLowerCase() === userAddress.toLowerCase()
    ) {
      setIsUserClient(true);
    } else {
      setIsUserClient(false);
    }

    if (
      lawyerDetails[0].walletAddress.toLowerCase() ===
        userAddress.toLowerCase() ||
      lawyerDetails[1].walletAddress.toLowerCase() === userAddress.toLowerCase()
    ) {
      setIsUserLawyer(true);
    } else {
      setIsUserLawyer(false);
    }

    if (
      judgeDetails.walletAddress.toLowerCase() === userAddress.toLowerCase()
    ) {
      setIsUserJudge(true);
    } else {
      setIsUserJudge(false);
    }
  };

  useEffect(() => {
    // Function to handle MetaMask account change
    const handleAccountChange = (accounts) => {
      setUserAddress(accounts[0]);
    };

    // Listen for MetaMask account changes
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountChange);
    }

    const fetchCurrentWalletAddress = async () => {
      try {
        if (window.ethereum) {
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          setUserAddress(accounts[0]);
        } else {
          console.error("MetaMask not installed or user not logged in");
        }
      } catch (error) {
        console.error("Error fetching user address:", error);
      }
    };

    fetchCurrentWalletAddress();

    if (caseDetails) {
      checkForCaseAdmins(caseDetails);
    }

    // Clean up event listener when component unmounts
    return () => {
      if (window.ethereum) {
        window.ethereum.off("accountsChanged", handleAccountChange);
      }
    };
  }, [userAddress, isUserJudge, isUserLawyer, isUserClient]);

  return (
    <div className="flex items-center justify-center md:min-h-screen min-h-[87vh] md:p-5">
      <div className="font-montserrat w-full">
        <p className="md:text-3xl text-xl font-montserrat pb-3 text-center">
          Search for case details ?
        </p>
        <p className="text-gray-600 text-center pb-3 md:text-base text-sm">
          Only associated clients, lawyers, and judges of the case can access
          the relevant case details and information
        </p>
        <form onSubmit={handleSubmit} className="md:text-base text-sm">
          <div className="text-center">
            <input
              type="text"
              className="border rounded-sm py-2 px-4 md:w-1/2 w-full"
              placeholder="Please enter your caseID ?"
              value={caseID}
              onChange={(e) => setCaseID(e.target.value)}
            />
          </div>
          <div className="pt-5 text-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-300 text-white py-2 px-4 rounded-sm md:w-1/5 w-3/5 md:text-base text-sm"
            >
              Search Case
            </button>
          </div>
        </form>

        {/* Display case details table if available */}
        {caseDetails && (
          <div className="pt-10 text-center">
            {/* <h2 className="text-2xl font-semibold">Case Details</h2> */}
            <table className="w-full border-collapse border md:text-base md:block xs:hidden">
              <thead>
                <tr>
                  <th className="border  p-2">Case ID</th>
                  <th className="border  p-2">Case Subject</th>
                  <th className="border  p-2">Party 1</th>
                  <th className="border  p-2">Party 2</th>
                  <th className="border  p-2">Filing Date</th>
                  <th className="border  p-2">Appointed Judge</th>
                  <th className="border  p-2">Appointed Lawyers</th>
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
                </tr>
              </tbody>
            </table>

            {/* forMobileScreens */}
            <table className="w-full border-collapse border border-gray-200 text-xs md:hidden">
              <tbody>
                <tr>
                  <td className="border p-2">Case ID:</td>
                  <td className="border p-2">{caseDetails.caseId}</td>
                </tr>
                <tr>
                  <td className="border p-2">Case Subject:</td>
                  <td className="border p-2">{caseDetails.caseSubject}</td>
                </tr>
                <tr>
                  <td className="border p-2">Party 1:</td>
                  <td className="border p-2">{caseDetails.UIDOfParty1}</td>
                </tr>
                <tr>
                  <td className="border p-2">Party 2:</td>
                  <td className="border p-2">{caseDetails.UIDOfParty2}</td>
                </tr>
                <tr>
                  <td className="border p-2">Filing Date:</td>
                  <td className="border p-2">
                    {caseDetails.filedOnDate.toString()}
                  </td>
                </tr>
                <tr>
                  <td className="border p-2">Appointed Judge:</td>
                  <td className="border p-2">{caseDetails.associatedJudge}</td>
                </tr>
                <tr>
                  <td className="border p-2">Appointed Lawyers:</td>
                  <td className="border p-2">
                    {caseDetails.associatedLawyers.join(", ")}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="pt-5">
              {isUserJudge | isUserLawyer | isUserClient ? (
                <Link to={`/case-details?caseid=${caseDetails.caseId}`}>
                  <button className="bg-blue-500 hover:bg-blue-300 text-white py-2 px-4 rounded-sm md:w-1/6 w-2/5 md:text-sm text-xs">
                    See More Details
                  </button>
                </Link>
              ) : (
                <button className="bg-blue-300 text-white py-2 px-4 rounded-sm text-xs w-full md:w-2/6">
                  Only case admins are allowed to view further details
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchCaseDetailsComponent;
