import React, { useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import Button from "../components/Button"
import SignUpInput from "../components/Input"
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
			<SignUpForm onSubmit={onFormSubmit} >
				<SignUpFormTitle>Sign-Up to Threaded</SignUpFormTitle>
				<SignUpInput onChange={onFormStateChange} value={formState.username} name="username" type="text" placeholder="Username" />
				<SignUpInput onChange={onFormStateChange} value={formState.email} name="email" type="text" placeholder="Email" />
				<SignUpInput onChange={onFormStateChange} value={formState.password} name="password" type="password" placeholder="Password" />
				<SignUpInput onChange={onFormStateChange} value={formState.confirmPassword} name="confirmPassword" type="password" placeholder="Confirm Password" />
				<SignUpButton type="submit">Sign Up</SignUpButton>
				<span>Already have an account? <Link to="/login">Log In</Link></span>
			</SignUpForm>
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

const SignUpForm = styled.form`
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

const SignUpFormTitle = styled.span`
	font-weight: 600;
	font-size: 18px;
	margin: 0;
	margin-bottom: 12px;
`

const SignUpButton = styled(Button)`
	margin-bottom: 8px;
`