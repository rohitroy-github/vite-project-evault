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
  client3,
  client4,
  legalCase1,
  legalCase2,
  legalCase3,
} = require("../assets/test-deploy-data.json");

async function main() {
  const EVAULTMAIN = await ethers.getContractFactory("eVaultMain");
  const eVaultMain = await EVAULTMAIN.deploy();

  await eVaultMain.deployed();

  console.log("Contract deployed successfully \u2705");
  console.log(`Contract address : ${eVaultMain.address}`);
  console.log(`Contract owner: ${await eVaultMain.contractOwner()}`);
  console.log(`Contract name: ${await eVaultMain.contractName()}`);

  console.log("Registering 4 new demo clients now ... \u23F3");

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

  const client3Tx = await eVaultMain
    .connect(deployer)
    .registerClient(
      client3.name,
      client3.dateOfBirth,
      client3.religion,
      client3.nationality,
      client3.sex,
      client3.contactNumber,
      client3.UID,
      client3.PAN
    );

  await client3Tx.wait();

  console.log("Client 3 added to the blockchain. \u2705");

  const client4Tx = await eVaultMain
    .connect(deployer)
    .registerClient(
      client4.name,
      client4.dateOfBirth,
      client4.religion,
      client4.nationality,
      client4.sex,
      client4.contactNumber,
      client4.UID,
      client4.PAN
    );

  await client4Tx.wait();

  console.log("Client 4 added to the blockchain. \u2705");

  console.log("Checking if client are registered successfully \u23F3");
  await getClientDetails(eVaultMain, 791619819984);
  console.log("Client 1 verified \u2705");

  await getClientDetails(eVaultMain, 791619819988);
  console.log("Client 2 verified \u2705");

  await getClientDetails(eVaultMain, 791619819986);
  console.log("Client 3 verified \u2705");

  await getClientDetails(eVaultMain, 791619819987);
  console.log("Client 4 verified \u2705");

  console.log("- - - - - - - - - - - - - - - - - - - - -");

  console.log(
    `Filing 3 new demo case between client : ${client1.UID} and 3 other clients ... \u23F3`
  );

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

  const legalCase3Tx = await eVaultMain.connect(deployer).registerLegalCase(
    legalCase3.UIDOfParty1,
    legalCase3.UIDOfParty2,
    legalCase3.associatedJudge,
    legalCase3.caseSubject,
    legalCase3.associatedLawyers.map((lawyerAddress) =>
      ethers.utils.getAddress(lawyerAddress)
    )
  );

  await legalCase3Tx.wait();

  console.log("Demo legal cases added to the blockchain \u2705");

  console.log("Checking if Case 1 is registered successfully \u23F3");
  await getLegalCaseDetails(eVaultMain, 1);
  console.log("Case 1 verified \u2705");

  console.log("Checking if Case 2 is registered successfully \u23F3");
  await getLegalCaseDetails(eVaultMain, 2);
  console.log("Case 2 verified \u2705");

  console.log("Checking if Case 3 is registered successfully \u23F3");
  await getLegalCaseDetails(eVaultMain, 3);
  console.log("Case 3 verified \u2705");

  console.log("- - - - - - - - - - - - - - - - - - - - -");

  // addingNewUpdatesForCases
  console.log("Adding progress for registered case files ... \u23F3");

  // Update progress2 for legalCase1
  const updateProgress1Tx = await eVaultMain
    .connect(deployer)
    .updateCaseProgressWithCaseId(
      1, // Case ID of legalCase1
      legalCase1.progress2 // Use the progress2 value from the data
    );
  await updateProgress1Tx.wait();
  const updateProgress2Tx = await eVaultMain
    .connect(deployer)
    .updateCaseProgressWithCaseId(
      1, // Case ID of legalCase1
      "Progress 3" // Use the progress2 value from the data
    );
  await updateProgress2Tx.wait();
  const updateProgress3Tx = await eVaultMain
    .connect(deployer)
    .updateCaseProgressWithCaseId(
      1, // Case ID of legalCase1
      "Progress 4" // Use the progress2 value from the data
    );
  await updateProgress3Tx.wait();
  const updateProgress4Tx = await eVaultMain
    .connect(deployer)
    .updateCaseProgressWithCaseId(
      1, // Case ID of legalCase1
      "Progress 5" // Use the progress2 value from the data
    );
  await updateProgress4Tx.wait();
  const updateProgress5Tx = await eVaultMain
    .connect(deployer)
    .updateCaseProgressWithCaseId(
      1, // Case ID of legalCase1
      "Progress 6" // Use the progress2 value from the data
    );
  await updateProgress5Tx.wait();
  console.log("Case 1 progress timeline updated \u2705");

  // // Update progress2 for legalCase2
  // const updateProgress2Tx = await eVaultMain
  //   .connect(deployer)
  //   .updateCaseProgressWithCaseId(
  //     2, // Case ID of legalCase2
  //     legalCase2.progress2 // Use the progress2 value from the data
  //   );
  // await updateProgress2Tx.wait();
  // console.log("Case 2 progress updated \u2705");

  // // Update progress2 for legalCase3
  // const updateProgress3Tx = await eVaultMain
  //   .connect(deployer)
  //   .updateCaseProgressWithCaseId(
  //     3, // Case ID of legalCase3
  //     legalCase3.progress2 // Use the progress2 value from the data
  //   );
  // await updateProgress3Tx.wait();
  // console.log("Case 3 progress updated \u2705");

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
