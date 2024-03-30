const {getLegalCaseDetails} = require("../script-functions/function_legalcase");

async function registerClient(deployer, contract, clientData) {
  const {
    name,
    dateOfBirth,
    religion,
    nationality,
    sex,
    contactNumber,
    UID,
    PAN,
  } = clientData;

  //   console.log(`Registering client : [ ${name} ] ... \u23F3`);

  const registerClientTX = await contract
    .connect(deployer)
    .registerClient(
      name,
      dateOfBirth,
      religion,
      nationality,
      sex,
      contactNumber,
      UID,
      PAN
    );

  await registerClientTX.wait();

  console.log(`Client : [ ${name} | ${UID} ] added to blockchain. \u2705`);
}

async function getClientDetails(contract, UID) {
  try {
    const clientData = await contract.getClientDetailsByUID(UID);

    console.log(
      `Client : [ ${clientData.name} | ${clientData.UID} ] verified. \u2705`
    );
  } catch (error) {
    console.log(`Error while checking for client : [ ${UID} ] : ${error}`);
  }
}

async function getLegalCasesForClient(contract, UID) {
  console.log(
    `Serching for the cases associated with client : [ ${UID} ] \u23F3`
  );
  const filedCases = await contract.getFiledLegalCasesForAClient(UID);

  for (let i = 0; i < filedCases.length; i++) {
    const caseId = filedCases[i].caseId.toNumber();
    // console.log(`Fetching details for Case ${caseId} \u23F3`);
    await getLegalCaseDetails(contract, caseId);
  }

  console.log(`Case details fetched successfully. \u2705`);
}

module.exports = {registerClient, getClientDetails, getLegalCasesForClient};
