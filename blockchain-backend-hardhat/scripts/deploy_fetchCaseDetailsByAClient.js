// Test >>>
// > Registering 2 new client
// > Registering a new case between these 2 clients.
// > Fetching all the cases a client is associated with.

const {ethers, run, network} = require("hardhat");

const {
  //   lawyer,
  judge,
  client1,
  client2,
  client3,
  client4,
  legalCase1,
  legalCase2,
  legalCase3,
} = require("../assets/test-deploy-data.json");

const {registerJudge} = require("./script-functions/function_judge");
const {
  registerClient,
  getClientDetails,
  getLegalCasesForClient,
} = require("./script-functions/function_client");
const {
  registerLegalCase,
  getLegalCaseDetails,
  updateCaseProgressWithCaseId,
} = require("./script-functions/function_legalcase");

async function main() {
  const EVAULTMAIN = await ethers.getContractFactory("eVaultMain");
  const eVaultMain = await EVAULTMAIN.deploy();

  await eVaultMain.deployed();

  console.log("Contract deployed successfully \u2705");
  console.log(`Contract address : ${eVaultMain.address}`);
  console.log(`Contract owner: ${await eVaultMain.contractOwner()}`);
  console.log(`Contract name: ${await eVaultMain.contractName()}`);

  // makingATestInterraction
  const [deployer] = await ethers.getSigners();

  console.log("- - - - - - - - - - - - - - - - - - - - -");

  console.log("Registering 4 new clients now ... \u23F3");

  // Register a new judge using the provided data
  await registerClient(deployer, eVaultMain, client1);
  await registerClient(deployer, eVaultMain, client2);
  await registerClient(deployer, eVaultMain, client3);
  await registerClient(deployer, eVaultMain, client4);

  console.log("- - - - - - - - - - - - - - - - - - - - -");

  console.log("Checking if client are registered successfully \u23F3");
  await getClientDetails(eVaultMain, 791619819984);
  await getClientDetails(eVaultMain, 791619819988);
  await getClientDetails(eVaultMain, 791619819986);
  await getClientDetails(eVaultMain, 791619819987);
  console.log("All 4 clients are verified successfully. \u2705");

  console.log("- - - - - - - - - - - - - - - - - - - - -");

  console.log(
    `Filing 3 new legal cases between client : ${client1.UID} and 3 other clients ... \u23F3`
  );

  await registerLegalCase(deployer, eVaultMain, legalCase1);
  await registerLegalCase(deployer, eVaultMain, legalCase2);
  await registerLegalCase(deployer, eVaultMain, legalCase3);

  console.log("Demo legal cases added to the blockchain \u2705");

  console.log("- - - - - - - - - - - - - - - - - - - - -");

  console.log("Checking if cases are registered successfully \u23F3");

  await getLegalCaseDetails(eVaultMain, 1);
  await getLegalCaseDetails(eVaultMain, 2);
  await getLegalCaseDetails(eVaultMain, 3);

  console.log("- - - - - - - - - - - - - - - - - - - - -");

  // addingNewUpdatesForCases
  console.log(
    `Updating progress for case [ ${legalCase1.caseId} | ${legalCase1.caseSubject} ] ... \u23F3`
  );

  await updateCaseProgressWithCaseId(
    deployer,
    eVaultMain,
    1,
    legalCase1.progress2
  );
  await updateCaseProgressWithCaseId(
    deployer,
    eVaultMain,
    1,
    legalCase1.progress3
  );
  await updateCaseProgressWithCaseId(
    deployer,
    eVaultMain,
    1,
    legalCase1.progress4
  );
  await updateCaseProgressWithCaseId(
    deployer,
    eVaultMain,
    1,
    legalCase1.progress5
  );
  await updateCaseProgressWithCaseId(
    deployer,
    eVaultMain,
    1,
    legalCase1.progress6
  );

  console.log(
    `Case [ ${legalCase1.caseId} | ${legalCase1.caseSubject} ] progress timeline updated \u2705`
  );

  console.log("- - - - - - - - - - - - - - - - - - - - -");

  // fetchingCasesForAClient?
  await getLegalCasesForClient(eVaultMain, client1.UID);

  console.log("- - - - - - - - - - - - - - - - - - - - -");

  // registeringANewJudge
  await registerJudge(deployer, eVaultMain, judge);

  console.log("- - - - - - - - - - - - - - - - - - - - -");

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

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// ToExecute -> npx hardhat run scripts/deploy_fetchCaseDetailsByAClient.js --network <network-name>
