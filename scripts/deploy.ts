import { ethers } from "hardhat";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { TokenDispenser, DustMatter, MatterDAO, TimelockController } from "../typechain-types";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy TokenDispenser
  const TokenDispenser = await ethers.getContractFactory("TokenDispenser");
  const tokenDispenser = await TokenDispenser.deploy();
  await tokenDispenser.waitForDeployment();
  console.log("TokenDispenser deployed to:", await tokenDispenser.getAddress());

  // Deploy DustMatter NFT
  const DustMatter = await ethers.getContractFactory("DustMatter");
  const dustMatter = await DustMatter.deploy("ipfs://QmYourBaseURI/");
  await dustMatter.waitForDeployment();
  console.log("DustMatter deployed to:", await dustMatter.getAddress());

  // Deploy TimelockController
  const minDelay = 2 * 24 * 60 * 60; // 2 days
  const TimelockController = await ethers.getContractFactory("TimelockController");
  const timelock = await TimelockController.deploy(
    minDelay,
    [], // proposers
    [], // executors
    deployer.address // admin
  );
  await timelock.waitForDeployment();
  console.log("TimelockController deployed to:", await timelock.getAddress());

  // Deploy MatterDAO
  const MatterDAO = await ethers.getContractFactory("MatterDAO");
  const matterDAO = await MatterDAO.deploy(
    await tokenDispenser.getAddress(),
    await dustMatter.getAddress(),
    await timelock.getAddress()
  );
  await matterDAO.waitForDeployment();
  console.log("MatterDAO deployed to:", await matterDAO.getAddress());

  // Setup roles
  const PROPOSER_ROLE = await timelock.PROPOSER_ROLE();
  const EXECUTOR_ROLE = await timelock.EXECUTOR_ROLE();
  const CANCELLER_ROLE = await timelock.CANCELLER_ROLE();

  await timelock.grantRole(PROPOSER_ROLE, await matterDAO.getAddress());
  await timelock.grantRole(EXECUTOR_ROLE, ethers.ZeroAddress);
  await timelock.grantRole(CANCELLER_ROLE, await matterDAO.getAddress());

  console.log("Setup complete! Contract addresses:");
  console.log("TokenDispenser:", await tokenDispenser.getAddress());
  console.log("DustMatter:", await dustMatter.getAddress());
  console.log("TimelockController:", await timelock.getAddress());
  console.log("MatterDAO:", await matterDAO.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 