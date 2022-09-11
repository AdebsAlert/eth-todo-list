pragma solidity ^0.5.0;

contract TodoList {
    uint public taskCount = 0;

    struct Todo {
        uint id;
        string content;
        bool completed;
    }

    mapping(uint => Todo) public todos;

    event TodoCreated (
        uint id,
        string content,
        bool completed
    );

    event TodoCompleted (
        uint id,
        bool completed
    );

    constructor() public {
        createTodo('checkout BM IG page @adebsalert');
        
    }

    function createTodo (string memory _content) public {
        taskCount ++;
        todos[taskCount] = Todo(taskCount, _content, false);
        emit TodoCreated(taskCount, _content, false);
    }

    function toggleCompleted (uint _id) public {
        Todo memory _todo = todos[_id];
        _todo.completed = !_todo.completed;
        todos[_id] = _todo;
        emit TodoCompleted(_id, _todo.completed);
    }
}