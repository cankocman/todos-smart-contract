import { useState, useEffect } from "react";
import "./App.css";
import { abi, contractAddress } from "./utils/constants";
import { ethers } from "./ethers";

/**
 @typedef {{id:String,name:String,todos:[String, Boolean][]}} TodoList
 */

function listenForTransactionMine(transactionResponse, provider) {
  console.log(`Mining ${transactionResponse.hash}`);
  return new Promise((resolve, reject) => {
    try {
      provider.once(transactionResponse.hash, transactionReceipt => {
        console.log(`Completed with ${transactionReceipt.confirmations} confirmations. `);
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
}

function App() {
  const [ethereumExists, setEthereumExists] = useState(null);
  const [loaded, setLoaded] = useState(true);
  /**
   * @type [TodoList[], import("react").Dispatch<React.SetStateAction<TodoList[]>>]
   */
  const [lists, setLists] = useState([]);
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  /**
   * @type [TodoList,import("react").Dispatch<React.SetStateAction<TodoList>>]
   */
  const [todoForm, setTodoForm] = useState({ name: "", todos: [] });

  useEffect(() => {
    (async () => {
      if (window.ethereum === "undefined") {
        setEthereumExists(false);

        return;
      }
      try {
        await ethereum.request({ method: "eth_requestAccounts" });
        // setAccount(await ethereum.request({ method: "eth_accounts" }));
      } catch (error) {
        setEthereumExists(false);
      }
      setEthereumExists(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, abi, provider.getSigner());
      setProvider(provider);
      setContract(contract);
      // await loadLists();
    })();
  });

  function onTodoFormChange(x) {
    setTodoForm({ ...todoForm, [x.target.name]: x.target.value });
  }

  function setTodo(x, i) {
    const todos = todoForm.todos;
    todos[i] = x.target.value;
    setTodoForm({ ...todoForm, todos: todos });
  }

  async function loadLists() {
    const x = await contract.getTodoLists();
    setLists(x.map(({ id, name, todos }) => ({ id, name, todos })));
  }

  function updateTodoList(id, atIndex, content, status) {
    const listIndex = lists.findIndex(x => x.id == id);
    const todos = lists[listIndex].todos;
    console.log(status, content, todos);
    const _todos = [...todos.slice(0, atIndex), [content, status], ...todos.slice(atIndex + 1, todos.length)];
    const _lists = lists;
    _lists[listIndex] = { ...lists[listIndex], todos: _todos };
    setLists(_lists);
  }

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
      <button onClick={loadLists}>Fetch</button>

      {lists &&
        lists.map(({ name, todos, id }, i) => (
          <div key={name + i}>
            <h3>{name}</h3>
            <ul style={{ listStyle: "none" }}>
              {todos.map(([todo, status], j) => (
                <li
                  key={todo + j}
                  className="todoItem"
                  onClick={() => updateTodoList(id, j, todo, status === "true" ? "false" : "true")}>
                  <span>{status === "true" ? "🟢" : "🔘"}</span> {todo}
                </li>
              ))}
            </ul>
          </div>
        ))}

      <div className="todoForm">
        <h3>Create Todo List</h3>
        <label htmlFor="input">name: </label>
        <input type="text" name="name" onChange={onTodoFormChange} value={todoForm["name"]} />
        <br />
        <label htmlFor="input">todos: </label>
        <ol>
          {todoForm.todos &&
            todoForm.todos.map((todo, i) => (
              <li key={i}>
                <input type="text" name={"todo-" + i} onChange={x => setTodo(x, i)} value={todoForm.todos[i]} />
                <br />
              </li>
            ))}
          <li>
            <button onClick={() => setTodoForm({ ...todoForm, todos: [...todoForm.todos, ""] })}>+</button>
          </li>
        </ol>
        <button
          disabled={!todoForm.name}
          onClick={async () => {
            const tx = await contract.createToDoList(todoForm.name, todoForm.todos);
            await listenForTransactionMine(tx, provider);
            await loadLists();
            setTodoForm({ name: "", todos: [] });
          }}>
          Create Todo List
        </button>
      </div>
    </div>
  );
}

export default App;
