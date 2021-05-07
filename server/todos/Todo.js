const { Schema, model, Types} = require('mongoose')

const TodoSchema = new Schema({
	owner: {type: Types.ObjectId, ref: 'User'},
	text: { type: String, required: true},
	completed: false
})

module.exports = model('Todo', TodoSchema)
