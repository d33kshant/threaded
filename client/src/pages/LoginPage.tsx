import { useState } from "react"
import styled from "styled-components"
import { useAuthContext } from "../contexts/AuthContext"
import LoginFormState from "../types/LoginFormState"

const LoginPage: React.FC = () => {

	const [ formState, setFormState ] = useState<LoginFormState>({ username: "", password: "" })
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
				return alert('Failed to login.')
			}
			login(res)
			localStorage.setItem('jwt-token', res.token)
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
				<span>Don't have an account? <a href="/signup">Sign Up</a></span>
			</LoginForm>
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
	background: white;
	gap: 4px;
	padding: 16px;
	box-sizing: border-box;
	border: 1px solid lightgray;
	border-radius: 8px;

	a {
		text-decoration: none;
	}

	a:hover {
		text-decoration: underline;
	}
`

const LoginFormTitle = styled.span`
	font-weight: 600;
	font-size: 18px;
	margin: 0;
	margin-bottom: 12px;
`

const LoginInput = styled.input`
	padding: 4px 8px;
	border: 1px solid gray;
	border-radius: 4px;
	font-family: inherit;
`

const LoginButton = styled.button`
	width: 100%;
	max-width: 100px;
	border: 1px solid gray;
	border-radius: 4px;
	font-family: inherit;
	padding: 4px 16px;
	margin-top: 4px;
	margin-bottom: 8px;
	cursor: pointer;

	:hover {
		background: lightgray;
	}
`