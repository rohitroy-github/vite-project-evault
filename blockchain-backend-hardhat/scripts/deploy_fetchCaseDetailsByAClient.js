// Test >>>
// > Registering 2 new client
// > Registering a new case between these 2 clients.
// > Fetching all the cases a client is associated with.

const {ethers, run, network} = require("hardhat");

const {
  //   lawyer,
  //   judge,
  client1,
  client2,
  legalCase1,
  legalCase2,
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

  console.log("Filing 2 new demo case between these 2 client now ... \u23F3");

  const legalCase1Tx = await eVaultMain.connect(deployer).registerLegalCase(
    legalCase1.UIDOfParty1,
    legalCase1.UIDOfParty2,
    legalCase1.associatedJudge,
    legalCase1.caseSubject,
    legalCase1.associatedLawyers.map((lawyerAddress) =>
      ethers.utils.getAddress(lawyerAddress)
    )
  );

  await legalCase1Tx.wait();

  const legalCase2Tx = await eVaultMain.connect(deployer).registerLegalCase(
    legalCase2.UIDOfParty1,
    legalCase2.UIDOfParty2,
    legalCase2.associatedJudge,
    legalCase2.caseSubject,
    legalCase2.associatedLawyers.map((lawyerAddress) =>
      ethers.utils.getAddress(lawyerAddress)
    )
  );

  await legalCase2Tx.wait();

  console.log("Demo legal cases added to the blockchain \u2705");

  console.log("Checking if Case 1 is registered successfully \u23F3");
  await getLegalCaseDetails(eVaultMain, 1);
  console.log("Case verified \u2705");

  console.log("Checking if Case 2 is registered successfully \u23F3");
  await getLegalCaseDetails(eVaultMain, 2);
  console.log("Case verified \u2705");

  console.log("- - - - - - - - - - - - - - - - - - - - -");

  await getLegalCasesForClient(eVaultMain, client1.UID);

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

  //   console.log("UID of Party 1:", caseDetails.UIDOfParty1);
  //   console.log("UID of Party 2:", caseDetails.UIDOfParty2);
  //   console.log(
  //     "Filed On Date:",
  //     new Date(caseDetails.filedOnDate.toNumber() * 1000)
  //   );
  //   console.log(
  //     "Associated Lawyers:",
  //     caseDetails[3].map((address) => address.toString())
  //   );
  //   console.log("Associated Judge:", caseDetails.associatedJudge);

  console.log("Case ID:", caseDetails.caseId.toString());
  console.log("Case Subject:", caseDetails.caseSubject);
}

async function getLegalCasesForClient(contract, client1UID) {
  console.log(`Checking for the cases associated with ${client1.UID} \u23F3`);
  const filedCases = await contract.getFiledLegalCasesForAClient(client1UID);

  for (let i = 0; i < filedCases.length; i++) {
    const caseId = filedCases[i].caseId.toNumber();
    console.log(`Fetching details for Case ${caseId} \u23F3`);
    await getLegalCaseDetails(contract, caseId);
    console.log(`Case ${caseId} details fetched \u2705`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// ToExecute -> npx hardhat run scripts/deploy_registerANewCase.js --network <network-name>
