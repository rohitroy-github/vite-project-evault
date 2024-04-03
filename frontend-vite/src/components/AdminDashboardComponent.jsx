import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";

import getClientDetailsByUID from "../blockchain-api/getClientDetailsByUID";
import getCasesForClientByUID from "../blockchain-api/getCasesForClientByUID";
import getLawyerDetailsByUID from "../blockchain-api/getLawyerDetailsByUID";
import getCasesForLawyerByUID from "../blockchain-api/getCasesForLawyerByUID";
import getJudgeDetailsByUID from "../blockchain-api/getJudgeDetailsByUID";
import getCasesForJudgeByUID from "../blockchain-api/getCasesForJudgeByUID";
import Loader from "./Loader";

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
        result1 = await getJudgeDetailsByUID(aadharUID);
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
    }, 1500);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="flex items-center 3xl:h-[80vh] h-screen md:flex-col">
        <div className="flex pt-10 pb-20">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-montserrat py-2 px-4 rounded">
            {adminType === "client" && `Client Dashboard`}
            {adminType === "lawyer" && `Lawyer Dashboard`}
            {adminType === "judge" && `Judge Dashboard`}
          </button>
        </div>

        <div className="flex flex-row w-full justify-center">
          {/* Left Section */}
          <div className="md:w-[60%] flex flex-col px-5 items-center">
            <h2 className="text-2xl font-montserrat mb-4 text-left">
              Your Recent Cases
            </h2>

            {last3Cases ? (
              <div className="w-[90%]">
                {last3Cases.map((caseInfo, index) => (
                  <div
                    key={index}
                    className="bg-white p-5 rounded-lg border border-gray-300 hover:bg-gray-100 mb-4"
                    style={{position: "relative"}}
                  >
                    <Link to={`/case-details?caseid=${caseInfo.caseId}`}>
                      <div className="flex flex-row justify-between">
                        <div className="order-first">
                          <p className="text-md font-montserrat">
                            Case Subject: {caseInfo.caseSubject}
                          </p>
                        </div>

                        <div className="order-last">
                          <p className="text-xs font-montserrat">
                            Case ID: {caseInfo.caseId}
                          </p>
                        </div>
                      </div>

                      <p className="text-md font-montserrat">
                        Filed On: {caseInfo.filedOnDate.toLocaleString()}
                      </p>

                      <p className="text-md font-montserrat">
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
          <div className="md:w-[40%] flex flex-col px-5 border-l border-blue-500 min-h-[50vh] items-center">
            <h2 className="text-2xl font-montserrat mb-4 text-center">
              Profile Information
            </h2>
            <div className="w-[85%]">
              <table className="w-full border border-gray-200">
                <tbody>
                  <tr>
                    <td className="font-montserrat py-2 px-4 border border-gray-200">
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
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center min-h-[90vh] md:flex-col md:w-full">
        <div className="text-black pb-5">
          <h2 className="text-2xl font-montserrat p-0">Your Past Cases</h2>
        </div>
        <div className="pb-10">
          <Link
            to={`/admin/register-new-case`}
            className="bg-blue-500 hover:bg-blue-600 text-white font-montserrat py-3 px-5 rounded"
          >
            Register New Case
          </Link>
        </div>

        {allCasesOnClient ? (
          <div className="space-y-4 md:space-y-3 w-[75%]">
            {allCasesOnClient.map((caseInfo, index) => (
              <div
                key={index}
                className="bg-white p-5 rounded-lg border border-gray-300 hover:bg-gray-100"
                style={{position: "relative"}}
              >
                <Link to={`/case-details?caseid=${caseInfo.caseId}`}>
                  <div className="flex flex-row justify-between">
                    <div className="order-first">
                      <p className="text-md font-montserrat">
                        Case Subject: {caseInfo.caseSubject}
                      </p>
                    </div>

                    <div className="order-last">
                      <p className="text-xs font-montserrat">
                        Case ID: {caseInfo.caseId}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm font-montserrat">
                    Case judged by : {caseInfo.associatedJudge}
                  </p>

                  <p className="text-sm font-montserrat">
                    Filed On: {caseInfo.filedOnDate.toLocaleString()}
                  </p>

                  <p className="text-sm font-montserrat font-semibold">
                    {/* Case status : {caseInfo.associatedJudge} */}
                    Case status : Pending
                  </p>

                  <p className="text-sm font-montserrat font-semibold">
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
