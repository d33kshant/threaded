import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import Button from "../components/Button"
import NavBar from "../components/NavBar"
import PostItem from "../components/Post"
import { useToastContext } from "../contexts/ToastContext"
import { MessageType } from "../types/Message"
import Post from "../types/Post"

const HomePage: React.FC = () => {
	
	const inputRef = useRef<HTMLDivElement>(null)
	const [loading, setLoading] = useState<boolean>(true)
	const [posts, setPosts] = useState<Post[]>([])

	const toast = useToastContext()

	useEffect(()=>{
		fetch(`/api/post/feed`).then(res=>res.json())
		.then(res=>{
			if(res.error) {
				return toast({ type: MessageType.Error, body: res.error })
			}
			setPosts(res)
			setLoading(false)
		})
	}, [])

	const createNewPost = () => {
		alert(inputRef.current?.innerText)
		if (inputRef.current){
			inputRef.current.innerText = ''
		}
	}

	return (
		<>
		<NavBar />
		<Container>
			<NewPost>
				<NewPostInput ref={inputRef} contentEditable={true} placeholder="What's happening ?" />
				<PostButton onClick={createNewPost}>Post</PostButton>
			</NewPost>
			<PostsList>
				{ loading && "Loading..." }
				{ (!loading && posts.length <= 0) && "No post Found" }
				{ (!loading && posts.length > 0) && posts.map(post=><PostItem key={post._id} data={post} isReply={!!post.ref} replyable={!post.ref} />) }
			</PostsList>	
		</Container>
		</>
	)
}

export default HomePage

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

const NewPost = styled.div`
	border-bottom: 1px solid #2F3336;
	padding: 8px 16px;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	gap: 8px;
	align-items: flex-end;
`

const NewPostInput = styled.div`
	width: 100%;
	border: none;
	background: none;
	resize: vertical;
	font-family: inherit;
	font-size: 16px;
	outline: none;
	cursor: text;

	:empty::before {
		content: attr(placeholder);
		color: gray;
	}
`

const PostButton = styled(Button)`
	background: #1d9bf0;
	color: white;
	margin: 4px 0;

	:disabled {
		opacity: 0.5;
	}
`

const PostsList = styled.div`
	display: flex;
	flex-direction: column;
`