import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { useToastContext } from "../contexts/ToastContext"
import BoardPostsProps from "../types/BoardPostsProps"
import { MessageType } from "../types/Message"
import Post from "../types/Post"
import PostItem from "./Post"

const BoardPosts: React.FC<BoardPostsProps> = ({ board }) => {
	const [posts, setPosts] = useState<Post[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const toast = useToastContext()

	useEffect(()=>{
		fetch(`/api/post?board=${board}`)
		.then(res=>res.json()).then(res=>{
			if (res.error) {
				return toast({ type: MessageType.Error, body: res.error })
			}
			setPosts(res)
			setLoading(false)
		})
	}, [])

	if(loading){
		return <div>Loading...</div>
	}

	if(!posts){
		return <div>Failed to fetch posts.</div>
	}

	return (
		<Container>
			{ posts.length > 0 ? posts.map(post=><PostItem replyable={true} key={post._id} data={post} />) : "Nothing to show here" }
		</Container>
	)
}

export default BoardPosts

const Container = styled.div`
	display: flex;
	flex-direction: column;
	/* gap: 8px; */
	width: 100%;
	height: 100%;
	border-left: 1px solid #2F3336;
	border-right: 1px solid #2F3336;
	box-sizing: border-box;
	/* padding: 8px; */

	@media (max-width: 450px) {
		border: none;
	}
`