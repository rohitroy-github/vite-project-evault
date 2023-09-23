import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {ethers} from "ethers";
import {Link} from "react-router-dom";
import getCaseDetailsByCaseID from "../blockchain-api/getCaseDetailsByCaseID";

const SearchCaseDetailsComponent = () => {
  const [caseID, setCaseID] = useState("");

  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);

  const navigate = useNavigate();

  const connectToBlockchain = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    const account = ethers.utils.getAddress(accounts[0]);
    setAccount(account);

    // updateAccountOfRefreshing/AlteringAccounts
    window.ethereum.on("accountsChanged", async () => {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const account = ethers.utils.getAddress(accounts[0]);
      setAccount(account);
    });

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);

    const connectedNetwork = await provider.getNetwork();

    const eVaultContract = new ethers.Contract(
      config[connectedNetwork.chainId].contract.address,
      eVaultMain,
      provider.getSigner()
    );

    setEVaultContract(eVaultContract);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!caseID) {
      alert("Please fill in all the required fields.");
      return;
    }

    // Add your logic for searching for case details here
    // You can use the 'caseID' and 'walletAddress' in your request
    // For now, let's assume a successful search
    alert("Case details found!");
  };

  useEffect(() => {
    connectToBlockchain();
  }, []);

  return (
    <div className="flex items-start justify-center min-h-screen">
      <div className="bg-white p-8 font-montserrat w-2/3">
        <h1 className="text-3xl font-montserrat mb-2 text-center">
          Search for case details ?
        </h1>
        <p className="text-gray-600 text-center mb-4">
          Only associated clients, lawyers, and judges of the case can access
          the relevant case details and information!
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              className="border rounded-lg py-2 px-4 w-full"
              placeholder="Please enter the case ID"
              value={caseID}
              onChange={(e) => setCaseID(e.target.value)}
            />
          </div>
          <div className="text-center mt-4 w-full">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg w-1/2"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchCaseDetailsComponent;
