export const contractAddress = "0x4A47317bCC2fAb9a36494fc2BeA908877c88368A";
export const abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "addressToList",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string[]",
        name: "contents",
        type: "string[]",
      },
    ],
    name: "createToDoList",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "todoListId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "content",
        type: "string",
      },
    ],
    name: "createTodo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "findToDoListIndex",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTodoLists",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string[2][]",
            name: "todos",
            type: "string[2][]",
          },
        ],
        internalType: "struct ToDoStorage.ToDoList[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "todoListId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "todoItemId",
        type: "uint256",
      },
    ],
    name: "removeTodo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "todoListId",
        type: "uint256",
      },
    ],
    name: "removeTodoList",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "todoListId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "todoItemId",
        type: "uint256",
      },
      {
        internalType: "string[2]",
        name: "todo",
        type: "string[2]",
      },
    ],
    name: "updateTodo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
