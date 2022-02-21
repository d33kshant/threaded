import React, { useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import Button from "../components/Button"
import SignUpFormState from "../types/SignUpFormState"

const SignUpPage: React.FC = () => {

	const [formState, setFormState] = useState<SignUpFormState>({ username: "", email: "", password: "", confirmPassword: "" })

	const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		console.log(formState)
	}

	const onFormStateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const _formState: SignUpFormState = { ...formState }
		_formState[event.target.name] = event.target.value
		setFormState(_formState)
	}

	return (
		<Container>
			<SingUpForm onSubmit={onFormSubmit} >
				<SingUpFormTitle>Sign-Up to Threaded</SingUpFormTitle>
				<SingUpInput onChange={onFormStateChange} value={formState.username} name="username" type="text" placeholder="Username" />
				<SingUpInput onChange={onFormStateChange} value={formState.email} name="email" type="text" placeholder="Email" />
				<SingUpInput onChange={onFormStateChange} value={formState.password} name="password" type="password" placeholder="Password" />
				<SingUpInput onChange={onFormStateChange} value={formState.confirmPassword} name="confirmPassword" type="password" placeholder="Confirm Password" />
				<SingUpButton type="submit">Sign Up</SingUpButton>
				<span>Already have an account? <Link to="/login">Log In</Link></span>
			</SingUpForm>
		</Container>
	)
}

export default SignUpPage

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

const SingUpForm = styled.form`
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

const SingUpFormTitle = styled.span`
	font-weight: 600;
	font-size: 18px;
	margin: 0;
	margin-bottom: 12px;
`

const SingUpInput = styled.input`
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

const SingUpButton = styled(Button)`
	margin-bottom: 8px;
`