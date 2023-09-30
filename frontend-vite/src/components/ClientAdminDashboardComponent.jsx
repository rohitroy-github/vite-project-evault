import React, {useState, useEffect} from "react";

import getClientDetailsByUID from "../blockchain-api/getClientDetailsByUID";
import getCasesForClientByUID from "../blockchain-api/getCasesForClientByUID";

const ClientAdminDashboardComponent = ({clientUID}) => {
  const [counters, setCounters] = useState({
    totalClients: 41,
    totalRegisteredLawyers: 25,
    totalRegisteredJudges: 12,
    totalRecordedCases: 112,
  });
  const counterHeadings = {
    totalClients: "Total Registered Clients",
    totalRegisteredLawyers: "Total Registered Lawyers",
    totalRegisteredJudges: "Total Registered Judges",
    totalRecordedCases: "Total Recorded Cases",
  };

  const [clientDetails, setClientDetails] = useState(null);

  const [last3Cases, setLast3Cases] = useState([]);

  const fetchData = async () => {
    try {
      const result1 = await getClientDetailsByUID(clientUID);
      setClientDetails(result1);

      // Fetch the last 3 cases
      const result2 = await getCasesForClientByUID(clientUID);
      setLast3Cases(result2);
    } catch (error) {
      console.error("Error fetching client details:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="flex items-center justify-center h-[10vh] md:flex-col">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-montserrat py-2 px-4 rounded">
          Client Dashboard
        </button>
      </div>
      <div className="flex items-center justify-center min-h-[90vh] md:flex-row md:w-full">
        {/* Left Section */}
        <div className="md:w-1/2 flex flex-col items-center">
          <div className=" text-black">
            <h2 className="text-3xl font-montserrat mb-4">Your Recent Cases</h2>
          </div>

          {last3Cases ? (
            <div className="space-y-4 md:space-y-3 w-full">
              {last3Cases.map((caseInfo, index) => (
                <div
                  key={index}
                  className="bg-white p-5 rounded-lg border border-gray-300"
                  style={{position: "relative"}}
                >
                  <div className="flex flex-row justify-between">
                    <div className="order-first">
                      <p className="text-lg font-montserrat ">
                        Case Subject: {caseInfo.caseSubject}
                      </p>
                    </div>

                    <div className="order-last">
                      <p className="text-sm font-montserrat ">
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
        <div className="md:w-1/2 flex flex-col items-center">
          <div className="text-left">
            <h2 className="text-3xl font-montserrat mb-4">
              Client Profile Information
            </h2>{" "}
            {clientDetails ? (
              <>
                <div className="bg-white p-5 rounded-lg border border-gray-300 w-[full]">
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
    </>
  );
};

export default ClientAdminDashboardComponent;
