// import { useAuthContext } from "../contexts/AuthContext"

import styled from "styled-components"
import NavBar from "../components/NavBar"

const HomePage: React.FC = () => {
	
	// const { user } = useAuthContext()
	
	return (
		<>
		<NavBar />
		<Container>
			Home Page	
		</Container>
		</>
	)
}

export default HomePage

const Container = styled.div`
	margin: 0 auto;
	width: 100%;
	max-width: 750px;
	padding: 8px 16px;
	box-sizing: border-box;
	background: rgba(0, 0, 0, 0.3);
	height: 100%;
`