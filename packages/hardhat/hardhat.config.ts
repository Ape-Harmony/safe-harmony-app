import * as dotenv from "dotenv";
dotenv.config();
import { HardhatUserConfig, task, types } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";
import { YourContract } from "./typechain-types";

// If not set, it uses ours Alchemy's default API key.
// You can get your own at https://dashboard.alchemyapi.io
const providerApiKey = process.env.ALCHEMY_API_KEY || "oKxs-03sij-U_N0iOlrSsZFr29-IqbuF";
// If not set, it uses the hardhat account 0 private key.
const deployerPrivateKey =
  process.env.DEPLOYER_PRIVATE_KEY ?? "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
// If not set, it uses ours Etherscan default API key.
const etherscanApiKey = process.env.ETHERSCAN_API_KEY || "DNXJA8RX2Q3VZ4URQIWP7Z68CJXQZSC6AW";

const config: HardhatUserConfig = {
  defaultNetwork: "goerli",
  namedAccounts: {
    deployer: {
      // By default, it will take the first Hardhat account as the deployer
      default: 0,
    },
  },
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  networks: {
    // View the networks that are pre-configured.
    // If the network you are looking for is not here you can add new network settings
    hardhat: {
      forking: {
        url: `https://eth-mainnet.alchemyapi.io/v2/${providerApiKey}`,
        enabled: process.env.MAINNET_FORKING_ENABLED === "true",
      },
    },
    // mainnet: {
    //   url: `https://eth-mainnet.alchemyapi.io/v2/${providerApiKey}`,
    //   accounts: [deployerPrivateKey],
    // },
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${providerApiKey}`,
      accounts: [deployerPrivateKey],
    },
    // arbitrum: {
    //   url: `https://arb-mainnet.g.alchemy.com/v2/${providerApiKey}`,
    //   accounts: [deployerPrivateKey],
    // },
    // arbitrumGoerli: {
    //   url: `https://arb-goerli.g.alchemy.com/v2/${providerApiKey}`,
    //   accounts: [deployerPrivateKey],
    // },
    // optimism: {
    //   url: `https://opt-mainnet.g.alchemy.com/v2/${providerApiKey}`,
    //   accounts: [deployerPrivateKey],
    // },
    // optimismGoerli: {
    //   url: `https://opt-goerli.g.alchemy.com/v2/${providerApiKey}`,
    //   accounts: [deployerPrivateKey],
    // },
    // polygon: {
    //   url: `https://polygon-mainnet.g.alchemy.com/v2/${providerApiKey}`,
    //   accounts: [deployerPrivateKey],
    // },
    polygonMumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${providerApiKey}`,
      accounts: [deployerPrivateKey],
    },
    metisGoerli: {
      url: `https://goerli.gateway.metisdevops.link/${providerApiKey}`,
      accounts: [deployerPrivateKey],
    },
    scroll: {
      url: `https://alpha-rpc.scroll.io/l2`,
      accounts: [deployerPrivateKey],
    },
  },
  verify: {
    etherscan: {
      apiKey: `${etherscanApiKey}`,
    },
  },
};

task("flat", "Flattens and prints contracts and their dependencies (Resolves licenses)")
  .addOptionalVariadicPositionalParam("files", "The files to flatten", undefined, types.inputFile)
  .setAction(async ({ files }, hre) => {
    let flattened = await hre.run("flatten:get-flattened-sources", { files });

    // Remove every line started with "// SPDX-License-Identifier:"
    flattened = flattened.replace(/SPDX-License-Identifier:/gm, "License-Identifier:");
    flattened = `// SPDX-License-Identifier: MIXED\n\n${flattened}`;

    // Remove every line started with "pragma experimental ABIEncoderV2;" except the first one
    flattened = flattened.replace(
      /pragma experimental ABIEncoderV2;\n/gm,
      (
        i => (m: unknown) =>
          !i++ ? m : ""
      )(0),
    );
    console.log(flattened);
  });

task(
  "grantRole",
  "Add account to deployed contracts's role",
  async (
    taskArgs: {
      addr: string;
      account: string;
      name: string;
      role: string;
    },
    hre,
  ) => {
    console.log(taskArgs);
    const myContract = await hre.ethers.getContractAt<YourContract>(taskArgs.name, taskArgs.addr);

    const hasRole = await myContract.hasRole(taskArgs.role, taskArgs.account);
    console.log("hasRole", hasRole);

    if (!hasRole) {
      const result = await myContract.grantRole(taskArgs.role, taskArgs.account);
      console.log("grantRole", result.hash);
    }
  },
)
  .addParam("addr", "Contract addr")
  .addParam("name", "Contract name", "YourContract")
  .addParam("role", "Role id", "0x0000000000000000000000000000000000000000000000000000000000000000")
  .addParam("account", "Grantee addr");

export default config;
