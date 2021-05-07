import React, { useState, useContext } from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'

function AuthPage() {
	const [form, setForm] = useState({
		email: '',
		password: ''
	})

	const { login } = useContext(AuthContext)

	function changeHandler(event) {
		setForm({ ...form, [event.target.name]: event.target.value })
	}

	async function registrHendler() {
		try {
			await axios
				.post(
					'/api/registr',
					{ ...form },
					{
						headers: {
							'Content-Type': 'application/json'
						}
					}
				)
				.then((res) => console.log(res))

		} catch (err) {
			console.log(err)
		}
	}

	async function loginHendler() {
		try {
			await axios
				.post(
					'/api/login',
					{ ...form },
					{
						headers: {
							'Content-Type': 'application/json'
						}
					}
				)
				.then((res) => {
					login(res.data.token, res.data.userId)
				})
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<BrowserRouter>
			<Switch>
				<React.Fragment>
					<Route path='/login'>
						<div className='todolist-auth'>
							<h2 style={{ textAlign: 'center', fontWeight: 'initial' }}>Logination</h2>
							<form name='form-login' htmlFor='login' className='add-form' onSubmit={(event) => event.preventDefault()}>
								<label htmlFor='email' className='add-form_label'>
									email
								</label>
								<input type='email' name='email' className='add-form_input' onChange={changeHandler} />
								<label htmlFor='password' className='add-form_label'>
									password
								</label>
								<input type='password' name='password' className='add-form_input' onChange={changeHandler} />
								<div className='login-footer'>
									<button type='submit' className='auth-form_button-login' onClick={loginHendler}>
										Login
									</button>
									<Link to='/registr' className='not-account'>
										do haven't account?
									</Link>
								</div>
							</form>
						</div>
					</Route>

					<Route path='/registr'>
						<div className='todolist-auth'>
							<h2 style={{ textAlign: 'center', fontWeight: 'initial' }}>Regisration</h2>
							<form name='form-registr' htmlFor='registr' className='add-form'>
								<label htmlFor='email' className='add-form_label'>
									email
								</label>
								<input type='email' name='email' className='add-form_input' onChange={changeHandler} />
								<label htmlFor='password' className='add-form_label'>
									password
								</label>
								<input type='password' name='password' className='add-form_input' onChange={changeHandler} />
								<button type='submit' className='auth-form_button-registr' onClick={registrHendler}>
									Send
								</button>
							</form>
						</div>
					</Route>
				</React.Fragment>
			</Switch>
		</BrowserRouter>
	)
}

export default AuthPage
