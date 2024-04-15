const {ethers} = require("hardhat");
const {expect, assert} = require("chai");
const {BigNumber} = require("ethers");

const client1 = {
  name: "Client1",
  dateOfBirth: "2001-12-30",
  religion: "Hinduism",
  nationality: "Indian",
  sex: "Male",
  contactNumber: "9051179307",
  UID: 791619819984,
  PAN: "EQJPR7681M",
  associatedCaseIds: [],
  walletAddress: "0x976ea74026e726554db657fa54763abd0c3a0aa9",
};

const client2 = {
  name: "Client2",
  dateOfBirth: "2001-12-30",
  religion: "Hinduism",
  nationality: "Indian",
  sex: "Male",
  contactNumber: "9051179308",
  UID: 791619819988,
  PAN: "EQJPR7681N",
  associatedCaseIds: [],
  walletAddress: "0x14dc79964da2c08b23698b3d3cc7ca32193d9955",
};

const client3 = {
  name: "Client3",
  dateOfBirth: "2001-12-30",
  religion: "Hinduism",
  nationality: "Indian",
  sex: "Male",
  contactNumber: "9051179308",
  UID: 791619819986,
  PAN: "EQJPR7681N",
  associatedCaseIds: [],
  walletAddress: "0x23618e81e3f5cdf7f54c3d65f7fbc0abf5b21e8f",
};

const lawyer1 = {
  name: "Lawyer1",
  dateOfBirth: "2001-12-30",
  religion: "Hinduism",
  nationality: "Indian",
  sex: "Male",
  contactNumber: "9051179305",
  UID: 791619819989,
  PAN: "EQJPR7681F",
  associatedCaseIds: [1, 2, 3],
  walletAddress: "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
};

const lawyer2 = {
  name: "Lawyer2",
  dateOfBirth: "1985-07-15",
  religion: "Islam",
  nationality: "Indian",
  sex: "Female",
  contactNumber: "9876543210",
  UID: 791619819987,
  PAN: "ABCDEF1234G",
  associatedCaseIds: [],
  walletAddress: "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
};

const lawyer3 = {
  name: "Lawyer3",
  dateOfBirth: "1990-03-20",
  religion: "Christianity",
  nationality: "Indian",
  sex: "Female",
  contactNumber: "9988776655",
  UID: 987654321098,
  PAN: "WXYZ1234H",
  associatedCaseIds: [],
  walletAddress: "0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc",
};

const judge1 = {
  name: "Judge1",
  dateOfBirth: "2001-12-30",
  religion: "Hinduism",
  nationality: "Indian",
  sex: "Male",
  contactNumber: "9051179305",
  UID: 791619819970,
  PAN: "EQJPR7681F",
  associatedCaseIds: [],
  walletAddress: "0x90f79bf6eb2c4f870365e785982e1f101e93b906",
};

const judge2 = {
  name: "Judge2",
  dateOfBirth: "1975-06-15",
  religion: "Christianity",
  nationality: "American",
  sex: "Female",
  contactNumber: "555-123-4567",
  UID: 123456789012,
  PAN: "ABCPD1234E",
  associatedCaseIds: [],
  walletAddress: "0x15d34aaf54267db7d7c367839aaf71a00a2c6a65",
};

const judge3 = {
  name: "Judge3",
  dateOfBirth: "1980-03-25",
  religion: "Islam",

  nationality: "Pakistani",
  sex: "Male",
  contactNumber: "+92 300 1234567",
  UID: 987654321000,
  PAN: "PQRXY5678Z",
  associatedCaseIds: [],
  walletAddress: "0x9965507d1a55bcc2695c58ba16fb37d819b0a4dc",
};

const legalCase1 = {
  UIDOfParty1: 791619819984,
  UIDOfParty2: 791619819988,
  associatedLawyers: [791619819989, 791619819987],
  caseSubject: "Hit and Run",
  caseId: 1,
  progress2: "Clients, Lawyers & Judge Notified.",
  progress3: "First hearing completed.",
  progress4: "Second hearing postponed.",
  progress5: "Second hearing completed.",
  progress6: "Verdict announced.",
};

const legalCase2 = {
  UIDOfParty1: 791619819988,
  UIDOfParty2: 791619819986,
  associatedLawyers: [791619819989, 987654321098],
  caseSubject: "Car Accident",
  caseId: 2,
  progress2: "Clients, Lawyers & Judge Notified.",
};

const legalCase3 = {
  UIDOfParty1: 791619819986,
  UIDOfParty2: 791619819984,
  associatedLawyers: [791619819989, 987654321098],
  caseSubject: "Property Dispute",
  caseId: 3,
  progress2: "Clients, Lawyers & Judge Notified.",
};

describe("eVaultMain", () => {
  let eVaultMain;
  let deployer;

  beforeEach(async () => {
    // settingUpAccounts
    [deployer, user1, user2] = await ethers.getSigners();
    // contractDeployment
    const EVAULTMAIN = await ethers.getContractFactory("EVault_Main");
    eVaultMain = await EVAULTMAIN.deploy();
  });

  describe("Contructor Management", () => {
    // setsOwner
    it("contract has an owner", async () => {
      expect(await eVaultMain.contractOwner()).to.equal(deployer.address);
    });

    // setsName
    it("contract has an name", async () => {
      expect(await eVaultMain.contractName()).to.equal("EVault_Main");
    });
  });

  describe("Client Management", () => {
    beforeEach(async () => {
      await eVaultMain.registerClient(
        client1.name,
        client1.dateOfBirth,
        client1.religion,
        client1.nationality,
        client1.sex,
        client1.contactNumber,
        client1.UID,
        client1.PAN,
        client1.walletAddress
      );
    });

    it("should register a new client & verify it's details", async () => {
      const storedClient = await eVaultMain.getClientDetailsByUID(client1.UID);

      expect(storedClient.name).to.equal(client1.name);
      expect(storedClient.dateOfBirth).to.equal(client1.dateOfBirth);
      expect(storedClient.religion).to.equal(client1.religion);
      expect(storedClient.nationality).to.equal(client1.nationality);
      expect(storedClient.sex).to.equal(client1.sex);
      expect(storedClient.contactNumber).to.equal(client1.contactNumber);
      expect(storedClient.UID).to.equal(client1.UID);
      expect(storedClient.PAN).to.equal(client1.PAN);
      expect(storedClient.associatedCaseIds).to.eql(client1.associatedCaseIds);
      expect(storedClient.walletAddress.toLowerCase()).to.equal(
        client1.walletAddress.toLowerCase()
      );

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
  });

  describe("Lawyer Management", () => {
    beforeEach(async () => {
      await eVaultMain.registerLawyer(
        lawyer1.name,
        lawyer1.dateOfBirth,
        lawyer1.religion,
        lawyer1.nationality,
        lawyer1.sex,
        lawyer1.contactNumber,
        lawyer1.UID,
        lawyer1.PAN,
        lawyer1.walletAddress
      );
    });
    it("should register a new lawyer & verify it's details", async () => {
      const storedLawyer = await eVaultMain.getLawyerDetailsByUID(lawyer1.UID);

      expect(storedLawyer.name).to.equal(lawyer1.name);
      expect(storedLawyer.dateOfBirth).to.equal(lawyer1.dateOfBirth);
      expect(storedLawyer.religion).to.equal(lawyer1.religion);
      expect(storedLawyer.nationality).to.equal(lawyer1.nationality);
      expect(storedLawyer.sex).to.equal(lawyer1.sex);
      expect(storedLawyer.contactNumber).to.equal(lawyer1.contactNumber);
      expect(storedLawyer.UID).to.equal(lawyer1.UID);
      expect(storedLawyer.PAN).to.equal(lawyer1.PAN);
      expect(storedLawyer.associatedCaseIds).to.eql([]); // sinceArrayInitiallyInitializedTo0
      expect(storedLawyer.walletAddress.toLowerCase()).to.equal(
        lawyer1.walletAddress.toLowerCase()
      );

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

  describe("Judge Management", () => {
    beforeEach(async () => {
      await eVaultMain.registerJudge(
        judge1.name,
        judge1.dateOfBirth,
        judge1.religion,
        judge1.nationality,
        judge1.sex,
        judge1.contactNumber,
        judge1.UID,
        judge1.PAN,
        judge1.walletAddress
      );
    });

    it("should register a new judge & verify it's details", async () => {
      const storedJudge = await eVaultMain.getJudgeDetailsByUID(judge1.UID);

      expect(storedJudge.name).to.equal(judge1.name);
      expect(storedJudge.dateOfBirth).to.equal(judge1.dateOfBirth);
      expect(storedJudge.religion).to.equal(judge1.religion);
      expect(storedJudge.nationality).to.equal(judge1.nationality);
      expect(storedJudge.sex).to.equal(judge1.sex);
      expect(storedJudge.contactNumber).to.equal(judge1.contactNumber);
      expect(storedJudge.UID).to.equal(judge1.UID);
      expect(storedJudge.PAN).to.equal(judge1.PAN);
      expect(storedJudge.associatedCaseIds).to.eql(judge1.associatedCaseIds);
      expect(storedJudge.walletAddress.toLowerCase()).to.equal(
        judge1.walletAddress.toLowerCase()
      );

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

    // it("should retrieve the correct count of judges", async () => {
    //   const actualCount = await eVaultMain.getJudgesCount();
    //   const expectedCount = 1;

    //   expect(actualCount).to.equal(expectedCount);
    // });
  });

  describe("Legal Case Management", () => {
    beforeEach(async () => {
      // register2Clients
      // client1
      await eVaultMain.registerClient(
        client1.name,
        client1.dateOfBirth,
        client1.religion,
        client1.nationality,
        client1.sex,
        client1.contactNumber,
        client1.UID,
        client1.PAN,
        client1.walletAddress
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
        client2.PAN,
        client2.walletAddress
      );
      // lawyer1
      await eVaultMain.registerLawyer(
        lawyer1.name,
        lawyer1.dateOfBirth,
        lawyer1.religion,
        lawyer1.nationality,
        lawyer1.sex,
        lawyer1.contactNumber,
        lawyer1.UID,
        lawyer1.PAN,
        lawyer1.walletAddress
      );
      // judge1
      await eVaultMain.registerJudge(
        judge1.name,
        judge1.dateOfBirth,
        judge1.religion,
        judge1.nationality,
        judge1.sex,
        judge1.contactNumber,
        judge1.UID,
        judge1.PAN,
        judge1.walletAddress
      );
      // judge2
      await eVaultMain.registerJudge(
        judge2.name,
        judge2.dateOfBirth,
        judge2.religion,
        judge2.nationality,
        judge2.sex,
        judge2.contactNumber,
        judge2.UID,
        judge2.PAN,
        judge2.walletAddress
      );
      // judge3
      await eVaultMain.registerJudge(
        judge3.name,
        judge3.dateOfBirth,
        judge3.religion,
        judge3.nationality,
        judge3.sex,
        judge3.contactNumber,
        judge3.UID,
        judge3.PAN,
        judge3.walletAddress
      );
      // register2NewLegalCase
      // case1
      await eVaultMain.registerLegalCase(
        client1.UID,
        client2.UID,
        legalCase1.caseSubject,
        legalCase1.associatedLawyers
      );

      // updatingCaseProgess
      await eVaultMain
        .connect(user1)
        .updateCaseProgressWithCaseId(
          legalCase1.caseId,
          "Clients, Lawyers & Judge notified."
        );
    });

    it("should add a legal case between two clients & verify details", async () => {
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
        legalCase1.caseId
      );

      expect(storedLegalCase.UIDOfParty1).to.equal(client1.UID);
      expect(storedLegalCase.UIDOfParty2).to.equal(client2.UID);
      expect(storedLegalCase.caseSubject).to.equal(legalCase1.caseSubject);
      expect(storedLegalCase.caseProgress).to.eql([
        "Case registered with E-Vault.",
        "Clients, Lawyers & Judge notified.",
      ]);
      expect(storedLegalCase.caseProgressIssuer[1]).to.eql(user1.address);

      // BigNumber ---> Number
      const updatedTypeLawyers = storedLegalCase.associatedLawyers.map(
        (lawyer) => BigNumber.from(lawyer).toNumber()
      );

      expect(updatedTypeLawyers).to.eql(legalCase1.associatedLawyers);

      // console.log("Case progress :", storedLegalCase.caseProgress);
    });

    it("should update judge's [associatedCaseIds] array on registering a case", async () => {
      const storedLegalCase = await eVaultMain.getCaseDetailsByCaseId(
        legalCase1.caseId
      );

      const storedJudge = await eVaultMain.getJudgeDetailsByUID(
        storedLegalCase.associatedJudge
      );

      expect(storedJudge.associatedCaseIds.length).to.equal(1);
    });

    it("should retrieve filed legal cases for a client", async () => {
      // register2Clients
      // register2NewLegalCase
      // codeIn[beforeEach]block

      // Retrieve filed legal cases for the client
      const filedCases = await eVaultMain.getFiledLegalCasesForAClient(
        client1.UID
      );

      // console.log(
      //   `Case 1 >>> Case ID : ${filedCases[0].caseId}, Subject : ${filedCases[0].caseSubject}`
      // );
      // console.log(
      //   `Case 2 >>> Case ID : ${filedCases[1].caseId}, Subject : ${filedCases[1].caseSubject}`
      // );

      // since2CasesAreRegisteredUnder[Client 1 : "client"]
      expect(filedCases.length).to.equal(1);

      // // additionalChecks
      // expect(filedCases[0].UIDOfParty1).to.equal(client.UID);
      // expect(filedCases[0].UIDOfParty2).to.equal(client2.UID);
      // expect(filedCases[0].associatedJudge).to.equal(legalCase.associatedJudge);
      // expect(filedCases[0].caseSubject).to.equal(legalCase.caseSubject);
    });

    it("should retrieve filed legal cases for a lawyer", async () => {
      const filedCases = await eVaultMain.getFiledLegalCasesForALawyer(
        lawyer1.UID
      );

      expect(filedCases.length).to.equal(1);

      // // additionalChecks
      // expect(filedCases[0].UIDOfParty1).to.equal(client1.UID);
      // expect(filedCases[0].UIDOfParty2).to.equal(client2.UID);
      // expect(filedCases[0].associatedJudge).to.equal(
      //   legalCase1.associatedJudge
      // );
      // expect(filedCases[0].caseSubject).to.equal(legalCase1.caseSubject);
    });

    // it("should retrieve filed legal cases for a judge", async () => {
    //   const filedCases = await eVaultMain.getFiledLegalCasesForAJudge(
    //     judge1.UID
    //   );

    //   expect(filedCases.length).to.equal(2);

    //   // // additionalChecks
    //   // expect(filedCases[0].UIDOfParty1).to.equal(client.UID);
    //   // expect(filedCases[0].UIDOfParty2).to.equal(client2.UID);
    //   // expect(filedCases[0].associatedJudge).to.equal(legalCase.associatedJudge);
    //   // expect(filedCases[0].caseSubject).to.equal(legalCase.caseSubject);
    // });

    it("should update case documents with case ID", async () => {
      await eVaultMain
        .connect(user1)
        .updateCaseDocumentsWithCaseId(
          legalCase1.caseId,
          "111222333444555666777888999"
        );

      const storedLegalCase = await eVaultMain.getCaseDetailsByCaseId(
        legalCase1.caseId
      );

      expect(storedLegalCase.caseDocumentHash).to.eql([
        "111222333444555666777888999",
      ]);

      expect(storedLegalCase.caseDocumentUploader[0]).to.eql(user1.address);
    });

    it("should not update case documents for a non-existing case ID", async () => {
      const nonExistentCaseId = 999;

      await expect(
        eVaultMain.updateCaseDocumentsWithCaseId(
          nonExistentCaseId,
          "111222333444555666777888999"
        )
      ).to.be.revertedWith("Legal case with this caseId does not exist");
    });
  });

  // LoginFunctionalitiesTest

  describe("Login Functionalities", () => {
    // clientLogin
    it("should login as a client", async () => {
      // Register a new client
      await eVaultMain.registerClient(
        client1.name,
        client1.dateOfBirth,
        client1.religion,
        client1.nationality,
        client1.sex,
        client1.contactNumber,
        client1.UID,
        client1.PAN,
        client1.walletAddress
      );

      // Check if the client is registered by calling the loginAsAClient function
      const isClientRegistered = await eVaultMain.loginAsAClient(client1.UID);

      // Assert that the client is registered (should return true)
      expect(isClientRegistered).to.equal(true);
    });

    // lawyerLogin
    it("should login as a lawyer", async () => {
      // Register a new lawyer
      await eVaultMain.registerLawyer(
        lawyer1.name,
        lawyer1.dateOfBirth,
        lawyer1.religion,
        lawyer1.nationality,
        lawyer1.sex,
        lawyer1.contactNumber,
        lawyer1.UID,
        lawyer1.PAN,
        lawyer1.walletAddress
      );

      // Check if the client is registered by calling the loginAsAClient function
      const isLawyerRegistered = await eVaultMain.loginAsALawyer(lawyer1.UID);

      // Assert that the client is registered (should return true)
      expect(isLawyerRegistered).to.equal(true);
    });

    // judgeLogin
    it("should login as a judge", async () => {
      // Register a new judge
      await eVaultMain.registerJudge(
        judge1.name,
        judge1.dateOfBirth,
        judge1.religion,
        judge1.nationality,
        judge1.sex,
        judge1.contactNumber,
        judge1.UID,
        judge1.PAN,
        judge1.walletAddress
      );

      // Check if the client is registered by calling the loginAsAClient function
      const isJudgeRegistered = await eVaultMain.loginAsAJudge(judge1.UID);

      // Assert that the client is registered (should return true)
      expect(isJudgeRegistered).to.equal(true);
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
