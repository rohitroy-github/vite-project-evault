import {ethers} from "ethers";
import config from "../backend-config.json";
import {abi as eVaultMain} from "../../../blockchain-hardhat/artifacts/contracts/EVault_Main.sol/EVault_Main.json";

const getClientDetailsByUID = async (UID, detailsNeeded) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const connectedNetwork = await provider.getNetwork();

    const eVaultContract = new ethers.Contract(
      config[connectedNetwork.chainId].contract.address,
      eVaultMain,
      provider
    );

    const clientDetails = await eVaultContract.getClientDetailsByUID(UID);

    if (detailsNeeded == "all") {
      return {
        name: clientDetails[0],
        dateOfBirth: clientDetails[1],
        religion: clientDetails[2],
        nationality: clientDetails[3],
        sex: clientDetails[4],
        contactNumber: clientDetails[5],
        UID: clientDetails[6].toString(),
        PAN: clientDetails[7],
        associatedLawyers: clientDetails[8],
        // associatedCaseIds: clientDetails[9].map((id) => id.toNumber()),
        walletAddress: clientDetails[9],
      };
    } else if (detailsNeeded == "walletAddress") {
      return {
        walletAddress: clientDetails[9],
      };
    } else if (detailsNeeded == "name_UID_walletAddress") {
      return {
        name: clientDetails[0],
        UID: clientDetails[6].toString(),
        walletAddress: clientDetails[9],
      };
    }
  } catch (error) {
    console.error("Error while fetching client details:", error);
    throw error;
  }
};

export default getClientDetailsByUID;
