import {ethers} from "ethers";
import {useState} from "react";

import eVaultMain from "../abis/eVaultMain.json";
import config from "../backend-config.json";

// Define the loginAsAClient function
const registerToEVault = async ({
  fullName,
  religion,
  nationality,
  sex,
  dob,
  contactNumber,
  aadharUID,
  pan,
  walletAddress,
  signingUpAs,
}) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const connectedNetwork = await provider.getNetwork();
  // Create a contract instance
  const eVaultContract = new ethers.Contract(
    config[connectedNetwork.chainId].contract.address,
    eVaultMain,
    provider.getSigner()
  );

  let registrationTransaction;

  try {
    if (signingUpAs == "client") {
      // contractInteraction
      registrationTransaction = await eVaultContract.registerClient(
        fullName,
        dob,
        religion,
        nationality,
        sex,
        contactNumber,
        parseInt(aadharUID, 10),
        pan
      );
    } else if (signingUpAs == "judge") {
      // contractInteraction
      registrationTransaction = await eVaultContract.registerJudge(
        fullName,
        dob,
        religion,
        nationality,
        sex,
        contactNumber,
        parseInt(aadharUID, 10),
        pan
      );
    } else if (signingUpAs == "lawyer") {
      // contractInteraction
      registrationTransaction = await eVaultContract.registerLawyer(
        fullName,
        dob,
        religion,
        nationality,
        sex,
        contactNumber,
        parseInt(aadharUID, 10),
        pan
      );
    }

    await registrationTransaction.wait();

    // console.log("Transaction hash:", registrationTransaction.hash);
    return `Successfully registred as a ${signingUpAs}`;
  } catch (error) {
    console.error(`Can't register as a ${signingUpAs} : `, error);
    throw error;
  }
};

export default registerToEVault;
