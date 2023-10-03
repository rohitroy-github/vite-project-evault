import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";

import getClientDetailsByUID from "../blockchain-api/getClientDetailsByUID";
import getCasesForClientByUID from "../blockchain-api/getCasesForClientByUID";

const ClientAdminDashboardComponent = ({clientUID}) => {
  const [clientDetails, setClientDetails] = useState(null);

  const [allCasesOnClient, setAllCasesOnClient] = useState([]);
  const [last3Cases, setLast3Cases] = useState([]);

  const fetchData = async () => {
    try {
      const result1 = await getClientDetailsByUID(clientUID);
      setClientDetails(result1);

      // FetchignAllTheCasesOnTheClient
      const result2 = await getCasesForClientByUID(clientUID);
      setAllCasesOnClient(result2);

      // justTakingTheLast3Cases
      const justLast3Cases = result2.slice(-3);
      setLast3Cases(justLast3Cases);
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
          Client Dashboard
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
                  <div className="flex flex-row justify-between">
                    <div className="order-first">
                      <p className="text-lg font-montserrat">
                        Case Subject: {caseInfo.caseSubject}
                      </p>
                    </div>

                    <div className="order-last">
                      <p className="text-sm font-montserrat">
                        Case ID: {caseInfo.caseId}
                      </p>
                    </div>
                  </div>

                  <p className="text-lg font-montserrat">
                    Filed On: {caseInfo.filedOnDate.toLocaleString()}
                  </p>
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
              Client Profile Information
            </h2>{" "}
            {clientDetails ? (
              <>
                <div className="bg-white p-5 rounded-lg border border-gray-300 w-[full] text-left">
                  <p className="font-montserrat mb-2">
                    Full Name: {clientDetails.name}
                  </p>
                  <p className="font-montserrat mb-2">
                    Contact Number: {clientDetails.contactNumber}
                  </p>
                  <p className="font-montserrat mb-2">
                    Aadhar UID: {clientDetails.UID}
                  </p>
                  <p className="font-montserrat mb-2">
                    Nationality: {clientDetails.nationality}
                  </p>
                  <p className="font-montserrat mb-2">
                    Religion: {clientDetails.religion}
                  </p>
                  <p className="font-montserrat mb-2">
                    Sex: {clientDetails.sex}
                  </p>
                  <p className="font-montserrat mb-2">
                    Date of Birth: {clientDetails.dateOfBirth}
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
            to="/register-new-case"
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
                <div className="flex flex-row justify-between">
                  <div className="order-first">
                    <p className="text-md font-montserrat font-semibold">
                      Case Subject: {caseInfo.caseSubject}
                    </p>
                  </div>

                  <div className="order-last">
                    <p className="text-sm font-montserrat">
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

                <p className="text-sm font-montserrat">
                  {/* Case status : {caseInfo.associatedJudge} */}
                  Case status : Pending
                </p>
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

export default ClientAdminDashboardComponent;
