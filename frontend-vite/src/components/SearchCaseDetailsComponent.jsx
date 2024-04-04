import React, {useState, useEffect} from "react";
import {useNavigate, Link} from "react-router-dom";
import getCaseDetailsByCaseID from "../blockchain-api/getCaseDetailsByCaseID";

const SearchCaseDetailsComponent = () => {
  const [caseID, setCaseID] = useState("");
  const [caseDetails, setCaseDetails] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!caseID) {
      alert("Please fill in all the required fields.");
      return;
    }

    try {
      const caseDetails = await getCaseDetailsByCaseID(caseID);
      setCaseDetails(caseDetails);
      console.log("Fetched case details:", caseDetails);
    } catch (error) {
      console.error("Error fetching case details:", error);
      alert(
        "Error fetching case details. There's isn't any case registered with this caseID !"
      );
    }
  };

  return (
    <div className="flex items-center justify-center md:min-h-screen h-screen">
      <div className="bg-white md:p-8 font-montserrat w-full">
        <h1 className="md:text-3xl xs:text-xl font-montserrat mb-2 text-center">
          Search for case details ?
        </h1>
        <p className="text-gray-600 text-center mb-4 md:text-base text-sm">
          Only associated clients, lawyers, and judges of the case can access
          the relevant case details and information!
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 text-center">
            <input
              type="text"
              className="border rounded-lg py-2 px-4 md:w-1/2 w-2/3"
              placeholder="Please enter the case ID"
              value={caseID}
              onChange={(e) => setCaseID(e.target.value)}
            />
          </div>
          <div className="mb-4 text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-sm md:w-1/4 text-sm"
            >
              Search Case
            </button>
          </div>
        </form>

        {/* Display case details table if available */}
        {caseDetails && (
          <div className="mt-10 text-center">
            {/* <h2 className="text-2xl font-semibold">Case Details</h2> */}
            <table className="w-full mt-2 border-collapse border md:text-base md:block xs:hidden">
              <thead>
                <tr>
                  <th className="border  p-2">Case ID</th>
                  <th className="border  p-2">Case Subject</th>
                  <th className="border  p-2">Party 1</th>
                  <th className="border  p-2">Party 2</th>
                  <th className="border  p-2">Filing Date</th>
                  <th className="border  p-2">Appointed Judge</th>
                  <th className="border  p-2">Appointed Lawyers</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border  p-2">{caseDetails.caseId}</td>
                  <td className="border  p-2">{caseDetails.caseSubject}</td>
                  <td className="border  p-2">{caseDetails.UIDOfParty1}</td>
                  <td className="border  p-2">{caseDetails.UIDOfParty2}</td>
                  <td className="border  p-2">
                    {caseDetails.filedOnDate.toString()}
                  </td>
                  <td className="border  p-2">{caseDetails.associatedJudge}</td>
                  <td className="border  p-2">
                    {caseDetails.associatedLawyers.join(", ")}
                  </td>
                </tr>
              </tbody>
            </table>

            {/* forMobileScreens */}
            <table className="w-full mt-2border-collapse border border-gray-200 text-xs md:hidden">
              <tbody>
                <tr>
                  <td className="border p-2">Case ID:</td>
                  <td className="border p-2">{caseDetails.caseId}</td>
                </tr>
                <tr>
                  <td className="border p-2">Case Subject:</td>
                  <td className="border p-2">{caseDetails.caseSubject}</td>
                </tr>
                <tr>
                  <td className="border p-2">Party 1:</td>
                  <td className="border p-2">{caseDetails.UIDOfParty1}</td>
                </tr>
                <tr>
                  <td className="border p-2">Party 2:</td>
                  <td className="border p-2">{caseDetails.UIDOfParty2}</td>
                </tr>
                <tr>
                  <td className="border p-2">Filing Date:</td>
                  <td className="border p-2">
                    {caseDetails.filedOnDate.toString()}
                  </td>
                </tr>
                <tr>
                  <td className="border p-2">Appointed Judge:</td>
                  <td className="border p-2">{caseDetails.associatedJudge}</td>
                </tr>
                <tr>
                  <td className="border p-2">Appointed Lawyers:</td>
                  <td className="border p-2">
                    {caseDetails.associatedLawyers.join(", ")}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="pt-5">
              <Link to={`/case-details?caseid=${caseDetails.caseId}`}>
                <button className="bg-blue-500 text-white py-2 px-4 rounded-sm md:w-1/4 text-sm">
                  More Details
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchCaseDetailsComponent;
