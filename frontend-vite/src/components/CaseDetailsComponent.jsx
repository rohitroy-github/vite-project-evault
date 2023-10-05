import React, {useState, useEffect} from "react";

const CaseDetailsComponent = ({caseID}) => {
  useEffect(() => {
    // You can use the caseID prop in your component logic
    console.log("caseID:", caseID);

    // Fetch case details based on the caseID
    // ...
  }, [caseID]);

  return <div>CaseDetailsComponent</div>;
};

export default CaseDetailsComponent;
