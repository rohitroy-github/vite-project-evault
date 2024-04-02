async function registerJudge(deployer, contract, judgeData) {
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
  } = judgeData;

  // console.log(`Registering Judge : [ ${name} ] ... \u23F3`);

  const registerJudgeTx = await contract
    .connect(deployer)
    .registerJudge(
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

  await registerJudgeTx.wait();

  console.log(`Judge [ ${name} | ${UID} ] added to blockchain. \u2705`);
}

module.exports = {registerJudge};
