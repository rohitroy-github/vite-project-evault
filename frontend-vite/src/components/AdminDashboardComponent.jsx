import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";

import getClientDetailsByUID from "../blockchain-api/getClientDetailsByUID";
import getCasesForClientByUID from "../blockchain-api/getCasesForClientByUID";
import getLawyerDetailsByUID from "../blockchain-api/getLawyerDetailsByUID";
import getCasesForLawyerByUID from "../blockchain-api/getCasesForLawyerByUID";
import getJudgeDetailsByUID from "../blockchain-api/getJudgeDetailsByUID";
import getCasesForJudgeByUID from "../blockchain-api/getCasesForJudgeByUID";
import Loader from "./Loader";
import {shortenWalletAddress} from "@/lib/utils";

const AdminDashboardComponent = ({aadharUID, adminType}) => {
  const [adminDetails, setAdminDetails] = useState(null);

  const [allCasesOnClient, setAllCasesOnClient] = useState([]);
  const [last3Cases, setLast3Cases] = useState([]);

  const [loading, setLoading] = useState(true);

  let result1, result2, justLast3Cases;

  const fetchData = async () => {
    try {
      if (adminType === "client") {
        result1 = await getClientDetailsByUID(aadharUID);
        setAdminDetails(result1);

        // FetchignAllTheCasesOnTheClient
        result2 = await getCasesForClientByUID(aadharUID);
        setAllCasesOnClient(result2);

        // justTakingTheLast3Cases
        justLast3Cases = result2.slice(-3);
        setLast3Cases(justLast3Cases);
      } else if (adminType === "lawyer") {
        result1 = await getLawyerDetailsByUID(aadharUID, "all");
        setAdminDetails(result1);

        result2 = await getCasesForLawyerByUID(aadharUID);
        setAllCasesOnClient(result2);

        justLast3Cases = result2.slice(-3);
        setLast3Cases(justLast3Cases);
      } else if (adminType === "judge") {
        result1 = await getJudgeDetailsByUID(aadharUID, "all");
        setAdminDetails(result1);

        result2 = await getCasesForJudgeByUID(aadharUID);
        setAllCasesOnClient(result2);

        justLast3Cases = result2.slice(-3);
        setLast3Cases(justLast3Cases);
      }
    } catch (error) {
      console.error("Error fetching admin details:", error);
    }
  };

  useEffect(() => {
    fetchData();

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center md:py-10 xs:py-5">
        <div className="md:pb-10 xs:pb-5">
          <button className="bg-blue-500 hover:bg-blue-300 text-white font-montserrat py-2 px-4 rounded text-sm md:text-base">
            {adminType === "client" && `Client Dashboard`}
            {adminType === "lawyer" && `Lawyer Dashboard`}
            {adminType === "judge" && `Judge Dashboard`}
          </button>
        </div>

        <div className="flex xl:flex-row w-full justify-center xs:flex-col">
          {/* Left Section */}
          <div className="md:w-[60%] w-full flex flex-col md:px-5 items-center xs:flex-2 xs:pb-5 md:pb-0">
            <h2 className="md:text-2xl xs:text-xl font-montserrat mb-4 text-left">
              Your Recent Cases
            </h2>

            {last3Cases ? (
              <div className="md:w-[90%] w-full md:text-base xs:text-xs">
                {last3Cases.map((caseInfo, index) => (
                  <div
                    key={index}
                    className="bg-white md:p-5 p-4 rounded-lg border border-gray-300 hover:bg-gray-100 mb-3 md:mb-4"
                    style={{position: "relative"}}
                  >
                    <Link to={`/case-details?caseid=${caseInfo.caseId}`}>
                      <div className="flex flex-row justify-between">
                        <div className="order-first">
                          <p className="font-montserrat">
                            Case Subject: {caseInfo.caseSubject}
                          </p>
                        </div>

                        <div className="order-last">
                          <p className="text-xs font-montserrat">
                            Case ID: {caseInfo.caseId}
                          </p>
                        </div>
                      </div>

                      <p className="font-montserrat">
                        Filed On: {caseInfo.filedOnDate.toLocaleString()}
                      </p>

                      <p className="font-montserrat">
                        Latest case update:{" "}
                        {
                          caseInfo.caseProgress[
                            caseInfo.caseProgress.length - 1
                          ]
                        }
                      </p>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4 md:space-y-3">
                <p className="text-lg font-montserrat">
                  Fetching recent case updates ...
                </p>
              </div>
            )}
          </div>

          {/* Right Section */}
          <div className="md:w-[40%] w-full flex flex-col md:px-5 md:border-l md:border-blue-500 md:min-h-[50vh] items-center xs:flex-1">
            <h2 className="md:text-2xl xs:text-xl font-montserrat mb-4 text-center">
              Profile Information
            </h2>
            <div className="md:w-[85%] w-full">
              <table className="w-full border border-gray-200 md:text-base xs:text-sm">
                <tbody>
                  <tr>
                    <td className="font-montserrat py-2 px-4 border border-gray-200 w-[50%]">
                      Full Name:
                    </td>
                    <td className="font-montserrat py-2 px-4 border border-gray-200">
                      {adminDetails.name}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-montserrat py-2 px-4 border border-gray-200">
                      Contact Number:
                    </td>
                    <td className="font-montserrat py-2 px-4 border border-gray-200">
                      {adminDetails.contactNumber}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-montserrat py-2 px-4 border border-gray-200">
                      Aadhar UID:
                    </td>
                    <td className="font-montserrat py-2 px-4 border border-gray-200">
                      {adminDetails.UID}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-montserrat py-2 px-4 border border-gray-200">
                      Nationality:
                    </td>
                    <td className="font-montserrat py-2 px-4 border border-gray-200">
                      {adminDetails.nationality}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-montserrat py-2 px-4 border border-gray-200">
                      Religion:
                    </td>
                    <td className="font-montserrat py-2 px-4 border border-gray-200">
                      {adminDetails.religion}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-montserrat py-2 px-4 border border-gray-200">
                      Sex:
                    </td>
                    <td className="font-montserrat py-2 px-4 border border-gray-200">
                      {adminDetails.sex}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-montserrat py-2 px-4 border border-gray-200">
                      Date of Birth:
                    </td>
                    <td className="font-montserrat py-2 px-4 border border-gray-200">
                      {adminDetails.dateOfBirth}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-montserrat py-2 px-4 border border-gray-200">
                      Wallet Address
                    </td>
                    <td className="font-montserrat py-2 px-4 border border-gray-200">
                      {shortenWalletAddress(adminDetails.walletAddress)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center flex-col w-full md:py-10 xs:py-5">
        <div className="text-black pb-5">
          <h2 className="md:text-2xl xs:text-xl font-montserrat p-0">
            Your Past Cases
          </h2>
        </div>
        <div className="pb-10">
          <Link to={`/admin/register-new-case`} className="">
            <button className="bg-blue-500 hover:bg-blue-300 text-white font-montserrat py-2 px-4 rounded text-sm md:text-base">
              Register New Case
            </button>
          </Link>
        </div>

        {allCasesOnClient ? (
          <div className="space-y-3 md:w-[75%] w-full">
            {allCasesOnClient.map((caseInfo, index) => (
              <div
                key={index}
                className="bg-white md:p-5 p-4 rounded-md border border-gray-300 hover:bg-gray-100"
                style={{position: "relative"}}
              >
                <Link to={`/case-details?caseid=${caseInfo.caseId}`}>
                  <div className="flex flex-row justify-between">
                    <div className="order-first">
                      <p className="md:text-base xs:text-xs font-montserrat">
                        Case Subject: {caseInfo.caseSubject}
                      </p>
                    </div>

                    <div className="order-last">
                      <p className="text-xs font-montserrat">
                        Case ID: {caseInfo.caseId}
                      </p>
                    </div>
                  </div>

                  <p className="md:text-sm xs:text-xs font-montserrat">
                    Case judged by : {caseInfo.associatedJudge}
                  </p>

                  <p className="md:text-sm xs:text-xs font-montserrat">
                    Filed On: {caseInfo.filedOnDate.toLocaleString()}
                  </p>

                  <p className="md:text-sm xs:text-xs font-montserrat font-semibold">
                    {/* Case status : {caseInfo.associatedJudge} */}
                    Case status : Pending
                  </p>

                  <p className="md:text-sm xs:text-xs font-montserrat font-semibold">
                    Latest case progress :{" "}
                    {caseInfo.caseProgress[caseInfo.caseProgress.length - 1]}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4 md:space-y-3">
            <p className="text-lg font-montserrat">
              Fetching your past cases ...
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminDashboardComponent;
