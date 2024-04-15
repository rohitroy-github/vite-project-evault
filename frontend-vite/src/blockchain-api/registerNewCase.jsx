import {ethers} from "ethers";
import {abi as eVaultMain} from "../../../blockchain-hardhat/artifacts/contracts/EVault_Main.sol/EVault_Main.json";

import config from "../backend-config.json";

const registerNewCase = async ({
  UIDOfParty1,
  UIDOfParty2,
  caseSubject,
  associatedLawyers,
}) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const connectedNetwork = await provider.getNetwork();

  const eVaultContract = new ethers.Contract(
    config[connectedNetwork.chainId].contract.address,
    eVaultMain,
    provider.getSigner()
  );

  // const lawyerAddresses = associatedLawyers
  //   .split(",")
  //   .map((address) => address.trim());

  const parsedLawyers = associatedLawyers.map((lawyer) => parseInt(lawyer, 10));

  try {
    const tx = await eVaultContract.registerLegalCase(
      parseInt(UIDOfParty1, 10),
      parseInt(UIDOfParty2, 10),
      caseSubject,
      parsedLawyers
    );

    const receipt = await tx.wait();
    const caseRegisteredEvent = receipt.events.find(
      (event) => event.event === "CaseRegistered"
    );

    if (caseRegisteredEvent) {
      const caseId = caseRegisteredEvent.args.caseId.toNumber();
      return `Case registered with ID: ${caseId} ✅`;
    } else {
      throw new Error(
        "Case registration event not found in the transaction receipt"
      );
    }
  } catch (error) {
    console.error("Error registering the legal case: ", error);
    throw error;
  }
};

export default registerNewCase;
