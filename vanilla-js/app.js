import { ethers } from "./ethers-5.6.esm.min.js";
import { abi, contractAddress } from "./utils/constants.js";

async function main() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, abi, signer);
  console.log(contract);
  const items = await contract.getTodoLists();
  console.log(items);
  let arrayOfItems;
  arrayOfItems = [];
  for (let i = 0; i < items[0].todos.length; i++) {
    arrayOfItems.push(items[0].todos[i][0]);
    console.log(arrayOfItems);
  }
  console.log(arrayOfItems);
  document.getElementById("list").innerHTML = arrayOfItems;
}
main();
