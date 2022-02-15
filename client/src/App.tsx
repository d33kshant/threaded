import { useEffect, useState } from 'react'
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate
} from 'react-router-dom'
import AuthProvider from './contexts/AuthContext'
import BoardPage from './pages/BoardPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import './styles/App.css'
import User from './types/User'

function App() {

	const [ user, setUser ] = useState<User | null>(null)

	useEffect(() => {
		const token = localStorage.getItem('jwt-token')
		if (token) {
			fetch(`/api/auth/verify?token=${token}`)
			.then(res=>res.json()).then(res=>{
				if (res.error){
					localStorage.removeItem('jwt-token')
				}else {
					setUser(res)
				}
			})
		}
	}, [])

	const login = (user: User | null) => {
		setUser(user)
	}

	const logout = () => {
		localStorage.removeItem('jwt-token')
		setUser(null)
		window.location.reload()
	}

	return (
		<AuthProvider value={{ user, login, logout }} >
			<Router>
				<Routes>
					<Route path="/" element={<HomePage/>} />
					<Route path="/board/:board" element={<BoardPage />} />
					<Route path="/board" element={<Navigate to="/" replace={true} />} />
					<Route path="/login" element={ user ? <Navigate to="/" /> : <LoginPage/> } />
					<Route path="/signup" element={ user ? <Navigate to="/" /> : <SignUpPage/> } />
				</Routes>
			</Router>
		</AuthProvider>
	)
}

export default App
