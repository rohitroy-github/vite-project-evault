import {ethers} from "ethers";
import config from "../backend-config.json";
import {abi as eVaultMain} from "../../../blockchain-hardhat/artifacts/contracts/EVault_Main.sol/EVault_Main.json";

const getCaseDetailsByCaseID = async (caseID) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const connectedNetwork = await provider.getNetwork();

    const eVaultContract = new ethers.Contract(
      config[connectedNetwork.chainId].contract.address,
      eVaultMain,
      provider
    );

    const caseDetails = await eVaultContract.getCaseDetailsByCaseId(caseID);

    const associatedLawyers = caseDetails[3].map((lawyer) =>
      parseInt(lawyer.toString())
    );

    return {
      UIDOfParty1: caseDetails[0].toString(),
      UIDOfParty2: caseDetails[1].toString(),
      filedOnDate: new Date(caseDetails[2].toNumber() * 1000), // Assuming filedOnDate is in Unix timestamp format
      associatedLawyers: associatedLawyers,
      associatedJudge: caseDetails[4].toString(),
      caseId: caseDetails[5].toNumber(),
      caseSubject: caseDetails[6],
      caseProgress: caseDetails[7],
      caseProgressIssuer: caseDetails[8],
      caseDocumentHash: caseDetails[9],
      caseDocumentUploader: caseDetails[10],
    };
  } catch (error) {
    console.error("Error while fetching case details:", error);
    throw error;
  }
};

export default getCaseDetailsByCaseID;
