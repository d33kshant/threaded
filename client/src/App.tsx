import { useEffect, useState } from 'react'
import {
	BrowserRouter as Router,
	Routes,
	Route
} from 'react-router-dom'
import AuthProvider from './contexts/AuthContext'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import './styles/App.css'
import User from './types/User'

function App() {

	const [ user, setUser ] = useState<User | null>(null)

	useEffect(() => {
		const authString = localStorage.getItem('auth')
		if (authString) {
			const _user: User = JSON.parse(authString)
			if(_user){
				setUser(_user)
			}
		}
	}, [])
	

	return (
		<AuthProvider value={{ user, setUser }} >
			<Router>
				<Routes>
					<Route path="/" element={<HomePage/>} />
					<Route path="/login" element={ user ? <HomePage /> : <LoginPage/> } />
				</Routes>
			</Router>
		</AuthProvider>
	)
}

export default App
