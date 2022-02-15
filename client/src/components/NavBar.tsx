import styled from "styled-components"
import { Link } from "react-router-dom"
import { useAuthContext } from "../contexts/AuthContext"

const NavBar = () => {

	const { user, logout } = useAuthContext()

	return (
		<Container>
			<Nav>
				<NavLogo href="/">Threaded</NavLogo>
				{ 
					user ? 
					<NavLinks>
						<NavLink to={`/user/${user.username}`}>
							<img src={user.avatar} height={24} style={{borderRadius: "50%"}} />
						</NavLink>
						{/* <NavLink onClick={logout} to="/">Log-Out</NavLink> */}
					</NavLinks> : 
					<NavLinks>
						<NavLink to="/signup">Sign-Up</NavLink>
						<NavLink to="/login">Login</NavLink>
					</NavLinks>
				}
			</Nav>
		</Container>
	)
}

export default NavBar

const Container = styled.header`
	display: flex;
	justify-content: center;
	border-bottom: 1px solid lightgray;
	background: white;
`

const Nav = styled.nav`
	width: 100%;
	max-width: 750px;
	padding: 8px 16px;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: space-between;
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