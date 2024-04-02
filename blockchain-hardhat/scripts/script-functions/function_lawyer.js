async function registerLawyer(deployer, contract, lawyerData) {
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
  } = lawyerData;

  // console.log(`Registering lawyer : [ ${name} ] ... \u23F3`);

  const registerLawyerTx = await contract
    .connect(deployer)
    .registerLawyer(
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

  await registerLawyerTx.wait();

  console.log(`Lawyer [ ${name} | ${UID} ] added to blockchain. \u2705`);
}

async function verifyLawyerRegistration(contract, lawyerData) {
  try {
    const isLawyerRegistered = await contract.loginAsALawyer(lawyerData.UID);

    if (isLawyerRegistered) {
      console.log(
        `Lawyer : [ ${lawyerData.name} | ${lawyerData.UID} ] verified. \u2705`
      );
    } else {
      console.log(
        `Lawyer : [ ${lawyerData.name} | ${lawyerData.UID} ] not found. \0x274C`
      );
    }
  } catch (error) {
    console.log(`Error while verifying lawyer : [ ${UID} ] : ${error}`);
  }
}

module.exports = {registerLawyer, verifyLawyerRegistration};
