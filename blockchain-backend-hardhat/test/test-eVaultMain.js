const {ethers} = require("hardhat");
const {expect, assert} = require("chai");

const client = {
  name: "Client1",
  dateOfBirth: "2001-12-30",
  religion: "Hinduism",
  nationality: "Indian",
  sex: "Male",
  contactNumber: "9051179307",
  UID: 791619819984,
  PAN: "EQJPR7681M",
  associatedLawyers: [],
  associatedCaseIds: [],
};

const client2 = {
  name: "Client2",
  dateOfBirth: "2001-12-30",
  religion: "Hinduism",
  nationality: "Indian",
  sex: "Male",
  contactNumber: "9051179306",
  UID: 791619819985,
  PAN: "EQJPR7681N",
  associatedLawyers: [],
  associatedCaseIds: [],
};

const lawyer = {
  name: "Lawyer1",
  dateOfBirth: "2001-12-30",
  religion: "Hinduism",
  nationality: "Indian",
  sex: "Male",
  contactNumber: "9051179305",
  UID: 791619819989,
  PAN: "EQJPR7681F",
  associatedCaseIds: [],
};

const judge = {
  name: "Judge1",
  dateOfBirth: "2001-12-30",
  religion: "Hinduism",
  nationality: "Indian",
  sex: "Male",
  contactNumber: "9051179305",
  UID: 791619819989,
  PAN: "EQJPR7681F",
  associatedCaseIds: [],
};

const legalCase = {
  UIDOfParty1: 791619819984,
  UIDOfParty2: 791619819985,
  associatedLawyers: [
    "0xD34861D1DC54BDAa9B42a9FBc875BF9685804B17",
    "0x3BcC4202014dF6590E7bFf29783188B1a72d5aF4",
  ],
  associatedJudge: "Justice Gomes",
  caseSubject: "Car Accident",
  caseId: 1,
  caseProgress: ["Case registered with E-Vault."],
};

const legalCase2 = {
  UIDOfParty1: 791619819984,
  UIDOfParty2: 791619819985,
  associatedLawyers: [
    "0xD34861D1DC54BDAa9B42a9FBc875BF9685804B17",
    "0x3BcC4202014dF6590E7bFf29783188B1a72d5aF4",
  ],
  associatedJudge: "Justice Mathur",
  caseSubject: "Murder",
  caseId: 2,
  caseProgress: ["Case registered with E-Vault."],
};

describe("eVaultMain", () => {
  let eVaultMain;
  let deployer;

  beforeEach(async () => {
    // settingUpAccounts
    [deployer, buyer] = await ethers.getSigners();
    // contractDeployment
    const EVAULTMAIN = await ethers.getContractFactory("eVaultMain");
    eVaultMain = await EVAULTMAIN.deploy();
  });

  describe("Contructor Management", () => {
    // setsOwner
    it("contract has an owner", async () => {
      expect(await eVaultMain.contractOwner()).to.equal(deployer.address);
    });

    // setsName
    it("contract has an name", async () => {
      expect(await eVaultMain.contractName()).to.equal("eVaultMain");
    });
  });

  describe("Client Management", () => {
    it("should register a new client", async () => {
      await eVaultMain.registerClient(
        client.name,
        client.dateOfBirth,
        client.religion,
        client.nationality,
        client.sex,
        client.contactNumber,
        client.UID,
        client.PAN
      );

      const storedClient = await eVaultMain.getClientDetailsByUID(client.UID);

      expect(storedClient.name).to.equal(client.name);
      expect(storedClient.dateOfBirth).to.equal(client.dateOfBirth);
      expect(storedClient.religion).to.equal(client.religion);
      expect(storedClient.nationality).to.equal(client.nationality);
      expect(storedClient.sex).to.equal(client.sex);
      expect(storedClient.contactNumber).to.equal(client.contactNumber);
      expect(storedClient.UID).to.equal(client.UID);
      expect(storedClient.PAN).to.equal(client.PAN);
      expect(storedClient.associatedLawyers).to.eql(client.associatedLawyers);
      expect(storedClient.associatedCaseIds).to.eql(client.associatedCaseIds);
      expect(storedClient.walletAddress).to.equal(deployer.address);

      // console.log(`Client name : ${storedClient.name}`);
    });

    it("should not retrieve details of a non-existing client", async () => {
      const nonExistentUID = 9876543210;

      try {
        await eVaultMain.getClientDetailsByUID(nonExistentUID);
      } catch (error) {
        expect(error.message).to.include("Client with this UID does not exist");
        return;
      }

      expect.fail("Expected an error for non-existing client");
    });

    it("should add associated lawyers for an existing client", async () => {
      await eVaultMain.registerClient(
        client.name,
        client.dateOfBirth,
        client.religion,
        client.nationality,
        client.sex,
        client.contactNumber,
        client.UID,
        client.PAN
      );

      const newLawyers = [
        "0xD34861D1DC54BDAa9B42a9FBc875BF9685804B17",
        "0x3BcC4202014dF6590E7bFf29783188B1a72d5aF4",
      ];

      await eVaultMain.updateAssociatedLawyers(client.UID, newLawyers);

      const updatedClient = await eVaultMain.getClientDetailsByUID(client.UID);

      expect(updatedClient.associatedLawyers).to.eql(newLawyers);
    });
  });

  describe("Lawyer Management", () => {
    it("should register a new lawyer", async () => {
      await eVaultMain.registerLawyer(
        lawyer.name,
        lawyer.dateOfBirth,
        lawyer.religion,
        lawyer.nationality,
        lawyer.sex,
        lawyer.contactNumber,
        lawyer.UID,
        lawyer.PAN
      );

      const storedLawyer = await eVaultMain.getLawyerDetailsByUID(lawyer.UID);

      expect(storedLawyer.name).to.equal(lawyer.name);
      expect(storedLawyer.dateOfBirth).to.equal(lawyer.dateOfBirth);
      expect(storedLawyer.religion).to.equal(lawyer.religion);
      expect(storedLawyer.nationality).to.equal(lawyer.nationality);
      expect(storedLawyer.sex).to.equal(lawyer.sex);
      expect(storedLawyer.contactNumber).to.equal(lawyer.contactNumber);
      expect(storedLawyer.UID).to.equal(lawyer.UID);
      expect(storedLawyer.PAN).to.equal(lawyer.PAN);
      expect(storedLawyer.associatedCaseIds).to.eql(lawyer.associatedCaseIds);
      expect(storedLawyer.walletAddress).to.equal(deployer.address);

      // console.log(`Registered lawyer name : ${storedLawyer.name}`);
    });

    it("should not retrieve details of a non-existing lawyer", async () => {
      const nonExistentUID = 9876543210;

      try {
        await eVaultMain.getLawyerDetailsByUID(nonExistentUID);
      } catch (error) {
        expect(error.message).to.include("Lawyer with this UID does not exist");
        return;
      }

      expect.fail("Expected an error for non-existing lawyer");
    });
  });

  describe("Legal Case Management", () => {
    beforeEach(async () => {
      // register2Clients
      // client1
      await eVaultMain.registerClient(
        client.name,
        client.dateOfBirth,
        client.religion,
        client.nationality,
        client.sex,
        client.contactNumber,
        client.UID,
        client.PAN
      );
      // client2
      await eVaultMain.registerClient(
        client2.name,
        client2.dateOfBirth,
        client2.religion,
        client2.nationality,
        client2.sex,
        client2.contactNumber,
        client2.UID,
        client2.PAN
      );
      // register2NewLegalCase
      // case1
      await eVaultMain.registerLegalCase(
        client.UID,
        client2.UID,
        legalCase.associatedJudge,
        legalCase.caseSubject,
        legalCase.associatedLawyers
      );
      // case1
      await eVaultMain.registerLegalCase(
        client.UID,
        client2.UID,
        legalCase2.associatedJudge,
        legalCase2.caseSubject,
        legalCase2.associatedLawyers
      );

      // updatingCaseProgess
      await eVaultMain.updateCaseProgressWithCaseId(
        legalCase.caseId,
        "Clients, Lawyers & Judge notified."
      );
    });

    it("should add a legal case between two clients", async () => {
      // register2Clients
      // codeIn[beforeEach]block

      // let clientParty1 = await eVaultMain.getClientDetailsByUID(client.UID);
      // let clientParty2 = await eVaultMain.getClientDetailsByUID(client2.UID);
      // console.log(
      //   `Case details before deploying >>> Client 1 : ${clientParty1.name}, Client 2 : ${clientParty2.name}, Judge = ${legalCase.associatedJudge} , Subject = ${legalCase.caseSubject}, Lawyers = ${legalCase.associatedLawyers}`
      // );

      // registerTheNewLegalCase
      // codeIn[beforeEach]block

      // fetchCaseIdFromGlobalCounter
      // const caseId = await eVaultMain.caseIdCounter();
      // expect(caseId - 1).to.equal(legalCase.caseId);

      // fetchDetailsOfAddedLegalCase
      const storedLegalCase = await eVaultMain.getCaseDetailsByCaseId(
        legalCase.caseId
      );

      expect(storedLegalCase.UIDOfParty1).to.equal(client.UID);
      expect(storedLegalCase.UIDOfParty2).to.equal(client2.UID);
      expect(storedLegalCase.associatedJudge).to.equal(
        legalCase.associatedJudge
      );
      expect(storedLegalCase.caseSubject).to.equal(legalCase.caseSubject);
      expect(storedLegalCase.caseProgress).to.eql([
        "Case registered with E-Vault",
        "Clients, Lawyers & Judge notified.",
      ]);

      // console.log("Case progress :", storedLegalCase.caseProgress);
    });

    it("should retrieve filed legal cases for a client", async () => {
      // register2Clients
      // register2NewLegalCase
      // codeIn[beforeEach]block

      // Retrieve filed legal cases for the client
      const filedCases = await eVaultMain.getFiledLegalCasesForAClient(
        client.UID
      );

      // console.log(
      //   `Case 1 >>> Case ID : ${filedCases[0].caseId}, Subject : ${filedCases[0].caseSubject}`
      // );
      // console.log(
      //   `Case 2 >>> Case ID : ${filedCases[1].caseId}, Subject : ${filedCases[1].caseSubject}`
      // );

      // since2CasesAreRegisteredUnder[Client 1 : "client"]
      expect(filedCases.length).to.equal(2);

      // // additionalChecks
      // expect(filedCases[0].UIDOfParty1).to.equal(client.UID);
      // expect(filedCases[0].UIDOfParty2).to.equal(client2.UID);
      // expect(filedCases[0].associatedJudge).to.equal(legalCase.associatedJudge);
      // expect(filedCases[0].caseSubject).to.equal(legalCase.caseSubject);
    });
  });

  describe("Judge Management", () => {
    it("should register a new judge", async () => {
      await eVaultMain.registerJudge(
        judge.name,
        judge.dateOfBirth,
        judge.religion,
        judge.nationality,
        judge.sex,
        judge.contactNumber,
        judge.UID,
        judge.PAN
      );

      const storedJudge = await eVaultMain.getJudgeDetailsByUID(judge.UID);

      expect(storedJudge.name).to.equal(judge.name);
      expect(storedJudge.dateOfBirth).to.equal(judge.dateOfBirth);
      expect(storedJudge.religion).to.equal(judge.religion);
      expect(storedJudge.nationality).to.equal(judge.nationality);
      expect(storedJudge.sex).to.equal(judge.sex);
      expect(storedJudge.contactNumber).to.equal(judge.contactNumber);
      expect(storedJudge.UID).to.equal(judge.UID);
      expect(storedJudge.PAN).to.equal(judge.PAN);
      expect(storedJudge.associatedCaseIds).to.eql(judge.associatedCaseIds);
      expect(storedJudge.walletAddress).to.equal(deployer.address);

      // Additional checks can be added as needed
    });

    it("should not retrieve details of a non-existing judge", async () => {
      const nonExistentUID = 9876543210;

      try {
        await eVaultMain.getJudgeDetailsByUID(nonExistentUID);
      } catch (error) {
        expect(error.message).to.include("Judge with this UID does not exist");
        return;
      }

      expect.fail("Expected an error for non-existing judge");
    });
  });

  // LoginFunctionalitiesTest

  describe("Login Functionalities", () => {
    it("should login as a client", async () => {
      // Register a new client
      await eVaultMain.registerClient(
        client.name,
        client.dateOfBirth,
        client.religion,
        client.nationality,
        client.sex,
        client.contactNumber,
        client.UID,
        client.PAN
      );

      // Check if the client is registered by calling the loginAsAClient function
      const isClientRegistered = await eVaultMain.loginAsAClient(client.UID);

      // Assert that the client is registered (should return true)
      expect(isClientRegistered).to.equal(true);
    });

    it("should not login as a non-existing client", async () => {
      // Attempt to check login for a non-existing client UID
      const nonExistentUID = 9876543210;

      // Check if the client is registered by calling the loginAsAClient function
      const isClientRegistered = await eVaultMain.loginAsAClient(
        nonExistentUID
      );

      // Assert that the client is not registered (should return false)
      expect(isClientRegistered).to.equal(false);
    });
  });
});
