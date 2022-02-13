import React from "react"

const SignUpPage: React.FC = () => {
	return (
		<div>
			<form>
				<input name="username" type="text" placeholder="Username" />
				<input name="email" type="text" placeholder="Email" />
				<input name="password" type="text" placeholder="Password" />
				<input name="confirm-password" type="text" placeholder="Confirm Password" />
				<button type="submit">Sign Up</button>
				<br /><span>Already have an account? <a href="/login">Log In</a></span>
			</form>
		</div>
	)
}

export default SignUpPage