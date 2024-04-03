import {ethers} from "ethers";
import config from "../backend-config.json";
import eVaultMain from "../abis/eVaultMain.json";

const getLawyerDetailsByUID = async (UID, detailNeeded) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const connectedNetwork = await provider.getNetwork();

    const eVaultContract = new ethers.Contract(
      config[connectedNetwork.chainId].contract.address,
      eVaultMain,
      provider
    );

    const lawyerDetails = await eVaultContract.getLawyerDetailsByUID(UID);

    if (detailNeeded == "all") {
      return {
        name: lawyerDetails[0],
        dateOfBirth: lawyerDetails[1],
        religion: lawyerDetails[2],
        nationality: lawyerDetails[3],
        sex: lawyerDetails[4],
        contactNumber: lawyerDetails[5],
        UID: lawyerDetails[6].toString(),
        PAN: lawyerDetails[7],
        // associatedCaseIds: clientDetails[9].map((id) => id.toNumber()),
        walletAddress: lawyerDetails[9],
      };
    } else if (detailNeeded == "name") {
      return {name: lawyerDetails[0]};
    }
  } catch (error) {
    console.error("Error while fetching client details:", error);
    throw error;
  }
};

export default getLawyerDetailsByUID;
