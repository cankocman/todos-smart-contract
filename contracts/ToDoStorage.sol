// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

contract ToDoStorage {
    struct ToDoList {
        uint256 id;
        string name;
        string[] todos;
    }

    mapping(address => mapping(uint256 => ToDoList)) public addressToList;
    uint256 private _nonce = 0;

    function createToDoList(string memory name, string[] memory todos) public {
        uint256 id = createId();
        addressToList[msg.sender][id] = ToDoList(id, name, todos);
    }

    function createTodo(uint256 todoListId, string memory content) public {
        addressToList[msg.sender][todoListId].todos.push(content);
    }

    function retrieve(uint256 id) public view returns (string[] memory) {
        return addressToList[msg.sender][id].todos;
    }

    // function getToDoLists() public view returns (mapping(uint256 => ToDoList) meory) {
    //     return addressToList[msg.sender];
    // }

    function createId() private returns (uint256) {
        _nonce++;
        return _nonce;
    }

    constructor() {}
}
