// contract test code will go here
const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require("../compile");

// mocha is testing framework, which is used to test frontend code, backend code or ethereum code as well so it is a general purpose testing framework

// ************* 1st Testing **************
// class Car {
//   park() {
//     return "stopped";
//   }
//   drive() {
//     return "vroom";
//   }
// }

// let car;
// beforeEach(() => {
//   car = new Car();
// });

// describe("Car", () => {
//   it("can park", () => {
//     assert.equal(car.park(), "stopped");
//   });
//   it("can run", () => {
//     assert.equal(car.drive(), "vroom");
//   });
// });

// Video-49 **************
// beforeEach(() => {
//   web3.eth.getAccounts().then((fetchedAccounts) => {
//     console.log(fetchedAccounts);
//   });
// });

// describe("Inbox", () => {
//   it("deploys a contract", () => {});
// });
// *********************

// video-50 **********
let accounts;
let inbox;
beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  //use one of those accounts to deploy the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: ["hi there!"],
    })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Inbox", () => {
  it("deploys a contract", () => {
    // console.log(accounts);
    // console.log(inbox);
    assert.ok(inbox.options.address);
  });
  it("has a default message", async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, "hi there!");
  });
  it("it can change message", async () => {
    await inbox.methods.setMessage("hello sir").send({ from: accounts[0] });
    const message = await inbox.methods.message().call();
    assert.equal(message, "hello sir");
  });
});
