import {ethers} from "ethers";
import {useState} from "react";

import eVaultMain from "../abis/eVaultMain.json";
import config from "../backend-config.json";

// Define the loginAsAClient function
const registerAsAClient = async (aadharUID) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const connectedNetwork = await provider.getNetwork();

  // Create a contract instance
  const eVaultContract = new ethers.Contract(
    config[connectedNetwork.chainId].contract.address,
    eVaultMain,
    provider.getSigner()
  );

  try {
    // Ensure that the user has connected their wallet with MetaMask or other provider
    if (!provider || !provider.getSigner) {
      throw new Error("Please connect your wallet.");
    }

    // Get the connected signer
    const signer = provider.getSigner();

    // Call your contract's loginAsAClient function
    const isClientRegistered = await eVaultContract.registerLawyer(aadharUID);

    // You may want to do additional checks or processing here

    return isClientRegistered; // Return the result
  } catch (error) {
    console.error("Error during loginAsAClient:", error);
    throw error;
  }
};

export default registerAsAClient;
