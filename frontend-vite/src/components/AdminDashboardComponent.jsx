import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";

import getClientDetailsByUID from "../blockchain-api/getClientDetailsByUID";
import getCasesForClientByUID from "../blockchain-api/getCasesForClientByUID";
import getLawyerDetailsByUID from "../blockchain-api/getLawyerDetailsByUID";
import getCasesForLawyerByUID from "../blockchain-api/getCasesForLawyerByUID";

const AdminDashboardComponent = ({aadharUID, adminType}) => {
  const [adminDetails, setAdminDetails] = useState(null);

  const [allCasesOnClient, setAllCasesOnClient] = useState([]);
  const [last3Cases, setLast3Cases] = useState([]);

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
        result1 = await getLawyerDetailsByUID(aadharUID);
        setAdminDetails(result1);

        result2 = await getCasesForLawyerByUID(aadharUID);
        setAllCasesOnClient(result2);

        justLast3Cases = result2.slice(-3);
        setLast3Cases(justLast3Cases);
      }
    } catch (error) {
      console.error("Error fetching client details:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="flex items-center justify-center pt-5 md:flex-col">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-montserrat py-2 px-4 rounded">
          {adminType === "client" && `Client Dashboard`}
          {adminType === "lawyer" && `Lawyer Dashboard`}
          {adminType === "judge" && `Judge Dashboard`}
        </button>
      </div>
      <div className="flex items-center justify-center min-h-[90vh] md:flex-row md:w-full">
        {/* Left Section */}
        <div className="md:w-[60%] flex flex-col items-center px-5">
          <div className=" text-black">
            <h2 className="text-3xl font-montserrat mb-4">Your Recent Cases</h2>
          </div>

          {last3Cases ? (
            <div className="space-y-4 md:space-y-3 w-[90%]">
              {last3Cases.map((caseInfo, index) => (
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

                    <p className="text-md font-montserrat">
                      Filed On: {caseInfo.filedOnDate.toLocaleString()}
                    </p>

                    <p className="text-md font-montserrat">
                      Latest case update:{" "}
                      {caseInfo.caseProgress[caseInfo.caseProgress.length - 1]}
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
        <div className="md:w-[40%] flex flex-col items-center px-5">
          <div className="w-[90%]">
            <h2 className="text-3xl font-montserrat mb-4 text-center">
              Profile Information
            </h2>
            {adminDetails ? (
              <>
                <div className="bg-white p-5 rounded-lg border border-gray-300 w-[full] text-left">
                  <p className="font-montserrat mb-2">
                    Full Name: {adminDetails.name}
                  </p>
                  <p className="font-montserrat mb-2">
                    Contact Number: {adminDetails.contactNumber}
                  </p>
                  <p className="font-montserrat mb-2">
                    Aadhar UID: {adminDetails.UID}
                  </p>
                  <p className="font-montserrat mb-2">
                    Nationality: {adminDetails.nationality}
                  </p>
                  <p className="font-montserrat mb-2">
                    Religion: {adminDetails.religion}
                  </p>
                  <p className="font-montserrat mb-2">
                    Sex: {adminDetails.sex}
                  </p>
                  <p className="font-montserrat mb-2">
                    Date of Birth: {adminDetails.dateOfBirth}
                  </p>
                </div>
              </>
            ) : (
              <p>Loading client details...</p>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center min-h-[90vh] md:flex-col md:w-full">
        <div className="text-black pb-5">
          <h2 className="text-3xl font-montserrat p-0">Your Past Cases</h2>
        </div>
        <div className="pb-5">
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
