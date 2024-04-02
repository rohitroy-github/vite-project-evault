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
    walletAddress,
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
      PAN,
      walletAddress
    );

  await registerClientTX.wait();

  console.log(`Client : [ ${name} | ${UID} ] added to blockchain. \u2705`);
}

async function verifyClientRegistration(contract, clientData) {
  try {
    const isClientRegistered = await contract.loginAsAClient(clientData.UID);

    if (isClientRegistered) {
      console.log(
        `Lawyer : [ ${clientData.name} | ${clientData.UID} ] verified. \u2705`
      );
    } else {
      console.log(
        `Lawyer : [ ${clientData.name} | ${clientData.UID} ] not found. \0x274C`
      );
    }
  } catch (error) {
    console.log(`Error while verifying client : [ ${UID} ] : ${error}`);
  }
}

async function getLegalCasesForClient(contract, UID) {
  console.log(
    `Serching for the cases associated with client : [ ${UID} ] \u23F3`
  );
  const filedCases = await contract.getFiledLegalCasesForAClient(UID);

  console.log(`${filedCases.length} Case files fetched successfully. \u2705`);
}

module.exports = {
  registerClient,
  verifyClientRegistration,
  getLegalCasesForClient,
};
