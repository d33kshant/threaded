import { useEffect, useRef, useState } from 'react'
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate
} from 'react-router-dom'
import styled from 'styled-components'
import AuthProvider from './contexts/AuthContext'
import ToastContextProvider from './contexts/ToastContext'
import BoardPage from './pages/BoardPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import PostPage from './pages/PostPage'
import ProfilePage from './pages/ProfilePage'
import SignUpPage from './pages/SignUpPage'
import './styles/App.css'
import Message, { MessageType } from './types/Message'
import User from './types/User'

const TOAST_TIMEOUT = 3000

function App() {

	const [ user, setUser ] = useState<User | null>(null)
	const [ toast, setToast ] = useState<Message | null>(null)
	const [toastVisible, setToastVisible] = useState<boolean>(false)

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

	const showToast = (message: Message) => {
		setToastVisible(true)
		setToast(message)
		setTimeout(()=>closeToast(), TOAST_TIMEOUT)
	}

	const closeToast = () => {
		setToastVisible(false)
		setTimeout(()=>setToast(null), 1000)
	}

	return (
		<ToastContextProvider value={showToast} >
			<AuthProvider value={{ user, login, logout }} >
				<Router>
					<Routes>
						<Route path="/" element={<HomePage/>} />
						<Route path="/board/:board" element={<BoardPage />} />
						<Route path="/board" element={<Navigate to="/" replace={true} />} />
						<Route path="/user/:username" element={<ProfilePage />} />
						<Route path="/user" element={<Navigate to="/" replace={true} />} />
						<Route path="/post/:post" element={<PostPage />} />
						<Route path="/post" element={<Navigate to="/" replace={true} />} />
						<Route path="/login" element={ user ? <Navigate to="/" /> : <LoginPage/> } />
						<Route path="/signup" element={ user ? <Navigate to="/" /> : <SignUpPage/> } />
					</Routes>
				</Router>
			</AuthProvider>
			<Toast id={toast?.type === MessageType.Error ? "error" : "success"} style={{ top: toastVisible ? "32px" : "-32px" }}>
				<ToastText>{toast?.body}</ToastText>
				<CloseToast onClick={closeToast}>
					<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
				</CloseToast>
			</Toast>
		</ToastContextProvider>
	)
}

export default App

const Toast = styled.div`
	display: flex;
	border: 1px solid;
	padding: 4px 8px;
	box-sizing: border-box;
	align-items: center;
	width: fit-content;
	position: fixed;
	transition: top 0.5s ease;
	gap: 8px;
	z-index: 5000;
	left: 50%;
	transform: translateX(-50%);
	background: ${prop=>prop.id==="error" ? "#be193232" : "#00ba7c33"};
	color: ${prop=>prop.id==="error" ? "#be1932" : "#00ba7c"};
	border-color: ${prop=>prop.id==="error" ? "#be1932" : "#00ba7c"};
`

const ToastText = styled.p`
	margin: 0;
`

const CloseToast = styled.button`
	padding: 0;
	border: none;
	background: none;
	color: inherit;
	cursor: pointer;
`