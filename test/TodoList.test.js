const { assert } = require("chai")

const TodoList = artifacts.require('./TodoList.sol')

contract('TodoList', (accounts) => {
    before(async () => {
        this.todoList = await TodoList.deployed()
    })

    it('deploys successfully', async () => {
        const address = await this.todoList.address

        assert.notEqual(address, '0x0')
        assert.notEqual(address, null)
        assert.notEqual(address, undefined)
        assert.notEqual(address, '')

    })

    it('lists all the todos', async () => {
        const todosCount = await this.todoList.taskCount()
        const todo = await this.todoList.todos(todosCount)

        assert.notEqual(todo, null)
        assert.notEqual(todosCount, 0)
        assert.equal(todosCount.toNumber(), todo.id.toNumber())
    })

    it('creates a todo', async () => {
        const result = await this.todoList.createTodo('a new test todo')
        const taskCount = await this.todoList.taskCount()
        const event = result.logs[0].args

        assert.equal(event.content, 'a new test todo')
        assert.equal(event.completed, false)
        assert.equal(event.id.toNumber(), taskCount.toNumber())
    })

    it('mark a todo as completed', async () => {
        const result = await this.todoList.toggleCompleted(1)
        const todo = await this.todoList.todos(1)
        const event = result.logs[0].args;

        assert.equal(todo.completed, true)
        assert.equal(event.completed, true)
    })
})
