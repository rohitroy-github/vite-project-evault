import React, {useState, useEffect} from "react";
import getCaseDetailsByCaseID from "../blockchain-api/getCaseDetailsByCaseID";
import FormData from "form-data";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import updateCaseProgressWithCaseId from "@/blockchain-api/updateCaseProgressWithCaseId";
import getJudgeDetailsByUID from "@/blockchain-api/getJudgeDetailsByUID";
import Loader from "./Loader";
import getLawyerDetailsByUID from "@/blockchain-api/getLawyerDetailsByUID";
import {superShortenWalletAddress} from "@/lib/utils";

import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getClientDetailsByUID from "@/blockchain-api/getClientDetailsByUID";
import uploadCaseDocument from "@/blockchain-api/uploadCaseDocumentUsingVerbwire";

const CaseDetailsComponent = ({caseID}) => {
  const [caseDetails, setCaseDetails] = useState(null);
  const [newProgress, setNewProgress] = useState("");

  const [loading, setLoading] = useState(true);
  const [lawyers, setLawyers] = useState([]);
  const [judgeDetails, setJudgeDetails] = useState({name: "", UID: 0});

  const [progressIsUpdating, setProgressIsUpdating] = useState(false);
  const [uploadDocumentDialogBoxIsOpen, setUploadDocumentDialogBoxIsOpen] =
    useState(false);

  const [userAddress, setUserAddress] = useState("");
  const [isUserJudge, setIsUserJudge] = useState(false);
  const [isUserLawyer, setIsUserLawyer] = useState(false);
  const [isUserClient, setIsUserClient] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadingDocument, setUploadingDocument] = useState(false);

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

        const party1Details = await getClientDetailsByUID(
          fetchedCaseDetails.UIDOfParty1,
          "walletAddress"
        );
        const party2Details = await getClientDetailsByUID(
          fetchedCaseDetails.UIDOfParty2,
          "walletAddress"
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

        if (
          party1Details.walletAddress.toLowerCase() ===
            userAddress.toLowerCase() ||
          party2Details.walletAddress.toLowerCase() ===
            userAddress.toLowerCase()
        ) {
          setIsUserClient(true);
        } else {
          setIsUserClient(false);
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
  }, [caseID, userAddress, caseDetails, progressIsUpdating]);

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

      // if ((i / numColumns) % 2 === 1) {
      //   // Reverse order for odd rows to create a snake pattern
      //   row.reverse();
      // }

      rows.push(row);
    }

    return rows;
  };

  const handleCaseProgressUpdate = async (e) => {
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

    // closingDialogBox
    setProgressIsUpdating(false);
    // resettingFormValue
    setNewProgress("");

    toast(`${isProgressUpdatedStatus}`, {
      position: "top-right",
      autoClose: 1500,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      icon: false,
      hideProgressBar: true,
      closeButton: false,
    });
  };

  const hanleCaseTermination = async (e) => {
    e.preventDefault();

    let isProgressUpdatedStatus;

    if (
      caseDetails.caseProgress[caseDetails.caseProgress.length - 1].includes(
        "Case terminated"
      )
    ) {
      toast(`Case already terminated ❌`, {
        position: "top-right",
        autoClose: 1500,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        icon: false,
        hideProgressBar: true,
        closeButton: false,
      });
      // closingDialogBox
      setProgressIsUpdating(false);

      return;
    }

    if (lawyers[0].walletAddress.toLowerCase() === userAddress.toLowerCase()) {
      isProgressUpdatedStatus = await updateCaseProgressWithCaseId(
        caseID,
        `Case terminated by ${lawyers[0].name}`
      );
    } else {
      isProgressUpdatedStatus = await updateCaseProgressWithCaseId(
        caseID,
        `Case terminated by ${lawyers[1].name}`
      );
    }

    // closingDialogBox
    setProgressIsUpdating(false);

    toast(`${isProgressUpdatedStatus}`, {
      position: "top-right",
      autoClose: 1500,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      icon: false,
      hideProgressBar: true,
      closeButton: false,
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setFileName(file ? file.name : "");

    // Show image preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();

    if (selectedFile) {
      setUploadingDocument(true);

      const formData = new FormData();
      formData.append("file", selectedFile);

      const isFileAdded = await uploadCaseDocument(caseID, formData);

      // resettingToInitialValues
      setFileName("");
      setSelectedFile(null);
      setImagePreview(null);
      setUploadDocumentDialogBoxIsOpen(false);
      setUploadingDocument(false);

      // Customization: https://fkhadra.github.io/react-toastify/how-to-style/
      toast(`${isFileAdded}`, {
        position: "top-right",
        autoClose: 1500,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        icon: false,
        hideProgressBar: true,
        closeButton: false,
      });
    } else {
      console.warn("No file selected for upload.");
    }
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
              <Dialog
                open={progressIsUpdating}
                onOpenChange={setProgressIsUpdating}
              >
                <DialogTrigger asChild>
                  <div className="md:pb-5 pb-3 flex md:justify-end justify-center">
                    <button className="bg-blue-500 hover:bg-blue-300 text-white py-2 px-4 rounded-sm md:text-sm text-xs">
                      Update Case Progress
                    </button>
                  </div>
                </DialogTrigger>
                <DialogContent className="md:max-w-[500px] xs:max-w-[350px] font-montserrat bg-blue-100 md:p-5 p-5 rounded-sm">
                  <DialogHeader>
                    <DialogTitle>Update case progress</DialogTitle>
                    <DialogDescription>
                      All updates will be added to the case progress timeline.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleCaseProgressUpdate}>
                    <div className="flex pb-3 md:pb-5 justify-center">
                      <textarea
                        type="text"
                        className="border rounded-sm py-2 px-4 w-[95%] md:text-sm text-xs"
                        placeholder="Enter the case update here."
                        value={newProgress}
                        onChange={(e) => setNewProgress(e.target.value)}
                        rows={3}
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
            ) : isUserLawyer || isUserClient ? (
              <Dialog
                open={progressIsUpdating}
                onOpenChange={setProgressIsUpdating}
              >
                <DialogTrigger asChild>
                  <div className="md:pb-5 pb-3 flex md:justify-end justify-center">
                    <button className="bg-blue-500 hover:bg-blue-300 text-white py-2 px-4 rounded-sm md:text-sm text-xs">
                      Withdraw Case
                    </button>
                  </div>
                </DialogTrigger>
                <DialogContent className="md:max-w-[480px] xs:max-w-[350px] font-montserrat bg-blue-100 md:p-6 p-6 rounded-sm">
                  <DialogHeader>
                    {/* <DialogTitle>Update case progress</DialogTitle> */}
                    <DialogDescription>
                      <div className="md:text-base xs:text-xs">
                        Are you sure that you want to withdraw this case ?
                      </div>
                      <div className="text-xs">
                        Case termination requires client's full approval
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={hanleCaseTermination}>
                    <DialogFooter
                      className={
                        "text-center items-center justify-center flex-row md:pt-2 pt-1"
                      }
                    >
                      <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-300 text-white py-2 px-4 rounded-sm md:text-sm text-xs md:w-1/4 w-1/3 mr-2"
                      >
                        Yes
                      </button>
                      <DialogClose asChild>
                        <button className="bg-blue-500 hover:bg-blue-300 text-white py-2 px-4 rounded-sm md:text-sm text-xs md:w-1/4 w-1/3">
                          No
                        </button>
                      </DialogClose>
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
                  className="flex insideLoop1 items-center w-full gap-2 md:gap-3"
                >
                  {row.map((progress, index) => (
                    <div
                      key={index}
                      className={`insideLoop2 md:w-1/3 w-1/2 md:min-h-[70px] min-h-[80px] p-3 md:mb-3 mb-2 border rounded-sm items-start flex ${
                        caseDetails.caseProgress.indexOf(progress) + 1 ===
                        caseDetails.caseProgress.length
                          ? "bg-blue-300 animate-blink"
                          : "bg-blue-100"
                      } hover:border-2 hover:border-blue-500 border-white-500 border-2 cursor-pointer`}
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
              <Dialog
                open={uploadDocumentDialogBoxIsOpen}
                onOpenChange={setUploadDocumentDialogBoxIsOpen}
              >
                <DialogTrigger asChild>
                  <div className="md:pb-5 pb-3 flex md:justify-end justify-center">
                    <button className="bg-blue-500 hover:bg-blue-300 text-white py-2 px-4 rounded-sm md:text-sm text-xs">
                      Upload Case Files
                    </button>
                  </div>
                </DialogTrigger>
                <DialogContent className="md:max-w-[450px] xs:max-w-[350px] font-montserrat bg-blue-100 md:p-5 p-5 rounded-sm">
                  <DialogHeader>
                    <DialogTitle>Upload Case Document</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleFileUpload} className="w-full">
                    <div className="flex flex-col pb-3 md:pb-5 justify-center items-center w-full">
                      <div className="flex rounded-sm items-center justify-center pb-2 md:w-[95%]">
                        {imagePreview ? (
                          <img
                            src={imagePreview}
                            alt="Image Preview"
                            className="w-full md:h-[200px] h-[150px] object-cover p-1 bg-white rounded-sm"
                          />
                        ) : (
                          <img
                            src={"/dummy-image.jpg"}
                            alt="Image Preview"
                            className="w-full md:h-[200px] h-[150px] object-cover p-1 bg-white rounded-sm"
                          />
                        )}
                      </div>

                      <div className="flex md:w-[95%] w-full justify-center items-center">
                        <input
                          type="file"
                          id="fileInput"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <label htmlFor="fileInput" className="flex w-full">
                          <span
                            id="file-name"
                            className="flex bg-white w-2/3 rounded-l-sm text-center items-center justify-center md:text-sm text-xs"
                          >
                            {fileName}
                          </span>
                          <span className="bg-blue-500 hover:bg-blue-300 text-white font-montserrat py-2 px-4 w-1/3 rounded-r-sm text-center md:text-sm text-xs">
                            Select File
                          </span>
                        </label>
                      </div>
                    </div>
                    <DialogFooter
                      className={"text-center items-center justify-center"}
                    >
                      <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-300 text-white py-2 px-4 rounded-sm md:text-sm text-xs"
                      >
                        {uploadingDocument
                          ? "Uploading File"
                          : "Upload Document"}
                      </button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            ) : (
              <div className="md:pb-5 pb-3 md:w-full">
                <button className="bg-blue-300 text-white py-2 px-4 rounded-sm text-xs md:w-full ">
                  Only lawyers are authorized to upload case documents
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex md:flex-row flex-col items-start w-full">
          {caseDetails.caseDocumentHash.length > 0 ? (
            <div className="flex flex-wrap">
              <div className="grid xs:grid-cols-2 2xl:grid-cols-7 3xl:grid-cols-8 gap-2">
                {caseDetails.caseDocumentHash.map((imageUrl, index) => (
                  <div
                    key={index}
                    className="overflow-hidden rounded-sm shadow-md transition-transform transform hover:scale-105 2xl:p-2 p-1 bg-blue-100 w-full"
                  >
                    <img
                      src={`https://gateway.pinata.cloud/ipfs/${imageUrl}`}
                      alt={`Uploaded File ${index + 1}`}
                      className="w-full 3xl:min-h-[100px] 2xl:min-h-[90px] max-h-[80px] object-cover rounded-sm"
                    />

                    <div className="flex pt-2">
                      <div className="text-xs order-first">
                        Issued by:{" "}
                        {superShortenWalletAddress(
                          caseDetails.caseDocumentUploader[index]
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-xs md:text-sm">No case documents found</p>
          )}
        </div>
      </div>

      <ToastContainer
        toastClassName={"font-montserrat bg-blue-500 text-white text-center"}
        bodyClassName={"text-base p-3 rounded-sm"}
      />
    </div>
  );
};

export default CaseDetailsComponent;
