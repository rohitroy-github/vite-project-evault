import {ethers} from "ethers";
import config from "../backend-config.json";
import eVaultMain from "../abis/eVaultMain.json";

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

    return {
      UIDOfParty1: caseDetails[0].toString(),
      UIDOfParty2: caseDetails[1].toString(),
      filedOnDate: new Date(caseDetails[2].toNumber() * 1000), // Assuming filedOnDate is in Unix timestamp format
      associatedLawyers: caseDetails[3],
      associatedJudge: caseDetails[4],
      caseId: caseDetails[5].toNumber(),
      caseSubject: caseDetails[6],
    };
  } catch (error) {
    console.error("Error while fetching case details:", error);
    throw error;
  }
};

export default getCaseDetailsByCaseID;
