import { useState } from "react"
import { useAuthContext } from "../contexts/AuthContext"
import LoginFormState from "../types/LoginFormState"

const LoginPage: React.FC = () => {

	const [ formState, setFormState ] = useState<LoginFormState>({ username: "", password: "" })
	const { setUser } = useAuthContext()

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
			setUser(res)
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
		<div>
			<form onSubmit={onFormSubmit}>
				<input value={formState.username} onChange={onFormStateChange} autoComplete="off" name="username" type="text" placeholder="Username" />
				<input value={formState.password} onChange={onFormStateChange} name="password" type="password" placeholder="Password" />
				<button type="submit">Login</button>
				<br /><span>Don't have an account? <a href="/signup">Sign Up</a></span>
			</form>
		</div>
	)
}

export default LoginPage