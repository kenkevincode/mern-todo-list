const Todo = require('../todos/Todo')
const { validationResult } = require('express-validator')

class todoController {
	async getTodos(req, res) {
		try {
			// const userRole = new Role()
			// const adminRole = new Role({value: 'ADMIN'})
			// await userRole.save()
			// await adminRole.save()
			const { userId } = req.query
			const todos = await Todo.find({ owner: userId })
			console.log('todosssss', todos)
			res.json(todos)
		} catch (e) {
			console.log(e)
		}
	}

	async createTodo(req, res) {
		try {
			console.log(req.body)
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				res.status(400).json({ message: 'Ошибка при создание Todo', errors })
			}
			const { text, userId } = req.body
			const todo = await new Todo({
				text,
				owner: userId,
				completed: false
			})
			await todo.save()
			return res.json(todo)
		} catch (e) {
			console.log(e)
		}
	}

	async removeTodo(req, res) {
		try {
			const todo = await Todo.findOneAndDelete({_id: req.params.id})
			res.json(todo)
		} catch (e) {
			console.log(e)
		}
	}

	async updateTodo(req, res) {
		try {
			const todo = await Todo.findOne({_id: req.params.id})
			todo.completed = !todo.completed
			await todo.save()
			res.json(todo)
		} catch (e) {
			console.log(e)
		}
	}
}

module.exports = todoController
