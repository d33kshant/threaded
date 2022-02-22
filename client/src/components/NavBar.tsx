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
						<UserLink to={`/user/${user.username}`}>
							<img src={`http://localhost:3000/${user.avatar}`} height={24} style={{borderRadius: "50%"}} />
						</UserLink>
						{/* <NavLink onClick={logout} to="/">Log-Out</NavLink> */}
					</NavLinks> : 
					<NavLinks>
						<SignUpLink to="/signup">Sign-Up</SignUpLink>
						<LoginLink to="/login">Login</LoginLink>
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
	border-bottom: 1px solid #2F3336;
	background: black;
	box-sizing: border-box;
	position: sticky;
	top: 0;
	z-index: 5;
	height: 40px;
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
	color: white;
	font-weight: 600;
`

const NavLinks = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
`

const UserLink = styled(Link)`
	text-decoration: none;
`

const NavLink = styled(Link)`
	/* margin-top: 16px; */
	padding: 4px 16px;
	background: #eff3f4;
	border: none;
	border-radius: 64px;
	color: black;
	font-family: inherit;
	font-weight: bold;
	font-size: 14px;
	text-decoration: none;
	cursor: pointer;
	box-sizing: border-box;
`

const SignUpLink = styled(NavLink)`
	background: #1d9bf0;
	color: white;
`

const LoginLink = styled(NavLink)`
	background: transparent;
	border: 1px solid #eff3f4;
	color: #eff3f4;
`