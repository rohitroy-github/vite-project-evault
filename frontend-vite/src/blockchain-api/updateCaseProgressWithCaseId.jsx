import {ethers} from "ethers";

import {abi as eVaultMain} from "../../../blockchain-hardhat/artifacts/contracts/EVault_Main.sol/EVault_Main.json";

import config from "../backend-config.json";
import getCaseDetailsByCaseID from "./getCaseDetailsByCaseID";

// Define the loginAsAClient function
const updateCaseProgressWithCaseId = async (caseID, progress) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const connectedNetwork = await provider.getNetwork();

  // Create a contract instance
  const eVaultContract = new ethers.Contract(
    config[connectedNetwork.chainId].contract.address,
    eVaultMain,
    provider.getSigner()
  );

  try {
    if (!provider || !provider.getSigner) {
      throw new Error("Please connect your wallet.");
    }

    const tx = await eVaultContract.updateCaseProgressWithCaseId(
      caseID,
      progress
    );

    const receipt = await tx.wait();

    const caseDetails = await getCaseDetailsByCaseID(caseID);

    // checkingIfLatestUpdateSavedOrNot?
    if (
      caseDetails.caseProgress[caseDetails.caseProgress.length - 1] === progress
    ) {
      return `Progress updated successfully ✅ `;
    } else {
      return `Couldn't update case progress.`;
    }
  } catch (error) {
    console.error("Error updating case progress:", error);
    throw error;
  }
};

export default updateCaseProgressWithCaseId;
