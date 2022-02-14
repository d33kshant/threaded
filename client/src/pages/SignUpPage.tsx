import React from "react"
import styled from "styled-components"

const SignUpPage: React.FC = () => {
	return (
		<Container>
			<SingUpForm>
				<SingUpFormTitle>Sign-Up to Threaded</SingUpFormTitle>
				<SingUpInput name="username" type="text" placeholder="Username" />
				<SingUpInput name="email" type="text" placeholder="Email" />
				<SingUpInput name="password" type="text" placeholder="Password" />
				<SingUpInput name="confirm-password" type="text" placeholder="Confirm Password" />
				<SingUpButton type="submit">Sign Up</SingUpButton>
				<span>Already have an account? <a href="/login">Log In</a></span>
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
	/* align-items: center; */
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

const SingUpFormTitle = styled.span`
	font-weight: 600;
	font-size: 18px;
	margin: 0;
	margin-bottom: 12px;
`

const SingUpInput = styled.input`
	padding: 4px 8px;
	border: 1px solid gray;
	border-radius: 4px;
	font-family: inherit;
	position: relative;
`

const SingUpButton = styled.button`
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