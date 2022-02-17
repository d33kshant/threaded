import React, { useEffect, useState } from "react"
import BoardPostsProps from "../types/BoardPostsProps"
import Post from "../types/Post"

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
		<div>
			{ posts.length > 0 ? posts.map(post=><p key={post._id}>{post.body}</p>) : "Nothing to show here" }
		</div>
	)
}

export default BoardPosts