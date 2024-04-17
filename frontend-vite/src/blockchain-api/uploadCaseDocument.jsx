import {ethers} from "ethers";
import axios from "axios";

import {abi as eVaultMain} from "../../../blockchain-hardhat/artifacts/contracts/EVault_Main.sol/EVault_Main.json";

import config from "../backend-config.json";
import getCaseDetailsByCaseID from "./getCaseDetailsByCaseID";

// Define the loginAsAClient function
const uploadCaseDocument = async (caseID, formData) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const connectedNetwork = await provider.getNetwork();
  const eVaultContract = new ethers.Contract(
    config[connectedNetwork.chainId].contract.address,
    eVaultMain,
    provider.getSigner()
  );

  try {
    if (!provider || !provider.getSigner) {
      throw new Error("Please connect your wallet.");
    }

    const pinataIPFSResponse = await axios({
      method: "post",
      url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
      data: formData,
      headers: {
        pinata_api_key: `${import.meta.env.VITE_PINATA_API_KEY}`,
        pinata_secret_api_key: `${import.meta.env.VITE_PINATA_API_SECRET_KEY}`,
        "Content-Type": "multipart/form-data",
      },
    });

    // const IMG_IPFS_URL = `https://gateway.pinata.cloud/ipfs/${pinataIPFSResponse.data.IpfsHash}`;

    const tx = await eVaultContract.updateCaseDocumentsWithCaseId(
      caseID,
      `${pinataIPFSResponse.data.IpfsHash}`
    );
    const txReceipt = await tx.wait();

    // checkingIfLatestUpdateSavedOrNot?
    const caseDetails = await eVaultContract.getCaseDetailsByCaseId(caseID);

    console.log("Check", caseDetails);

    // console.log(
    //   caseDetails.caseDocuments[caseDetails.caseDocuments.length - 1]
    // );

    if (
      caseDetails.caseDocumentHash[caseDetails.caseDocumentHash.length - 1] ===
      pinataIPFSResponse.data.IpfsHash
    ) {
      return `File added successfully ✅ `;
    } else {
      return `Couldn't add case file.`;
    }
  } catch (error) {
    console.error("Error adding case file: ", error);
    throw error;
  }
};

export default uploadCaseDocument;
