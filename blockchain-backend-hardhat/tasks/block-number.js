// FILE -> Writing/DefiningHardhatTasks

const {task} = require("hardhat/config");

task("block-number", "Prints the current block number").setAction(
  // const blockTask = async function() => {}
  // async function blockTask() {}
  async (taskArgs, hre) => {
    const blockNumber = await hre.ethers.provider.getBlockNumber();
    console.log(`Current block number: ${blockNumber}`);
  }
);

module.exports = {};

// https://hardhat.org/hardhat-runner/docs/advanced/create-task

// ToExecute -> npx hardhat <task-name> (Example -> npx hardhat block-number)
