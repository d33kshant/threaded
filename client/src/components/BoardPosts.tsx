import React, { useEffect, useState } from "react"
import styled from "styled-components"
import BoardPostsProps from "../types/BoardPostsProps"
import Post from "../types/Post"
import PostItem from "./Post"

const BoardPosts: React.FC<BoardPostsProps> = ({ board }) => {
	const [posts, setPosts] = useState<Post[]>([])
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(()=>{
		fetch(`/api/post?board=${board}`)
		.then(res=>res.json()).then(res=>{
			if (res.error) {
				return alert(res.error)
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
			{ posts.length > 0 ? posts.map(post=><PostItem key={post._id} data={post} />) : "Nothing to show here" }
		</Container>
	)
}

export default BoardPosts

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
`