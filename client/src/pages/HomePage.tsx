import { useAuthContext } from "../contexts/AuthContext"

const HomePage: React.FC = () => {
	
	const { user } = useAuthContext()
	
	return (
		<div>
			{ user ? <p>Username: {user.username} <br/> Id: {user.id}</p> : <p>Home Page <br /> <a href="/login">Login</a> </p> }
		</div>
	)
}

export default HomePage