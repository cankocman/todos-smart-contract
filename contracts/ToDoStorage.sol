// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

contract ToDoStorage {
    struct ToDoList {
        uint256 id;
        string name;
        string[2][] todos;
    }

    mapping(address => ToDoList[]) public addressToList;
    uint256 private _nonce = 0;

    function createToDoList(
        string memory name,
        string[] memory contents
    ) public {
        uint256 id = createId();
        string[2][] memory todos = new string[2][](contents.length);
        for (uint256 i = 0; i < contents.length; i++) {
            todos[i] = [contents[i], "false"];
        }
        addressToList[msg.sender].push(ToDoList(id, name, todos));
    }

    function createTodo(uint256 todoListId, string memory content) public {
        (bool found, uint256 todoListIndex) = findToDoListIndex(todoListId);
        if (!found) return;
        addressToList[msg.sender][todoListIndex].todos.push([content, "false"]);
    }

    function updateTodo(
        uint todoListId,
        uint256 todoItemId,
        string[2] memory todo
    ) public {
        (bool found, uint256 todoListIndex) = findToDoListIndex(todoListId);
        if (!found) return;
        addressToList[msg.sender][todoListIndex].todos[todoItemId] = todo;
    }

    function retrieve(uint256 id) public view returns (string[2][] memory) {
        (bool found, uint256 todoListIndex) = findToDoListIndex(id);
        if (!found) return new string[2][](0);

        return addressToList[msg.sender][todoListIndex].todos;
    }

    function removeTodo(uint todoListId, uint256 todoItemId) public {
        (bool found, uint256 todoListIndex) = findToDoListIndex(todoListId);
        if (!found) return;
        delete addressToList[msg.sender][todoListIndex].todos[todoItemId];
    }

    function removeTodoList(uint todoListId) public {
        (bool found, uint256 todoListIndex) = findToDoListIndex(todoListId);
        if (!found) return;
        delete addressToList[msg.sender][todoListIndex];
    }

    function findToDoListIndex(uint256 id) public view returns (bool, uint256) {
        for (uint256 i = 0; i < addressToList[msg.sender].length; i++) {
            if (addressToList[msg.sender][i].id == id) {
                return (true, i);
            }
        }
        return (false, 0);
    }

    function createId() private returns (uint256) {
        _nonce++;
        return _nonce;
    }

    constructor() {}
}
