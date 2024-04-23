const {ethers, run, network} = require("hardhat");

const {
  judge1,
  judge2,
  judge3,
  judge4,
  judge5,
  judge6,
  lawyer1,
  lawyer2,
  lawyer3,
  client1,
  client2,
  client3,
  legalCase1,
  legalCase2,
  legalCase3,
} = require("../assets/test-deploy-data.json");

const {registerJudge} = require("./script-functions/function_judge");
const {
  registerLawyer,
  verifyLawyerRegistration,
} = require("./script-functions/function_lawyer");
const {
  registerClient,
  verifyClientRegistration,
  getLegalCasesForClient,
} = require("./script-functions/function_client");
const {
  registerLegalCase,
  getLegalCaseDetails,
  updateCaseProgressWithCaseId,
} = require("./script-functions/function_legalcase");

async function main() {
  console.log("- - - - - - - - - - - - - - - - - - - - -");
  console.log("- - - - - - - - - - - - - - - - - - - - -");
  console.log(`Contract deployment ⌛`);
  console.log("- - - - - - - - - - - - - - - - - - - - -");

  const EvaultMainContract = await ethers.getContractFactory("EVault_Main");
  const eVaultMain = await EvaultMainContract.deploy();
  await eVaultMain.deployed();

  console.log("Contract deployed successfully \u2705");

  console.log(`Contract name: ${await eVaultMain.contractName()}`);
  console.log(`Contract address : ${eVaultMain.address}`);
  console.log(`Contract owner: ${await eVaultMain.contractOwner()}`);
  console.log(`Deployment chainID: [ ${network.config.chainId} ]`);

  if (network.config.chainId === 11155111) {
    console.log(`Deployment network: Sepolia Testnet`);
    console.log("Confirming blocks ... \u23F3");
    await eVaultMain.deployTransaction.wait(6);
    await verify(eVaultMain.address, []);
  } else if (network.config.chainId === 31337) {
    console.log(`Deployment network: Localhost [ Hardhat ]`);
  } else if (network.config.chainId === 80002) {
    console.log(`Deployment network: Polygon Amoy Testnet`);
    console.log("Confirming blocks ... \u23F3");
    await eVaultMain.deployTransaction.wait(3);
    console.log("3 block confirmations done \u2705");
  } else if (network.config.chainId === 2710) {
    console.log(`Deployment network: Morph Testnet`);
    console.log("Confirming blocks ... \u23F3");
    await eVaultMain.deployTransaction.wait(2);
    console.log("2 block confirmations done \u2705");
    await verify(eVaultMain.address, []);
  }

  if (network.config.chainId === 31337) {
    console.log("- - - - - - - - - - - - - - - - - - - - -");
    console.log(`Contract interactions ⌛`);
    console.log("- - - - - - - - - - - - - - - - - - - - -");

    const [deployer] = await ethers.getSigners();

    console.log("Registering 3 new clients now ... \u23F3");

    await registerClient(deployer, eVaultMain, client1);
    await registerClient(deployer, eVaultMain, client2);
    await registerClient(deployer, eVaultMain, client3);

    console.log("- - - - - - - - - - - - - - - - - - - - -");

    console.log("Verifying 3 newly added clients \u23F3");

    await verifyClientRegistration(eVaultMain, client1);
    await verifyClientRegistration(eVaultMain, client2);
    await verifyClientRegistration(eVaultMain, client3);

    console.log("All 3 clients are verified successfully. \u2705");

    console.log("- - - - - - - - - - - - - - - - - - - - -");

    console.log("Registering 3 new lawyers now ... \u23F3");

    await registerLawyer(deployer, eVaultMain, lawyer1);
    await registerLawyer(deployer, eVaultMain, lawyer2);
    await registerLawyer(deployer, eVaultMain, lawyer3);

    console.log("- - - - - - - - - - - - - - - - - - - - -");

    console.log("Verifying 3 new lawyers now ... \u23F3");

    await verifyLawyerRegistration(eVaultMain, lawyer1);
    await verifyLawyerRegistration(eVaultMain, lawyer2);
    await verifyLawyerRegistration(eVaultMain, lawyer3);

    console.log("- - - - - - - - - - - - - - - - - - - - -");

    console.log("Registering 3 new judges now ... \u23F3");

    await registerJudge(deployer, eVaultMain, judge1);
    await registerJudge(deployer, eVaultMain, judge2);
    await registerJudge(deployer, eVaultMain, judge3);
    await registerJudge(deployer, eVaultMain, judge4);
    // await registerJudge(deployer, eVaultMain, judge5);
    // await registerJudge(deployer, eVaultMain, judge6);

    console.log("- - - - - - - - - - - - - - - - - - - - -");

    console.log(
      `Filing 3 new legal cases between client : ${client1.UID} and 2 other clients ... \u23F3`
    );

    await registerLegalCase(deployer, eVaultMain, legalCase1);
    await registerLegalCase(deployer, eVaultMain, legalCase2);
    await registerLegalCase(deployer, eVaultMain, legalCase3);

    console.log("Legal cases added to blockchain \u2705");

    console.log("- - - - - - - - - - - - - - - - - - - - -");

    console.log("Verifying 3 newly added cases ... \u23F3");

    await getLegalCaseDetails(eVaultMain, 1);
    await getLegalCaseDetails(eVaultMain, 2);
    await getLegalCaseDetails(eVaultMain, 3);

    console.log("- - - - - - - - - - - - - - - - - - - - -");

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
      `Case [ ${legalCase1.caseId} | ${legalCase1.caseSubject} ] progress updated \u2705`
    );

    console.log("- - - - - - - - - - - - - - - - - - - - -");

    // fetchingCasesForAClient?
    await getLegalCasesForClient(eVaultMain, client1.UID);
  }

  console.log("- - - - - - - - - - - - - - - - - - - - -");
  console.log("- - - - - - - - - - - - - - - - - - - - -");
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

// run >>> npx hardhat run scripts/deploy_fetchCaseDetailsByAClient.js --network <network-name>
// run >>> npx hardhat run scripts/deploy_fetchCaseDetailsByAClient.js --network localhost
// run >>> npx hardhat run scripts/deploy_fetchCaseDetailsByAClient.js --network sepolia

// run >>> npx hardhat run scripts/deploy_fetchCaseDetailsByAClient.js --network amoy
// run >>> npx hardhat run scripts/deploy_fetchCaseDetailsByAClient.js --network morph
