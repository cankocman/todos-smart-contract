require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const RPC_URL = process.env.GOERLI_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.8",
  defaultNetwork: "goerli",
  networks: {
    localhost: { url: "http://127.0.0.1:8545/", chainId: 31337 },
    goerli: {
      url: RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 5,
      blockConfirmations: 3,
    },
  },
};
