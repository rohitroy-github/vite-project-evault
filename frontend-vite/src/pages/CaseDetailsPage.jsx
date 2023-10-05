import React from "react";
import {useLocation} from "react-router-dom";
import CaseDetailsComponent from "../components/CaseDetailsComponent";

const CaseDetailsPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const caseID = searchParams.get("caseid");
  return (
    <>
      {/* Pass the caseID as a prop to CaseDetailsComponent */}
      <CaseDetailsComponent caseID={caseID} />
    </>
  );
};

export default CaseDetailsPage;
