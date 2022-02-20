import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import NavBar from "../components/NavBar"
import ActionButton from "../components/Button"
import { useAuthContext } from "../contexts/AuthContext"
import UserProfile from "../types/UserProfile"

const ProfilePage = () => {
	const { username } = useParams()
	const {user: currentUser} = useAuthContext()
	const [user, setUser] = useState<UserProfile | null>(null)
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(()=>{
		fetch(`/api/user?username=${username}`)
		.then(res=>res.json()).then(res=>{
			if(res.error) {
				return alert(res.error)
			}
			console.log(res)
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
				<UserAvatar src={`http://localhost:3000/${user.avatar}`} alt={user.username} />
				<UserName>{user.username}</UserName>
				{ user.bio && <UserBio>{user.bio}</UserBio>}
				{ (user.username === currentUser?.username) ? <ActionButton>Edit Profile</ActionButton> : <ActionButton>{user.inFollowing ? "Unfollow" : "Follow"}</ActionButton>}
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
`

const UserAvatar = styled.img`
	border-radius: 50%;
	height: 128px;
	width: 128px;
`

const UserName = styled.p`
	margin: 0;
	font-weight: bold;
`

const UserBio = styled.p`
	margin: 0;
`