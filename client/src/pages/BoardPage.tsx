import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import NavBar from "../components/NavBar"
import { useAuthContext } from "../contexts/AuthContext"
import Board from "../types/Board"
import BoardPosts from "../components/BoardPosts"

const BoardPage = () => {
	const [board, setBoard] = useState<Board | null>(null)
	const [loading, setLoading] = useState<boolean>(true)
	const [joined, setJoined] = useState<boolean>(false)

	const { board: name } = useParams()
	const { logout } = useAuthContext()
	const navigate = useNavigate()

	useEffect(() => {
		if(name) {
			fetch(`/api/board/${name}`)
			.then(res=>res.json()).then(res=>{
				if(!res.error) {
					setBoard(res)
					setJoined(res.joined)
				}
				setLoading(false)
			})
		}
	}, [name])

	const onActionButtonClick = () => {
		fetch('/api/board/join', {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ name }),
		}).then(res=>res.json()).then(res=>{
			if (res.requireAuth) {
				// logout()
				return navigate('/login')
			}
			if (res.error) {
				return alert(res.error)
			}
			setJoined(res.joined)
		})
	}

	return (
		<>
		<NavBar />
		<Container>
			{ loading && "Loading..." }
			{ (!loading && !board) && "Loading..." }
			{
				(!loading && board) &&
				<>
				<BoardInfo>
					<BannerImage src={board.banner} alt="banner" />
					<BoardIcon src={board.icon} />
					<BoardName>{board.name}</BoardName>
					<BoardAbout>{board.about}</BoardAbout>
					<BoardStats>
						<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
						{board.members} •
						<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
						{(new Date(board.created)).toLocaleDateString()}
					</BoardStats>
					<BoardActionButton onClick={onActionButtonClick}>{ joined ? "Leave Board" : "Join Board"}</BoardActionButton>
				</BoardInfo>
				<BoardPosts board={board.name} />
				</>
			}
		</Container>
		</>
	)
}

export default BoardPage

const Container = styled.div`
	margin: 0 auto;
	width: 100%;
	max-width: 750px;
	padding: 0 8px;
	box-sizing: border-box;
	height: 100%;
	display: flex;
	/* flex-direction: column; */
	position: relative;
	gap: 8px;

	@media (max-width: 450px) {
		flex-direction: column;
		padding: 0;
	}
`

const BoardInfo = styled.div`
	/* width: calc(100% - 32px); */
	display: flex;
	padding: 8px;
	/* border-right: 1px solid #2F3336; */
	border-radius: 4px;
	/* background: white; */
	box-sizing: border-box;
	flex-direction: column;
	align-items: center;
	position: sticky;
	height: max-content;
	top: 48px;
	/* justify-content: center; */
	/* background: red; */
	/* position: absolute; */
	/* top: 116px; */
	@media (max-width: 450px) {
		position: static;
		border-bottom: 1px solid #2F3336;
	}
`

const BannerImage = styled.img`
	/* width: 100%; */
	height: 150px;
	object-fit: cover;
	border-radius: 4px;
	/* position: absolute;
	z-index: -5; */
	/* top: 0; */
`

const BoardIcon = styled.img`
	border-radius: 8px;
	width: 64px;
	height: 64px;
	/* border: 4px solid #2F3336; */
	/* position: absolute; */
	/* top: calc(75%); */
	/* left: 16px; */
`

const BoardName = styled.p`
	margin: 0;
	font-weight: 600;
	/* font-size: 18px; */
	/* position: absolute; */
`

const BoardAbout = styled.span`
	color: #6e767d;
`

const BoardStats = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
	margin: 8px 0;
`

const BoardActionButton = styled.button`
	margin-top: 16px;
	padding: 8px 16px;
	background: #eff3f4;
	border: none;
	border-radius: 64px;
	color: black;
	font-family: inherit;
	font-weight: bold;
	/* text-transform: uppercase; */
	cursor: pointer;
`