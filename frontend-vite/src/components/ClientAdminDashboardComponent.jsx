import React, {useState, useEffect} from "react";

import getClientDetailsByUID from "../blockchain-api/getClientDetailsByUID";

const ClientAdminDashboardComponent = ({clientUID}) => {
  const [clientDetails, setClientDetails] = useState(null);

  const fetchData = async () => {
    try {
      const result = await getClientDetailsByUID(clientUID);
      setClientDetails(result);
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
          <div className="text-left">
            <h3 className="text-2xl font-montserrat mb-5">User Information</h3>
            {clientDetails ? (
              <>
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
                <p className="font-montserrat mb-2">Sex: {clientDetails.sex}</p>
                <p className="font-montserrat mb-2">
                  Date of Birth: {clientDetails.dateOfBirth}
                </p>
              </>
            ) : (
              <p>Loading client details...</p>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="md:w-1/2">
          <div className="flex flex-col md:flex-row md:flex-wrap">
            <div className="md:w-1/2 p-4">
              <div className="bg-white p-4 rounded-lg mb-4 shadow-md">
                <p className="font-montserrat text-center text-lg">
                  Total Cases
                </p>
                <p className="font-montserrat text-center text-2xl font-bold">
                  100
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/2 p-4">
              <div className="bg-white p-4 rounded-lg mb-4 shadow-md">
                <p className="font-montserrat text-center text-lg">
                  Total Associated Lawyers
                </p>
                <p className="font-montserrat text-center text-2xl font-bold">
                  25
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/2 p-4">
              <div className="bg-white p-4 rounded-lg mb-4 shadow-md">
                <p className="font-montserrat text-center text-lg">
                  Total Associated Judges
                </p>
                <p className="font-montserrat text-center text-2xl font-bold">
                  10
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientAdminDashboardComponent;
