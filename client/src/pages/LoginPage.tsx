import { useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { useAuthContext } from "../contexts/AuthContext"
import LoginFormState from "../types/LoginFormState"
import Message, { MessageType } from "../types/Message"
import Button from "../components/Button"

const LoginPage: React.FC = () => {

	const [ formState, setFormState ] = useState<LoginFormState>({ username: "", password: "" })
	const [message, setMessage] = useState<Message | null>(null)
	const { login } = useAuthContext()

	const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		fetch('/api/auth/login', {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(formState),
		}).then(res=>res.json()).then(res=>{
			if (res.error) {
				return setMessage({ type: MessageType.Error, body: res.error })
			}
			setTimeout(()=>{
				login(res)
				localStorage.setItem('jwt-token', res.token)
			}, 1000)
			setMessage({ type: MessageType.Success, body: "Login was successfull, taking you to homepage." })
		})
	}

	const onFormStateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		switch (event.target.name) {
			case 'username':
				setFormState({ ...formState, username: event.target.value })
				break;
			case 'password':
				setFormState({ ...formState, password: event.target.value})
				break;
		}
	}

	return (
		<Container>
			<LoginForm onSubmit={onFormSubmit}>
				<LoginFormTitle>Login to Threaded</LoginFormTitle>
				<LoginInput value={formState.username} onChange={onFormStateChange} autoComplete="off" name="username" type="text" placeholder="Username" />
				<LoginInput value={formState.password} onChange={onFormStateChange} name="password" type="password" placeholder="Password" />
				<LoginButton type="submit">Login</LoginButton>
				<span>Don't have an account? <Link to="/signup">Sign Up</Link></span>
			</LoginForm>
			{ message && 
			<MessageBox id={message.type === MessageType.Error ? "error" : "success"}>
				<MessageText>{message.body}</MessageText>
				<CloseMessage onClick={()=>setMessage(null)}>
					<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
				</CloseMessage>
			</MessageBox>}
		</Container>
	)
}

export default LoginPage

const Container = styled.div`
	width: 100%;
	height: 100%;
	padding: 16px;
	box-sizing: border-box;
	justify-content: center;
	align-items: center;
	display: flex;
	flex-direction: column;
	gap: 16px;
`

const LoginForm = styled.form`
	width: max-content;
	display: flex;
	flex-direction: column;
	/* background: white; */
	gap: 8px;
	padding: 16px;
	box-sizing: border-box;
	/* border: 1px solid lightgray; */
	border-radius: 8px;

	a {
		text-decoration: none;
		color: #1d9bf0;
	}

	/* a:hover {
		text-decoration: underline;
	} */
`

const LoginFormTitle = styled.span`
	font-weight: 600;
	font-size: 18px;
	margin: 0;
	margin-bottom: 12px;
`

const LoginInput = styled.input`
	padding: 8px;
	border: 1px solid #6e767d;
	border-radius: 4px;
	font-family: inherit;
	background: none;

	:focus-visible {
		outline: 1px solid #1d9bf0;
		border-color: #1d9bf0;
	}
`

const LoginButton = styled(Button)`
	margin-bottom: 8px;
`

const MessageBox = styled.div`
	display: flex;
	border: 1px solid;
	padding: 4px 8px;
	box-sizing: border-box;
	align-items: center;
	gap: 8px;
	background: ${prop=>prop.id==="error" ? "#be193232" : "#00ba7c33"};
	color: ${prop=>prop.id==="error" ? "#be1932" : "#00ba7c"};
	border-color: ${prop=>prop.id==="error" ? "#be1932" : "#00ba7c"};
`

const MessageText = styled.p`
	margin: 0;
`

const CloseMessage = styled.button`
	padding: 0;
	border: none;
	background: none;
	color: inherit;
	cursor: pointer;
`