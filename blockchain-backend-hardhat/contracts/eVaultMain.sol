// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract eVaultMain {
    address public contractOwner;
    string public contractName;

    // forStoringNumberOfCasesFiled&Indexing
    uint256 public caseIdCounter = 1;

    struct LegalCase {
        uint256 UIDOfParty1;
        uint256 UIDOfParty2;
        uint256 filedOnDate;
        address[] associatedLawyers;
        string associatedJudge;
        uint256 caseId;
        string caseSubject;
    }

    struct Client {
        string name;
        string dateOfBirth;
        string religion;
        string nationality;
        string sex;
        string contactNumber;
        uint256 UID;
        string PAN;
        address[] associatedLawyers;
        uint256[] associatedCaseIds;
        address walletAddress;
    }

    struct Lawyer {
        string name;
        address walletAddress;
        string dateOfBirth;
        string religion;
        string nationality;
        string sex;
        string contactNumber;
        uint256 UID;
        string PAN;
        uint256[] associatedCaseIds;
    }

    // storeAllTheClients
    mapping(uint256 => Client) public clients;

    // storeAlltheLegalCasesFiledInTheCourt
    mapping(uint256 => LegalCase) public legalCases;

    // Create a mapping to store lawyers
    mapping(uint256 => Lawyer) public lawyers;

    event ClientRegistered(uint256 UID);
    event CaseRegistered(uint256 caseId);
    event LawyerRegistered(uint256 UID);

    constructor() {
        contractName = "eVaultMain";
        contractOwner = msg.sender;
    }

    modifier onlyOwner() {
        require(
            msg.sender == contractOwner,
            "Only the owner can call this function"
        );
        _;
    }

    // functionToRegisterANewClient
    function registerClient(
        string memory _name,
        string memory _dateOfBirth,
        string memory _religion,
        string memory _nationality,
        string memory _sex,
        string memory _contactNumber,
        uint256 _UID,
        string memory _PAN
    ) external onlyOwner {
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(
            bytes(_dateOfBirth).length > 0,
            "Date of Birth cannot be empty"
        );
        require(bytes(_religion).length > 0, "Religion cannot be empty");
        require(bytes(_nationality).length > 0, "Nationality cannot be empty");
        require(bytes(_sex).length > 0, "Sex cannot be empty");
        require(
            bytes(_contactNumber).length > 0,
            "Contact Number cannot be empty"
        );
        require(_UID > 0 && _UID <= 999999999999, "Invalid UID");

        address[] memory lawyers = new address[](0);
        uint256[] memory caseIds = new uint256[](0); // Initialize the associatedCaseIds array

        clients[_UID] = Client({
            name: _name,
            dateOfBirth: _dateOfBirth,
            religion: _religion,
            nationality: _nationality,
            sex: _sex,
            contactNumber: _contactNumber,
            UID: _UID,
            PAN: _PAN,
            associatedLawyers: lawyers,
            associatedCaseIds: caseIds,
            walletAddress: msg.sender
        });

        emit ClientRegistered(_UID);
    }

    // functionToViewClientInformation
    function getClientDetailsByUID(
        uint256 _UID
    )
        external
        view
        returns (
            string memory name,
            string memory dateOfBirth,
            string memory religion,
            string memory nationality,
            string memory sex,
            string memory contactNumber,
            uint256 UID,
            string memory PAN,
            address[] memory associatedLawyers,
            uint256[] memory associatedCaseIds,
            address walletAddress
        )
    {
        Client memory client = clients[_UID];
        require(
            bytes(client.name).length > 0,
            "Client with this UID does not exist"
        );

        return (
            client.name,
            client.dateOfBirth,
            client.religion,
            client.nationality,
            client.sex,
            client.contactNumber,
            client.UID,
            client.PAN,
            client.associatedLawyers,
            client.associatedCaseIds,
            client.walletAddress
        );
    }

    // Add a function to update the associated lawyers
    function updateAssociatedLawyers(
        uint256 _UID,
        address[] memory _newLawyers
    ) external onlyOwner {
        require(
            _newLawyers.length > 0,
            "The array of associated lawyers cannot be empty"
        );
        Client storage client = clients[_UID];
        require(
            bytes(client.name).length > 0,
            "Client with this UID does not exist"
        );

        client.associatedLawyers = _newLawyers;
    }

    // Function to register a new lawyer
    function registerLawyer(
        string memory _name,
        string memory _dateOfBirth,
        string memory _religion,
        string memory _nationality,
        string memory _sex,
        string memory _contactNumber,
        uint256 _UID,
        string memory _PAN
    ) external onlyOwner {
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(
            bytes(_dateOfBirth).length > 0,
            "Date of Birth cannot be empty"
        );
        require(bytes(_religion).length > 0, "Religion cannot be empty");
        require(bytes(_nationality).length > 0, "Nationality cannot be empty");
        require(bytes(_sex).length > 0, "Sex cannot be empty");
        require(
            bytes(_contactNumber).length > 0,
            "Contact Number cannot be empty"
        );
        require(_UID > 0 && _UID <= 999999999999, "Invalid UID");

        uint256[] memory caseIds = new uint256[](0); // Initialize the associatedCaseIds array

        lawyers[_UID] = Lawyer({
            name: _name,
            walletAddress: msg.sender,
            dateOfBirth: _dateOfBirth,
            religion: _religion,
            nationality: _nationality,
            sex: _sex,
            contactNumber: _contactNumber,
            UID: _UID,
            PAN: _PAN,
            associatedCaseIds: caseIds // Initialize the associatedCaseIds array
        });

        emit LawyerRegistered(_UID);
    }

    // Function to get lawyer details by UID
    function getLawyerDetailsByUID(
        uint256 _UID
    ) external view returns (Lawyer memory) {
        Lawyer memory lawyer = lawyers[_UID];
        require(
            bytes(lawyer.name).length > 0,
            "Lawyer with this UID does not exist"
        );

        return lawyer;
    }

    // function to add a legal case for two clients
    function registerLegalCase(
        uint256 _UIDOfParty1,
        uint256 _UIDOfParty2,
        string memory _associatedJudge,
        string memory _caseSubject,
        address[] memory _associatedLawyers
    ) external onlyOwner {
        Client storage client1 = clients[_UIDOfParty1];
        Client storage client2 = clients[_UIDOfParty2];

        require(
            bytes(client1.name).length > 0 && bytes(client2.name).length > 0,
            "Both clients must exist"
        );

        // Increment the caseIdCounter and use it as the caseId
        uint256 _caseId = caseIdCounter;

        legalCases[_caseId] = LegalCase({
            UIDOfParty1: _UIDOfParty1,
            UIDOfParty2: _UIDOfParty2,
            filedOnDate: block.timestamp,
            associatedLawyers: _associatedLawyers,
            associatedJudge: _associatedJudge,
            caseId: _caseId,
            caseSubject: _caseSubject
        });

        // Add the legal case to the clients' associatedCaseIds
        client1.associatedCaseIds.push(_caseId);
        client2.associatedCaseIds.push(_caseId);

        caseIdCounter++;

        emit CaseRegistered(_caseId);
    }

    // function to get the filed legal cases for a client
    function getFiledLegalCasesForAClient(
        uint256 _UID
    ) external view returns (LegalCase[] memory) {
        Client memory client = clients[_UID];
        require(
            bytes(client.name).length > 0,
            "Client with this UID does not exist"
        );

        uint256[] memory caseIds = client.associatedCaseIds;
        // makingAnArrayOfStructObjects
        LegalCase[] memory filedCases = new LegalCase[](caseIds.length);

        for (uint256 i = 0; i < caseIds.length; i++) {
            filedCases[i] = legalCases[caseIds[i]];
        }

        return filedCases;
    }

    // function to view details of a legal case by caseId
    function getCaseDetailsByCaseId(
        uint256 _caseId
    )
        external
        view
        returns (
            uint256 UIDOfParty1,
            uint256 UIDOfParty2,
            uint256 filedOnDate,
            address[] memory associatedLawyers,
            string memory associatedJudge,
            uint256 caseId,
            string memory caseSubject
        )
    {
        LegalCase memory registeredLegalCase = legalCases[_caseId];
        require(
            bytes(registeredLegalCase.associatedJudge).length > 0,
            "Legal case with this caseId does not exist"
        );

        return (
            registeredLegalCase.UIDOfParty1,
            registeredLegalCase.UIDOfParty2,
            registeredLegalCase.filedOnDate,
            registeredLegalCase.associatedLawyers,
            registeredLegalCase.associatedJudge,
            registeredLegalCase.caseId,
            registeredLegalCase.caseSubject
        );
    }
}
