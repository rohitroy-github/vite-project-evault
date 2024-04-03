import React, {useState, useEffect} from "react";
import getCaseDetailsByCaseID from "../blockchain-api/getCaseDetailsByCaseID";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import updateCaseProgressWithCaseId from "@/blockchain-api/updateCaseProgressWithCaseId";
import getJudgeDetailsByUID from "@/blockchain-api/getJudgeDetailsByUID";
import Loader from "./Loader";

const CaseDetailsComponent = ({caseID}) => {
  const [caseDetails, setCaseDetails] = useState(null);
  const [newProgress, setNewProgress] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [isUserJudge, setIsUserJudge] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch case details based on the caseID
    const fetchCaseDetails = async () => {
      try {
        const fetchedCaseDetails = await getCaseDetailsByCaseID(caseID);
        setCaseDetails(fetchedCaseDetails);

        setTimeout(() => {
          setLoading(false);
        }, 1500);

        const judgeDetails = await getJudgeDetailsByUID(
          fetchedCaseDetails.associatedJudge
        );

        if (
          judgeDetails.walletAddress.toLowerCase() === userAddress.toLowerCase()
        ) {
          setIsUserJudge(true);
        } else {
          setIsUserJudge(false);
        }
      } catch (error) {
        console.error("Error while fetching case details:", error);
      }
    };

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

    // Function to handle MetaMask account change
    const handleAccountChange = (accounts) => {
      setUserAddress(accounts[0]);
      fetchCaseDetails(); // Call fetchCaseDetails after the account changes
    };

    // Listen for MetaMask account changes
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountChange);
    }

    // Initial fetch of wallet address and case details
    fetchCurrentWalletAddress();
    fetchCaseDetails();

    // Clean up event listener when component unmounts
    return () => {
      if (window.ethereum) {
        window.ethereum.off("accountsChanged", handleAccountChange);
      }
    };

    // fetchCurrentWalletAddress();
    // fetchCaseDetails();
  }, [caseID, userAddress]);

  // Function to create a snake-like pattern of progress cells
  const createSnakePattern = (progressArray) => {
    const rows = [];
    const numColumns = 3;

    for (let i = 0; i < progressArray.length; i += numColumns) {
      const row = progressArray.slice(i, i + numColumns);

      if ((i / numColumns) % 2 === 1) {
        // Reverse order for odd rows to create a snake pattern
        row.reverse();
      }

      rows.push(row);
    }

    return rows;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newProgress) {
      alert("Add a new progress to continue !");
      return;
    }

    const formData = {
      newProgress,
    };

    const isProgressUpdatedStatus = await updateCaseProgressWithCaseId(
      caseID,
      formData.newProgress
    );

    alert(isProgressUpdatedStatus);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5">
      <div className="w-[80%]">
        <h2 className="text-2xl font-montserrat mb-8">Case Information</h2>
      </div>
      <div className="w-[80%] flex items-center justify-center">
        {caseDetails ? (
          <table className="min-w-full border border-gray-200">
            <tbody>
              <tr>
                <td className="font-montserrat p-2 w-1/3 border border-gray-200">
                  Case ID
                </td>
                <td className="font-montserrat p-2 w-2/3 border border-gray-200">
                  {caseDetails.caseId}
                </td>
              </tr>
              <tr>
                <td className="font-montserrat p-2 w-1/3 border border-gray-200">
                  UID Of Party 1
                </td>
                <td className="font-montserrat p-2 w-2/3 border border-gray-200">
                  {caseDetails.UIDOfParty1}
                </td>
              </tr>
              <tr>
                <td className="font-montserrat p-2 w-1/3 border border-gray-200">
                  UID Of Party 2
                </td>
                <td className="font-montserrat p-2 w-2/3 border border-gray-200">
                  {caseDetails.UIDOfParty2}
                </td>
              </tr>
              <tr>
                <td className="font-montserrat p-2 w-1/3 border border-gray-200">
                  Filed On Date
                </td>
                <td className="font-montserrat p-2 w-2/3 border border-gray-200">
                  {caseDetails.filedOnDate.toString()}
                </td>
              </tr>
              <tr>
                <td className="font-montserrat p-2 w-1/3 border border-gray-200">
                  Associated Lawyers
                </td>
                <td className="font-montserrat p-2 w-2/3 border border-gray-200">
                  <ul className="list-disc pl-6">
                    {caseDetails.associatedLawyers.map((lawyer, index) => (
                      <li key={index}>{lawyer}</li>
                    ))}
                  </ul>
                </td>
              </tr>
              <tr>
                <td className="font-montserrat p-2 w-1/3 border border-gray-200">
                  Associated Judge
                </td>
                <td className="font-montserrat p-2 w-2/3 border border-gray-200">
                  {caseDetails.associatedJudge}
                </td>
              </tr>
              <tr>
                <td className="font-montserrat p-2 w-1/3 border border-gray-200">
                  Case Subject
                </td>
                <td className="font-montserrat p-2 w-2/3 border border-gray-200">
                  {caseDetails.caseSubject}
                </td>
              </tr>
              <tr>
                <td className="font-montserrat p-2 w-1/3 border border-gray-200">
                  Latest Case Update
                </td>
                <td className="font-montserrat p-2 w-2/3 border border-gray-200">
                  {
                    caseDetails.caseProgress[
                      caseDetails.caseProgress.length - 1
                    ]
                  }
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          <p>Loading case details...</p>
        )}
      </div>
      <div className="w-[80%] mb-5 mt-10 flex flex-col">
        <div className="w-full flex items-center justify-between mb-8">
          <h2 className="text-2xl font-montserrat">Case Progress</h2>
          {isUserJudge && (
            <Dialog>
              <DialogTrigger asChild>
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-montserrat py-2 px-4 rounded text-sm">
                  Update Progress
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[450px] font-montserrat">
                <DialogHeader>
                  <DialogTitle>Update case progress</DialogTitle>
                  <DialogDescription>
                    All updates will be added to the case progress timeline.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-3 py-2">
                    <textarea
                      type="text"
                      className="border rounded-lg py-2 px-4 w-full text-sm"
                      placeholder="Enter the case update here."
                      value={newProgress}
                      onChange={(e) => setNewProgress(e.target.value)}
                    />
                  </div>
                  <DialogFooter
                    className={"text-center items-center justify-center"}
                  >
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-600 text-white font-montserrat py-2 px-4 rounded text-sm mt-4"
                    >
                      Update Progress
                    </button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>
        <div className="w-full">
          {caseDetails ? (
            <div className="flex flex-col">
              {createSnakePattern(caseDetails.caseProgress).map(
                (row, rowIndex) => (
                  <div
                    key={rowIndex}
                    className="flex insideLoop1 justify-evenly items-center w-full"
                  >
                    {row.map((progress, index) => (
                      <div
                        key={index}
                        className={`insideLoop2 w-1/3 h-[75px] p-3 mb-3 border rounded-lg ${
                          caseDetails.caseProgress.indexOf(progress) + 1 ===
                          caseDetails.caseProgress.length
                            ? "bg-blue-300 animate-blink"
                            : "bg-blue-100"
                        } hover:border-2 hover:border-blue-500 border-white-500 border-2 cursor-pointer ${
                          index == 0 || index % 5 == 0 ? "ml-0" : "ml-3"
                        }`}
                      >
                        {/* {index < row.length - 1 && (
                        <div className="absolute top-1/2 right-0 -mr-2 w-4 h-4 bg-gray-300 rounded-full" />
                      )} */}
                        <div className="font-montserrat flex justify-between">
                          <div className="text-sm order-first">{progress}</div>
                          <div className="text-xs order-last ml-5">
                            {caseDetails.caseProgress.indexOf(progress)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>
          ) : (
            <p>Loading case progress...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaseDetailsComponent;
