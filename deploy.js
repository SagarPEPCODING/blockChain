// deploy code will go here
const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");
const provider = new HDWalletProvider(
  "energy theory echo grant half skill trust income elbow make cruise nerve",
  "https://rinkeby.infura.io/v3/1123fd32113f4fbab90bbae3c72eb383"
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ["Hi there!"] })
    .send({ gasPrice: '100', from: accounts[0] })
    .catch((error) => {
      console.log(error);
    });

  console.log("Contract deployed to", result.options.address);
  provider.engine.stop();
};
deploy();
