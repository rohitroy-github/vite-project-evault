import React from "react";

const ClientAdminDashboardComponent = () => {
  return (
    <div className="flex items-center justify-center h-screen flex-col md:flex-row">
      {/* Container */}
      {/* Left Section */}
      <div className="md:w-1/2 p-4 flex flex-col items-center">
        <div className="text-left">
          <h3 className="text-2xl font-montserrat mb-2">User Information</h3>
          {/* Add a div for text alignment */}
          <p className="font-montserrat mb-2">Full Name: John Doe</p>
          <p className="font-montserrat mb-2">Contact Number: (123) 456-7890</p>
          <p className="font-montserrat mb-2">Adhar UID: 1234-5678-9012</p>
          <p className="font-montserrat mb-2">Nationality: Indian</p>
          <p className="font-montserrat mb-2">Religion: Christianity</p>
          <p className="font-montserrat mb-2">Sex: Male</p>
          <p className="font-montserrat mb-2">Date of Birth: 01/01/1990</p>
        </div>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 p-4">
        <div className="flex flex-col md:flex-row md:flex-wrap">
          <div className="md:w-1/2 p-4">
            <div className="bg-white p-4 rounded-lg mb-4 shadow-md">
              <p className="font-montserrat text-center text-lg">Total Cases</p>
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
  );
};

export default ClientAdminDashboardComponent;
