import styled from "styled-components"
import { Link } from "react-router-dom"
import { useAuthContext } from "../contexts/AuthContext"

const NavBar = () => {

	const { user } = useAuthContext()

	return (
		<Nav>
			<NavLogo href="/">threaded</NavLogo>
			{ 
				user ? 
				<NavLink to={`/user/${user.username}`}>Account</NavLink> : 
				<NavLinks>
					<NavLink to="/signup">Sign-Up</NavLink>
					<NavLink to="/login">Login</NavLink>
				</NavLinks>
			}
		</Nav>
	)
}

export default NavBar

const Nav = styled.nav`
	width: 100%;
	padding: 8px 16px;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 1px solid lightgray;
`

const NavLogo = styled.a`
	text-decoration: none;
	color: black;
	font-weight: 600;
`

const NavLinks = styled.div`
	display: flex;
	align-items: center;
	gap: 16px;
`

const NavLink = styled(Link)`
	text-decoration: none;

	:hover {
		text-decoration: underline;
	}
`