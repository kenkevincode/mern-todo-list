import React, {useContext} from 'react'
import { AuthContext} from '.././context/AuthContext'


function Navbar() {
const {logout, isLogin} = useContext(AuthContext)

	return (
		<div className='navbar'>
		{
			isLogin 
			? <a href='/' className='navbar-log' onClick={logout}>logout</a>
			: <a href='/login' className='navbar-log'>login</a>
		}
		</div>
	)
}

export default Navbar
