// Test >>>
// > Registering 2 new client
// > Registering a new case between these 2 clients.

const {ethers, run, network} = require("hardhat");

const {
  //   lawyer,
  //   judge,
  client1,
  client2,
  legalCase,
} = require("../assets/test-deploy-data.json");

async function main() {
  const EVAULTMAIN = await ethers.getContractFactory("eVaultMain");
  const eVaultMain = await EVAULTMAIN.deploy();

  await eVaultMain.deployed();

  console.log("Contract deployed successfully \u2705");
  console.log(`Contract address : ${eVaultMain.address}`);
  console.log(`Contract owner: ${await eVaultMain.contractOwner()}`);
  console.log(`Contract name: ${await eVaultMain.contractName()}`);

  console.log("Registering 2 new demo clients now ... \u23F3");

  // makingATestInterraction
  const [deployer] = await ethers.getSigners();

  const client1Tx = await eVaultMain
    .connect(deployer)
    .registerClient(
      client1.name,
      client1.dateOfBirth,
      client1.religion,
      client1.nationality,
      client1.sex,
      client1.contactNumber,
      client1.UID,
      client1.PAN
    );

  await client1Tx.wait();

  console.log("Client 1 added to the blockchain. \u2705");

  const client2Tx = await eVaultMain
    .connect(deployer)
    .registerClient(
      client2.name,
      client2.dateOfBirth,
      client2.religion,
      client2.nationality,
      client2.sex,
      client2.contactNumber,
      client2.UID,
      client2.PAN
    );

  await client2Tx.wait();

  console.log("Client 2 added to the blockchain. \u2705");

  console.log("Checking if client are registered successfully \u23F3");
  await getClientDetails(eVaultMain, 791619819984);
  console.log("Client 1 verified \u2705");

  await getClientDetails(eVaultMain, 791619819985);
  console.log("Client 2 verified \u2705");

  console.log("Filing a new demo case between these 2 client now ... \u23F3");

  const legalCaseTx = await eVaultMain.connect(deployer).registerLegalCase(
    legalCase.UIDOfParty1,
    legalCase.UIDOfParty2,
    legalCase.associatedJudge,
    legalCase.caseSubject,
    legalCase.associatedLawyers.map((lawyerAddress) =>
      ethers.utils.getAddress(lawyerAddress)
    )
  );

  await legalCaseTx.wait();
  console.log("Demo legal case added to the blockchain \u2705");

  console.log("Checking if case is registered successfully \u23F3");
  await getLegalCaseDetails(eVaultMain, 1);
  console.log("Case verified \u2705");

  // what happens when we deploy to our hardhat network?
  if (network.config.chainId === 11155111) {
    console.log("Waiting for block confirmations \u23F3");
    // wait6BlockConfirmations
    await eVaultMain.deployTransaction.wait(6);
    await verify(eVaultMain.address, []);
  }
}

// async function verify(contractAddress, args) {
const verify = async (contractAddress, args) => {
  console.log("Verifying contract \u23F3");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified!");
    } else {
      console.log(e);
    }
  }
};

async function getClientDetails(contract, UID) {
  const clientData = await contract.getClientDetailsByUID(UID);

  console.log("Name:", clientData.name);
  console.log("UID:", clientData.UID);
}

async function getLegalCaseDetails(contract, caseId) {
  const caseDetails = await contract.getCaseDetailsByCaseId(caseId);

  console.log("UID of Party 1:", caseDetails[0].toString());
  console.log("UID of Party 2:", caseDetails[1].toString());
  console.log("Filed On Date:", new Date(caseDetails[2].toNumber() * 1000)); // Convert to readable date
  //   console.log(
  //     "Associated Lawyers:",
  //     caseDetails[3].map((address) => address.toString())
  //   );
  //   console.log("Associated Judge:", caseDetails[4]);
  console.log("Case ID:", caseDetails[5].toString());
  console.log("Case Subject:", caseDetails[6]);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// ToExecute -> npx hardhat run scripts/deploy_registerANewCase.js --network <network-name>
