import React from 'react'
import Navbar from './Navbar/Navbar'
import { AuthContext } from './context/AuthContext'
import { useAuth } from './hooks/AuthHook'
import { BrowserRouter } from 'react-router-dom'
import { useRoutes } from './routes'

function App() {

	const { login, logout, token, userId, isReady } = useAuth()
	const isLogin = !!token
	const routes = useRoutes(isLogin)

	return (
		<AuthContext.Provider value={{ login, logout, token, userId, isReady, isLogin }}>
			<div className='app'>
				<BrowserRouter>
					<Navbar />
					{routes}
				</BrowserRouter>
			</div>
		</AuthContext.Provider>
	)
}

export default App
