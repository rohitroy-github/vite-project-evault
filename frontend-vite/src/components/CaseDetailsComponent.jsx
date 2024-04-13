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
import getLawyerDetailsByUID from "@/blockchain-api/getLawyerDetailsByUID";
import {superShortenWalletAddress} from "@/lib/utils";

const CaseDetailsComponent = ({caseID}) => {
  const [caseDetails, setCaseDetails] = useState(null);
  const [newProgress, setNewProgress] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [isUserJudge, setIsUserJudge] = useState(false);
  const [isUserLawyer, setIsUserLawyer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [lawyers, setLawyers] = useState([]);
  const [judgeDetails, setJudgeDetails] = useState({name: "", UID: 0});

  useEffect(() => {
    // Function to fetch case details based on the caseID
    const fetchCaseDetails = async () => {
      try {
        const fetchedCaseDetails = await getCaseDetailsByCaseID(caseID);
        setCaseDetails(fetchedCaseDetails);

        const judgeDetails = await getJudgeDetailsByUID(
          fetchedCaseDetails.associatedJudge,
          "name_UID_walletAddress"
        );

        // fetchingLawyerNames
        const lawyerDetails = await Promise.all(
          fetchedCaseDetails.associatedLawyers.map(async (lawyerUID) => {
            const lawyerInfo = await getLawyerDetailsByUID(
              lawyerUID,
              "name_UID_walletAddress"
            );
            return {
              uid: lawyerUID,
              name: lawyerInfo.name,
              walletAddress: lawyerInfo.walletAddress,
            };
          })
        );
        setLawyers(lawyerDetails);

        if (
          lawyerDetails[0].walletAddress.toLowerCase() ===
            userAddress.toLowerCase() ||
          lawyerDetails[1].walletAddress.toLowerCase() ===
            userAddress.toLowerCase()
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

        setJudgeDetails({
          name: judgeDetails.name,
          UID: judgeDetails.UID,
        });

        setTimeout(() => {
          setLoading(false);
        }, 1500);
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
      fetchCaseDetails();
    };

    const handleResize = () => {
      fetchCaseDetails();
    };

    window.addEventListener("resize", handleResize);

    fetchCaseDetails();
    fetchCurrentWalletAddress();

    // Listen for MetaMask account changes
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountChange);
    }

    // Clean up event listener when component unmounts
    return () => {
      if (window.ethereum) {
        window.ethereum.off("accountsChanged", handleAccountChange);
      }

      window.removeEventListener("resize", handleResize);
    };

    // fetchCurrentWalletAddress();
    // fetchCaseDetails();
  }, [caseID, userAddress]);

  // Function to create a snake-like pattern of progress cells
  const createSnakePattern = (progressArray) => {
    const rows = [];
    let numColumns;

    if (window.innerWidth < 768) {
      numColumns = 2;
    } else {
      numColumns = 3;
    }

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
    <div className="flex flex-col items-center justify-center md:py-10 xs:py-5 md:min-h-auto min-h-[87vh]">
      <div className="md:pb-10 xs:pb-3">
        <button className="bg-blue-500 hover:bg-blue-300 text-white font-montserrat py-2 px-4 rounded text-xs md:text-base">
          Case Details
        </button>
      </div>

      <p className="md:text-2xl xs:text-xl font-montserrat md:pb-5 pb-3 text-center md:text-left md:w-[80%] w-full">
        Case Information
      </p>

      <div className="md:w-[80%] w-full flex items-center justify-center pb-5 md:pb-0">
        <table className="w-full border border-gray-200 md:text-base xs:text-xs">
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
                {lawyers.map((lawyer, index) => (
                  <li key={index} className="marker:text-blue-500">
                    <span>
                      {lawyer.name}{" "}
                      <span className="text-xs">( {lawyer.uid} )</span>
                    </span>
                  </li>
                ))}
              </td>
            </tr>
            <tr>
              <td className="font-montserrat p-2 w-1/3 border border-gray-200">
                Associated Judge
              </td>
              <td className="font-montserrat p-2 w-2/3 border border-gray-200">
                <span>
                  {judgeDetails.name}{" "}
                  <span className="text-xs">( {judgeDetails.UID} )</span>
                </span>
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
                {caseDetails.caseProgress[caseDetails.caseProgress.length - 1]}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="md:w-[80%] w-full flex flex-col md:pt-10 xs:pt-0 pb-5 md:pb-0">
        <div className="w-full text-center justify-between flex md:flex-row flex-col md:text-left md:text-2xl xs:text-xl font-montserrat">
          <p className="md:text-2xl xs:text-xl font-montserrat md:pb-5 pb-2 text-center md:text-left 2xl:w-[65%] 3xl:w-[70%] w-full">
            Case Progress
          </p>
          <div className="2xl:w-[35%] 3xl:w-[30%]">
            {/* onlyJudgeIsAllowedToUpdateTheProgress */}
            {isUserJudge ? (
              <Dialog>
                <DialogTrigger asChild>
                  <div className="md:pb-5 pb-3 flex md:justify-end justify-center">
                    <button className="bg-blue-500 hover:bg-blue-300 text-white py-2 px-4 rounded-sm md:text-sm text-xs">
                      Update Case Progress
                    </button>
                  </div>
                </DialogTrigger>
                <DialogContent className="md:max-w-[500px] xs:max-w-[350px] font-montserrat bg-blue-100 md:p-8 p-5 rounded-sm">
                  <DialogHeader>
                    <DialogTitle>Update case progress</DialogTitle>
                    <DialogDescription>
                      All updates will be added to the case progress timeline.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit}>
                    <div className="grid pb-3 md:pb-5">
                      <textarea
                        type="text"
                        className="border rounded-lg py-2 px-4 w-full md:text-sm text-xs"
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
                        className="bg-blue-500 hover:bg-blue-300 text-white py-2 px-4 rounded-sm md:text-sm text-xs"
                      >
                        Update Progress
                      </button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            ) : (
              <div className="md:pb-5 pb-3 md:w-full">
                <button className="bg-blue-300 text-white py-2 px-4 rounded-sm text-xs md:w-full">
                  Only judge is authorized to update case progress
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="w-full">
          <div className="flex flex-col">
            {createSnakePattern(caseDetails.caseProgress).map(
              (row, rowIndex) => (
                <div
                  key={rowIndex}
                  className="flex insideLoop1 items-center w-full"
                >
                  {row.map((progress, index) => (
                    <div
                      key={index}
                      className={`insideLoop2 md:w-1/3 w-1/2 md:min-h-[70px] min-h-[80px] p-3 md:mb-3 mb-2 border rounded-sm items-start flex ${
                        caseDetails.caseProgress.indexOf(progress) + 1 ===
                        caseDetails.caseProgress.length
                          ? "bg-blue-300 animate-blink"
                          : "bg-blue-100"
                      } hover:border-2 hover:border-blue-500 border-white-500 border-2 cursor-pointer ${
                        index == 0 || index % 5 == 0 ? "ml-0" : "md:ml-3 ml-2"
                      }`}
                    >
                      {/* {index < row.length - 1 && (
                        <div className="absolute top-1/2 right-0 -mr-2 w-4 h-4 bg-gray-300 rounded-full" />
                      )} */}
                      <div className="font-montserrat flex flex-col w-full">
                        <div className="flex justify-between">
                          <div className="text-xs md:text-sm order-first">
                            {progress}
                          </div>
                          <div className="text-xs order-last ml-5">
                            {caseDetails.caseProgress.indexOf(progress)}
                          </div>
                        </div>

                        <div className="flex pt-1">
                          <div className="text-xs order-first">
                            Issued by:{" "}
                            {superShortenWalletAddress(
                              caseDetails.caseProgressIssuer[index]
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}
          </div>
        </div>
      </div>
      <div className="md:w-[80%] w-full flex flex-col md:pt-9 xs:pt-0 font-montserrat">
        <div className="justify-between flex md:flex-row flex-col">
          <p className="md:text-2xl xs:text-xl font-montserrat md:pb-5 pb-2 text-center md:text-left 2xl:w-[65%] 3xl:w-[70%] w-full">
            Case Documents
          </p>

          <div className="2xl:w-[35%] 3xl:w-[30%]">
            {/* lawyers&JudgesAreAllowedtoUploadTheDocuments */}
            {isUserJudge | isUserLawyer ? (
              <div className="md:pb-5 pb-3 flex md:justify-end justify-center">
                <button className="bg-blue-500 hover:bg-blue-300 text-white py-2 px-4 rounded-sm md:text-sm text-xs">
                  Upload Case Files
                </button>
              </div>
            ) : (
              <div className="md:pb-5 pb-3 md:w-full">
                <button className="bg-blue-300 text-white py-2 px-4 rounded-sm text-xs md:w-full ">
                  Only lawyers are authorized to upload case documents
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex md:flex-row flex-col">
          <p className="md:text-base xs:text-xl text-center w-full text-blue-500">
            Feature coming soon
          </p>
        </div>
      </div>
    </div>
  );
};

export default CaseDetailsComponent;
