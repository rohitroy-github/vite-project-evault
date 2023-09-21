require("@nomiclabs/hardhat-waffle");

require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();
require("solidity-coverage");

// https://www.npmjs.com/package/hardhat-gas-reporter
require("hardhat-gas-reporter");

// importingCustomDefinedTasks
require("./tasks/block-number");

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more
/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const SEPOLIA_ALCHEMY_RPC_URL = process.env.SEPOLIA_ALCHEMY_RPC_URL;
const METAMASK_PRIVATE_KEY = process.env.METAMASK_PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  defaultNetwork: "hardhat",
  networks: {
    // default
    hardhat: {},

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
    apiKey: ETHERSCAN_API_KEY,
  },

  gasReporter: {
    // -> toggleAccordingToNeedToKnowGasConsumptionOfContract
    enabled: true,
    noColors: true,

    // -> currencyYouWantTheEstimationsIn(COINMARKETCAP)
    // currency: "USD",
    currency: "INR",

    // -> TOKENYouWantTheEstimationsIn(ETH ByDefault)
    // token: "MATIC",

    // -> ifYouWantOutputInASeparateFile
    // outputFile: "gas-report.txt",

    // -> APICallForFetchingCurrentPrice
    coinmarketcap: COINMARKETCAP_API_KEY,
  },
};
