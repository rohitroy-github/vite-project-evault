import React, {useState, useEffect} from "react";

const CaseDetailsComponent = ({caseID}) => {
  useEffect(() => {
    // You can use the caseID prop in your component logic
    console.log("caseID:", caseID);

    // Fetch case details based on the caseID
    // ...
  }, [caseID]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Case Details</h1>
      <div className="bg-white rounded shadow-md p-4">
        <p className="text-gray-700">Case ID: {caseID}</p>
        {/* Render other case details here */}
      </div>
    </div>
  );
};

export default CaseDetailsComponent;
