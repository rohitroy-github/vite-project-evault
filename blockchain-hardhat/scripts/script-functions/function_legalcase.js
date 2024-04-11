async function registerLegalCase(deployer, contract, caseData) {
  const {UIDOfParty1, UIDOfParty2, caseSubject, associatedLawyers} = caseData;

  console.log(`Registering Case : [ ${caseSubject} ] ... \u23F3`);

  const registerCaseTX = await contract.connect(deployer).registerLegalCase(
    UIDOfParty1,
    UIDOfParty2,
    caseSubject,
    associatedLawyers.map((lawyerUID) => lawyerUID)
  );

  await registerCaseTX.wait();

  console.log(`Case [ ${caseSubject} ] added to blockchain. \u2705`);
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

  //   console.log("Case ID:", caseDetails.caseId.toString());
  console.log(
    `Case subject : [ ${caseId} | ${caseDetails.caseSubject} ] verfied. \u2705`
  );
}

async function updateCaseProgressWithCaseId(
  deployer,
  contract,
  caseID,
  progress
) {
  const updateCaseProgressTX = await contract
    .connect(deployer)
    .updateCaseProgressWithCaseId(caseID, progress);

  await updateCaseProgressTX.wait();

  console.log(`Case progress : [ ${caseID} | ${progress} ]. \u2705`);
}

module.exports = {
  registerLegalCase,
  getLegalCaseDetails,
  updateCaseProgressWithCaseId,
};
