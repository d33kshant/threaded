import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import NavBar from "../components/NavBar"
import Button from "../components/Button"
import { useAuthContext } from "../contexts/AuthContext"
import UserProfile from "../types/UserProfile"

const ProfilePage = () => {
	const { username } = useParams()
	const {user: currentUser, logout} = useAuthContext()
	const [user, setUser] = useState<UserProfile | null>(null)
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(()=>{
		fetch(`/api/user?username=${username}`)
		.then(res=>res.json()).then(res=>{
			if(res.error) {
				return alert(res.error)
			}
			setUser(res)
			setLoading(false)
		})
	}, [])

	return (
		<>
		<NavBar />
		<Container>
			{loading && "Loading..."}
			{(!loading && !user) && "User not found"}
			{(!loading && user) &&
				<>
				<Header>
				<UserAvatar src={`http://localhost:3000/${user.avatar}`} alt={user.username} />
				{ (user.username === currentUser?.username) ? 
					<ProfileActions>
						<EditProfileButton>Edit Profile</EditProfileButton>
						<LogOutButton onClick={logout}>Log Out</LogOutButton>
					</ProfileActions> 
				: <Button>{user.inFollowing ? "Unfollow" : "Follow"}</Button>}
				</Header>
				<UserName>{user.username}</UserName>
				{ user.bio && <UserBio>{user.bio}</UserBio>}
				</>
			}
		</Container>
		</>
	)
}

export default ProfilePage
 
const Container = styled.div`
	width: 100%;
	max-width: 750px;
	padding: 16px;
	box-sizing: border-box;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	gap: 8px;
`

const UserAvatar = styled.img`
	border-radius: 50%;
	height: 64px;
	width: 64px;
`

const UserName = styled.p`
	margin: 0;
	font-weight: bold;
`

const UserBio = styled.p`
	margin: 0;
	color: #6e767d;
`

const Header = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`

const ProfileActions = styled.div`
	display: flex;
	gap: 8px;
`

const EditProfileButton = styled(Button)`
	/* background: transparent;
	border: 1px solid #eff3f4;
	color: #eff3f4; */
`

const LogOutButton = styled(Button)`
	background: #dd2e44;
`