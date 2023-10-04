import {ethers} from "ethers";
import eVaultMain from "../abis/eVaultMain.json";
import config from "../backend-config.json";

const registerNewCase = async ({
  UIDOfParty1,
  UIDOfParty2,
  associatedJudge,
  caseSubject,
  associatedLawyers,
  account,
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

  try {
    const tx = await eVaultContract.registerLegalCase(
      parseInt(UIDOfParty1, 10),
      parseInt(UIDOfParty2, 10),
      associatedJudge,
      caseSubject,
      associatedLawyers,
      {from: account}
    );

    const receipt = await tx.wait();
    const caseRegisteredEvent = receipt.events.find(
      (event) => event.event === "CaseRegistered"
    );

    if (caseRegisteredEvent) {
      const caseId = caseRegisteredEvent.args.caseId.toNumber();
      return `Successfully registered a new legal case with ID: ${caseId}`;
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
