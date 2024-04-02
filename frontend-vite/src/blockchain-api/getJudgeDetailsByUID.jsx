import {ethers} from "ethers";
import config from "../backend-config.json";
import eVaultMain from "../abis/eVaultMain.json";

const getJudgeDetailsByUID = async (UID) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const connectedNetwork = await provider.getNetwork();

    const eVaultContract = new ethers.Contract(
      config[connectedNetwork.chainId].contract.address,
      eVaultMain,
      provider
    );

    const judgeDetails = await eVaultContract.getJudgeDetailsByUID(UID);

    return {
      name: judgeDetails[0],
      dateOfBirth: judgeDetails[1],
      religion: judgeDetails[2],
      nationality: judgeDetails[3],
      sex: judgeDetails[4],
      contactNumber: judgeDetails[5],
      UID: judgeDetails[6].toNumber(),
      PAN: judgeDetails[7],
      // associatedCaseIds: lawyerDetails[8].map((id) => id.toNumber()),
      walletAddress: judgeDetails[9],
    };
  } catch (error) {
    console.error("Error while fetching client details:", error);
    throw error;
  }
};

export default getJudgeDetailsByUID;
