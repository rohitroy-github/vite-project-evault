// FILE -> Writing/DefiningDeployingScripts

const {ethers, run, network, upgrades} = require("hardhat");

const {
  lawyer,
  judge,
  client,
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

// async function getClientDetails(contract, UID) {
//   const clientData = await contract.getClientDetailsByUID(UID);

//   console.log("Client Data:");
//   console.log("Name:", clientData.name);
//   console.log("Date of Birth:", clientData.dateOfBirth);
//   console.log("Religion:", clientData.religion);
//   console.log("Nationality:", clientData.nationality);
//   console.log("Sex:", clientData.sex);
//   console.log("Contact Number:", clientData.contactNumber);
//   console.log("UID:", clientData.UID);
//   console.log("PAN:", clientData.PAN);
//   console.log("Associated Lawyers:", clientData.associatedLawyers);
//   console.log("Associated Case IDs:", clientData.associatedCaseIds);
//   console.log("Wallet Address:", clientData.walletAddress);
// }

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// ToExecute -> npx hardhat run scripts/deploy.js --network <network-name>
