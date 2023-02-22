const { ethers, run, network } = require("hardhat");
require("dotenv").config;

async function main() {
  const ToDoStorageFactory = await ethers.getContractFactory("ToDoStorage");
  console.log("Deploying...");
  const todoStorage = await ToDoStorageFactory.deploy();
  await todoStorage.deployed();

  const setToDoList = await todoStorage.createToDoList("Başarmak için atılcak adımlar!", [
    "Yola çık!",
    "Yumurta al!",
    "Salça al!",
    "Tekirdağ'a git!",
    "Köfteni ye!",
    "Dön.",
  ]);
  await setToDoList.wait(1);

  const lists = await todoStorage.getTodoLists();
  console.log(lists);
  console.log(todoStorage.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
