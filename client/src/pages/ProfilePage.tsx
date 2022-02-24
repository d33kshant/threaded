import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import NavBar from "../components/NavBar"
import Button from "../components/Button"
import { useAuthContext } from "../contexts/AuthContext"
import UserProfile from "../types/UserProfile"
import Post from "../types/Post"
import { useToastContext } from "../contexts/ToastContext"
import { MessageType } from "../types/Message"

const ProfilePage = () => {
	const { username } = useParams()
	const {user: currentUser, logout} = useAuthContext()
	const [user, setUser] = useState<UserProfile | null>(null)
	const [loading, setLoading] = useState<boolean>(true)
	const [posts, setPosts] = useState<Post[]>([])
	const toast = useToastContext()

	useEffect(()=>{
		fetch(`/api/user?username=${username}`)
		.then(res=>res.json()).then(res=>{
			if(res.error) {
				return toast({ type: MessageType.Error, body: res.error })
			}
			setUser(res)
			setLoading(false)
		})
		fetch(`/api/post?author=${username}`)
		.then(res=>res.json()).then(res=>{
			if (res.error) {
				return toast({ type: MessageType.Error, body: res.error })
			}
			setPosts(res)
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
				<UserInfo>
				<Header>
					<UserAvatar src={`http://localhost:3000/${user.avatar}`} alt={user.username} />
					{ (user.username === currentUser?.username) ? 
						<ProfileActions>
							<LogOutButton onClick={logout}>Log Out</LogOutButton>
						</ProfileActions> 
					: <Button>{user.inFollowing ? "Unfollow" : "Follow"}</Button>}
					</Header>
					<UserName>{user.username}</UserName>
					{ user.bio && <UserBio>{user.bio}</UserBio>}
				</UserInfo>
				{ posts.length > 0 && posts.map(post=><p key={post._id}>{post.body}</p>) }
				</>
			}
		</Container>
		</>
	)
}

export default ProfilePage
 
const Container = styled.div`
	width: 100%;
	height: 100%;
	max-width: 750px;
	/* padding: 16px; */
	box-sizing: border-box;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	gap: 8px;
	border: 1px solid #2F3336;
	border-top: none;
	border-bottom: none;
`

const UserInfo = styled.div`
	width: 100%;
	padding: 16px;
	box-sizing: border-box;
	border-bottom: 1px solid #2F3336;
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

const LogOutButton = styled(Button)`
	background: #dd2e44;
`