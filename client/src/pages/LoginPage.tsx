const LoginPage: React.FC = () => {
	return (
		<div>
			<form>
				<input type="text" placeholder="Username" />
				<input type="password" placeholder="Password" />
				<button type="submit">Login</button>
			</form>
		</div>
	)
}

export default LoginPage