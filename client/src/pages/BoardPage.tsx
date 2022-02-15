import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useAuthContext } from "../contexts/AuthContext"
import Board from "../types/Board"

const BoardPage = () => {
	const [board, setBoard] = useState<Board | null>(null)
	const [loading, setLoading] = useState<boolean>(true)
	const [joined, setJoined] = useState<boolean>(false)

	const { board: name } = useParams()
	const { logout } = useAuthContext()

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

	const onJoinButtonClick = () => {
		fetch('/api/board/join', {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ name }),
		}).then(res=>res.json()).then(res=>{
			if (res.requireAuth) {
				console.log("Should relogin")
				logout()
			}
			if (res.error) {
				return alert(res.error)
			}
			setJoined(res.joined)
		})
	}

	if (loading) {
		return (
			<div>Loading...</div>
		)
	}

	if (!board) {
		return (
			<div>Board not found.</div>
		)
	}

	return (
		<div>
			<p>{board.name}<br />Members: {board.members}<br /> Created: {(new Date(board.created)).toDateString()}
			<br />Creator: <a href={`/user/${board.creator}`}>@{board.creator}</a><br /><button onClick={onJoinButtonClick}>{joined ? "Leave Board" : "Join Board"}</button></p>
		</div>
	)
}

export default BoardPage