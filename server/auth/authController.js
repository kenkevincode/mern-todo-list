const User = require('../users/User')
const bcrypt = require('bcrypt')
const config = require('config')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')

class authController {
	async register(req, res) {
		try {
			console.log(req.body)
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				res.status(400).json({ message: 'Ошибка при регистрации', errors })
			}
			const { email, password } = req.body
			const emailed = await User.findOne({ email })
			if (emailed) {
				return res.status(300).json({ message: `Пользователь с таким email ${email} уже существует` })
			}
			const hashPassword = await bcrypt.hashSync(password, 7)
			const user = new User({ email, password: hashPassword })
			await user.save()
			return res.json({ message: 'Пользователь успешно зарегестрирован' })
		} catch (e) {
			console.log(e)
			res.status(400).json({ message: 'Registration erorr' })
		}
	}

	async login(req, res) {
		try {
			const { email, password } = req.body
			const user = await User.findOne({ email })
			if (!user) {
				return res.status(400).json({ message: `Пользователь ${email} не найден` })
			}
			const validPassword = bcrypt.compareSync(password, user.password)
			if (!validPassword) {
				return res.status(400).json({ message: 'Введен неверный пароль' })
			}
			const token = jwt.sign({ userId: user.id }, config.get('secretKey'), { expiresIn: '1h' })
			return res.json({
				token,
				userId: user.id
			})
		} catch (e) {
			console.log(e)
			res.status(400).json({ message: 'Login erorr' })
		}
	}
}

module.exports = authController
