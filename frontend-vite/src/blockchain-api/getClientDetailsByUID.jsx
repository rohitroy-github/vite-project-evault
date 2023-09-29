import {ethers} from "ethers";
import config from "../backend-config.json";
import eVaultMain from "../abis/eVaultMain.json";

const getClientDetailsByUID = async (UID) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const connectedNetwork = await provider.getNetwork();

    const eVaultContract = new ethers.Contract(
      config[connectedNetwork.chainId].contract.address,
      eVaultMain,
      provider
    );

    const clientDetails = await eVaultContract.getClientDetailsByUID(UID);

    return {
      name: clientDetails[0],
      dateOfBirth: clientDetails[1],
      religion: clientDetails[2],
      nationality: clientDetails[3],
      sex: clientDetails[4],
      contactNumber: clientDetails[5],
      UID: clientDetails[6].toNumber(),
      PAN: clientDetails[7],
      associatedLawyers: clientDetails[8],
      associatedCaseIds: clientDetails[9].map((id) => id.toNumber()),
      walletAddress: clientDetails[10],
    };
  } catch (error) {
    console.error("Error while fetching client details:", error);
    throw error;
  }
};

export default getClientDetailsByUID;
