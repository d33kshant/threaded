import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import NavBar from "../components/NavBar"
import Post from "../components/Post"
import { useToastContext } from "../contexts/ToastContext"
import { MessageType } from "../types/Message"
import PostType from "../types/Post"

const PostPage = () => {
	
	const { post: id } = useParams()
	const [ post, setPost ] = useState<PostType | null>(null)
	const [ replies, setReplies ] = useState<PostType[]>([])

	const toast = useToastContext()

	useEffect(()=>{
		fetch(`/api/post/${id}`).then(res=>res.json()).then(res=>{
			if (res.error) {
				return toast({ type: MessageType.Error, body: res.error })
			}
			setPost(res[0])
		})
		fetch(`/api/post/${id}/replies`).then(res=>res.json()).then(res=>{
			if (res.error) {
				return toast({ type: MessageType.Error, body: res.error })
			}
			setReplies(res)
		})
	}, [])

	return (
		<>
		<NavBar />
		<Container>
			{ post && <Post data={post} replyable={true} />}
			{ replies.map(reply=><Post key={reply._id} replyable={false} isReply={true} data={reply} />) }
		</Container>
		</>
	)
}

export default PostPage

const Container = styled.div`
	margin: 0 auto;
	width: 100%;
	max-width: 750px;
	box-sizing: border-box;
	background: rgba(0, 0, 0, 0.3);
	height: 100%;
	border: 1px solid #2F3336;
	border-top: none;
	border-bottom: none;
`