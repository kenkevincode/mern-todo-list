import React, { useState, useContext, useCallback, useEffect } from 'react'
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'

function MainPage() {
	const [text, setText] = useState('')
	const { userId } = useContext(AuthContext)
	const [todos, setTodos] = useState([])

	const getTodo = useCallback(async () => {
		try {
			await axios
				.get('/api/todo', {
					headers: { 'Content-Type': 'application/json' },
					params: { userId }
				})
				.then((res) => setTodos(res.data))
		} catch (err) {
			console.log(err)
		}
	}, [userId])

	const createTodo = useCallback(async () => {
		if (!text) return null
		try {
			await axios
				.post(
					'/api/todo',
					{ text, userId },
					{
						headers: { 'Content-Type': 'application/json' }
					}
				)
				.then((res) => {
					setTodos([...todos], res.data)
					setText('')
					getTodo()
				})
		} catch (err) {
			console.log(err)
		}
	}, [text, userId, todos, getTodo])

	const removeTodo = useCallback(
		async (id) => {
			try {
				await axios
					.delete(
						`/api/todo/${id}`,
						{ id },
						{
							headers: { 'Content-Type': 'application/json' }
						}
					)
					.then(() => getTodo())
			} catch (err) {
				console.log(err)
			}
		},
		[getTodo]
	)

	const completedTodo = useCallback(
		async (id) => {
			try {
				await axios
					.put(
						`/api/todo/${id}`,
						{ id },
						{
							headers: { 'Content-Type': 'application/json' }
						}
					)
					.then((res) => {
						setTodos([...todos], res.data)
						getTodo()
					})
			} catch (err) {
				console.log(err)
			}
		},
		[getTodo, todos]
	)

	useEffect(() => {
		getTodo()
	}, [getTodo])

	const styles = {
		todoItem: {
			listStyle: 'none',
			margin: '0',
			padding: '0',
			fontSize: '1.5rem'
		},
		todo: {
			display: 'flex',
			margin: '0 -3rem 4px',
			padding: '1.1rem 3rem',
			justifyContent: 'space-between',
			alignItems: 'center',
			background: 'rgba(255,255,255,0.2)',
		},
		'p:last-child': {
			marginBottom: 0
		}
	}

	return (
		<div className='mern-todo-list'>
			<div className='todolist'>
				<h4 style={{ textAlign: 'center', fontWeight: 'initial' }}>made by LEX</h4>
				<div>
					<h1 className='todolist-title'>TODO LIST</h1>
					<div className='todolist-subtitle'>on REACT</div>
					<span className='todolist-span'>Get things done, one item at a time...</span>
					<hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,.5)', marginBottom: '1.5rem' }} />
				</div>

				{todos.length ?
					<div style={styles.todoItem}>
						{todos.map((todo, index) => {
							let classes =['todo-title']

								if(todo.completed){
									classes.push('completed')
								}

							return (
								<div style={styles.todo}>
									<span className={classes.join(' ')} key={index}>
										<strong className='todo-index'> {index + 1}</strong>
										&nbsp;
										{todo.text}
									</span>
									<div className='todo-btns'>
										<input type='checkbox' className='todo-checkbox' onClick={() => completedTodo(todo._id)} />
										<DeleteOutlineOutlinedIcon onClick={() => removeTodo(todo._id)} />
									</div>
								</div>
							)
						})}
					</div>
					: <p className='todo-none'>NO TODOS !</p>}

				<form name='newform' htmlFor='newtodo' className='add-form' onSubmit={(e) => e.preventDefault()}>
					<label htmlFor='newtodo' className='add-form_label'>
						Add to the todo list
					</label>
					<input
						type='text'
						name='newtodo'
						id='newtodo'
						className='add-form_input'
						value={text}
						onChange={(e) => setText(e.target.value)}
					/>
					<button type='submit' className='add-form_button' onClick={createTodo}>
						Add todo
					</button>
				</form>
			</div>
		</div>
	)
}
export default MainPage
