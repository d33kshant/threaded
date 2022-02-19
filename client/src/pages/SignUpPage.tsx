import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

const SignUpPage: React.FC = () => {
	return (
		<Container>
			<SingUpForm>
				<SingUpFormTitle>Sign-Up to Threaded</SingUpFormTitle>
				<SingUpInput name="username" type="text" placeholder="Username" />
				<SingUpInput name="email" type="text" placeholder="Email" />
				<SingUpInput name="password" type="password" placeholder="Password" />
				<SingUpInput name="confirm-password" type="password" placeholder="Confirm Password" />
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

const SingUpButton = styled.button`
	margin-top: 16px;
	padding: 4px 8px;
	background: #eff3f4;
	border: none;
	border-radius: 64px;
	color: black;
	font-family: inherit;
	font-weight: bold;
	font-size: 16px;
	/* text-transform: uppercase; */
	cursor: pointer;
	margin-bottom: 8px;
`