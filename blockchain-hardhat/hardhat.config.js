require("@nomiclabs/hardhat-waffle");

require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();
// require("solidity-coverage");

// https://www.npmjs.com/package/hardhat-gas-reporter
require("hardhat-gas-reporter");

// importingCustomDefinedTasks
require("./tasks/block-number");

const SEPOLIA_ALCHEMY_RPC_URL = process.env.SEPOLIA_ALCHEMY_RPC_URL;
const METAMASK_PRIVATE_KEY = process.env.METAMASK_PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY
  ? process.env.COINMARKETCAP_API_KEY
  : null;

const AMOY_ALCHEMY_RPC_URL = process.env.AMOY_ALCHEMY_RPC_URL;
const MORPH_TESTNET_RPC_URL = process.env.MORPH_TESTNET_RPC_URL;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.10",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  defaultNetwork: "hardhat",
  allowUnlimitedContractSize: true,
  networks: {
    // default
    hardhat: {},

    // https://polygon.technology/blog/introducing-the-amoy-testnet-for-polygon-pos
    amoy: {
      url: AMOY_ALCHEMY_RPC_URL,
      accounts: [METAMASK_PRIVATE_KEY],
      chainId: 80002,
    },

    // https://docs.morphl2.io/docs/build-on-morph/build-on-morph/development-setup
    morph: {
      url: process.env.MORPH_TESTNET_RPC_URL,
      accounts: [METAMASK_PRIVATE_KEY],
      chainId: 2710,
    },

    sepolia: {
      url: SEPOLIA_ALCHEMY_RPC_URL,
      accounts: [METAMASK_PRIVATE_KEY],
      chainId: 11155111,
    },

    // forHardhatLocalRuntimeEnvironment(Node)
    localhost: {
      url: "http://127.0.0.1:8545/",
      chainId: 31337,
      gas: 2100000,
      gasPrice: 8000000000,
    },
  },
  etherscan: {
    apiKey: {
      sepolia: ETHERSCAN_API_KEY,
      morph: ETHERSCAN_API_KEY,
    },
    customChains: [
      {
        network: "morph",
        chainId: 2710,
        urls: {
          apiURL: "https://explorer-api-testnet.morphl2.io/api",
          browserURL: "https://explorer-testnet.morphl2.io",
        },
      },
    ],
  },

  gasReporter: {
    // -> toggleAccordingToNeedToKnowGasConsumptionOfContract
    enabled: process.env.REPORT_GAS_USAGE == "false" ? false : true,

    noColors: true,

    // -> currencyYouWantTheEstimationsIn(COINMARKETCAP)
    currency: "INR",

    // -> TOKENYouWantTheEstimationsIn(ETH ByDefault)
    token: "ETH",

    // -> ifYouWantOutputInASeparateFile
    // outputFile: "gas-report.txt",

    // -> APICallForFetchingCurrentPrice
    coinmarketcap: COINMARKETCAP_API_KEY,
  },
};
