import {ethers} from "ethers";
import config from "../backend-config.json";
import eVaultMain from "../abis/eVaultMain.json";

const getCasesForLawyerByUID = async (aadharUID) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const connectedNetwork = await provider.getNetwork();

    const eVaultContract = new ethers.Contract(
      config[connectedNetwork.chainId].contract.address,
      eVaultMain,
      provider
    );

    // fethcingAllTheCasesFromBlockchain
    const fetchedCases = await eVaultContract.getFiledLegalCasesForALawyer(
      aadharUID
    );

    const formattedCases = fetchedCases.map((details) => ({
      UIDOfParty1: details[0].toNumber(),
      UIDOfParty2: details[1].toNumber(),
      filedOnDate: new Date(details[2].toNumber() * 1000),
      associatedLawyers: details[3],
      associatedJudge: details[4],
      caseId: details[5].toNumber(),
      caseSubject: details[6],
      caseProgress: details[7],
    }));

    // console.log("Last 3 fetched cases : ", formattedCases);
    return formattedCases;
  } catch (error) {
    console.error("Error while fetching cases:", error);
    throw error;
  }
};

export default getCasesForLawyerByUID;
