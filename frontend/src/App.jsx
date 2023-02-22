import { useState, useEffect } from "react";
import "./App.css";
import { abi, contractAddress } from "./utils/constants";
import { ethers } from "./ethers";

function App() {
  const [ethereumExists, setEthereumExists] = useState(null);
  const [loaded, setLoaded] = useState(true);
  const [lists, setLists] = useState([]);
  const [web3, setWeb3] = useState({ provider: null, signer: null, contract: null });
  // const [account, setAccount] = useState(null);

  useEffect(() => {
    (async () => {
      setEthereumExists(window.ethereum !== "undefined");
      try {
        await ethereum.request({ method: "eth_requestAccounts" });
        // setAccount(await ethereum.request({ method: "eth_accounts" }));
      } catch (error) {
        setEthereumExists(false);
      }
    })();
  });

  useEffect(() => {
    (async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi);
        console.log(contract);
        // setWeb3({ provider, signer, contract });
        // console.log(contract);
        setLoaded(true);
      } catch (error) {
        console.log(error);
        setLoaded(false);
      }
    })();
  });

  // useEffect(() => {
  //   if (web3.contract != null) {
  //     (async () => {
  //       console.log(contract);
  //       setLists(await contract.getTodoLists());
  //     })();
  //   }
  // }, [web3]);

  if (ethereumExists == null || !loaded) {
    return (
      <div className="App">
        <p>Loading...</p>
      </div>
    );
  }

  if (!ethereumExists) {
    return (
      <div className="App">
        <p>Install Metamask extension and reload the page!</p>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Todo List</h1>
    </div>
  );
}

export default App;
