const Router = require('express')
const router = new Router()
const AuthController = require('./auth/authController') 
const TodoController = require('./auth/todoController') 
const {check} = require('express-validator')
// const authMiddleware = require('./middleware/authMiddleware')
// const roleMiddleware = require('./middleware/roleMiddleware')

const authController = new AuthController()
const todoController = new TodoController()

router.post('/registr', [
  check('email',  'Введен неверный email').isEmail(),
  check('password', 'Пароль должен быть более 4 и менее 10 символов').isLength({min: 4, max: 10})
], authController.register)
router.post('/login', authController.login)

router.get('/todo', todoController.getTodos)
router.post('/todo',[
  check('text', 'Todo не моежет быть пустым').notEmpty(),
], todoController.createTodo)
router.delete('/todo/:id', todoController.removeTodo)
router.put('/todo/:id', todoController.updateTodo)

module.exports = router