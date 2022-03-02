const Post = require('../models/Post')
const User = require('../models/User')
const ObjectId = require('mongoose').Types.ObjectId

const getPost = async (req, res) => {
		const id = req.params.id
		const username = req.user?.username || ""
		if (id) {
			const post = await Post.aggregate([
				{ 
					$match: { "_id": ObjectId(id) } 
				},
				{ 
					$project: {
						body: 1, author: 1, time: 1, board: 1, ref: 1,
						likes: { $size: "$likes" }, replies: { $size: "$replies" },
						liked: { 
							$cond: [{
								$gt: [{
									$size: {
										$setIntersection: ["$likes", [username]]
									}
								}, 0]
							}, true, false] 
						}
					} 
				}
			])
			if (post) {
				res.json(post)
			} else {
				res.json({
					error: "Post not found."
				})
			}
		} else {
			res.json({
				error: "Missing post id in request."
			})
		}
}

const getPosts = async (req, res) => {
	const {board, author} = req.query

	if (!board && !author) {
		return res.status(400).json({
			error: "Either `board` or `author` is required."
		})
	}

	let filter = {}

	if (board) {
		filter.board = board
		filter.ref = ""
	}
	else if (author) filter.author = author


	const username = req.user?.username || ""
	const page = req.query.page || 1
	const POST_PER_PAGE = 10

	try {

		const posts = await Post.aggregate([
			{
				$match: filter,
			},
			{ 
				$project: {
					body: 1, author: 1, time: 1, board: 1, ref: 1,
					likes: { $size: "$likes" }, replies: { $size: "$replies" },
					liked: { 
						$cond: [{
							$gt: [{
								$size: {
									$setIntersection: ["$likes", [username]]
								}
							}, 0]
						}, true, false] 
					}
				} 
			},
			{
				$sort: { time: -1 }
			}
		])

		res.json(posts)

	} catch(error) {
		res.json({
			error: "Something went wrong."
		})
	}
}

const getFeed = async (req, res) => {
	const username = req.user?.username

	if (username) {
		const user = await User.findOne({ username })
		if (!user) {
			return res.json({
				error: "Failed to fetch user info."
			})
		}
		const boards = user.boards
		const posts = await Post.aggregate([
			{
				$match: { board: { $all: boards }, ref: "" }
			},
			{
				$limit: 10,
			},
			{ 
				$project: {
					body: 1, author: 1, time: 1, board: 1, ref: 1,
					likes: { $size: "$likes" }, replies: { $size: "$replies" },
					liked: { 
						$cond: [{
							$gt: [{
								$size: {
									$setIntersection: ["$likes", [username]]
								}
							}, 0]
						}, true, false] 
					}
				} 
			},
			{
				$sort: { time: -1 }
			}
		])
		res.json(posts)
	} else {
		const posts = Post.aggregate([
			{
				$match: { ref: "" }
			},
			{
				$sort: { time: -1 }
			},
			{
				$limit: 10,
			},
			{ 
				$project: {
					body: 1, author: 1, time: 1, board: 1, ref: 1,
					likes: { $size: "$likes" }, replies: { $size: "$replies" },
					liked: { 
						$cond: [{
							$gt: [{
								$size: {
									$setIntersection: ["$likes", [username]]
								}
							}, 0]
						}, true, false] 
					}
				} 
			},
		])
		res.json(posts)
	}
}

const createPost = async (req, res) => {
	const { body, board } = req.body
	const ref = req.body.ref
	const time = new Date()
	const { username: author} = req.user
	const likes = [ author ]

	if (!body || !board) {
		return res.status(400).json({
			error: "Required fields cannot be empty."
		})
	}

	try {

		let refPost
		if (ref) {
			refPost = await Post.findById(ref)
			if (!refPost) {
				return res.json({
					error: "Reference post not found."
				})
			}
		}

		const post = new Post({
			body,
			ref,
			likes,
			time,
			author,
			board
		})

		const { _id: id } = await post.save()

		if (refPost) {
			refPost.replies.push(id)
			await refPost.save()
		}

		res.json({
			post: id,
			message: "New post is created.",
		})
	} catch (error) {
		res.json(error)
	}
}

const likePost = async (req, res) => {
	const { username } = req.user
	const { id: postId } = req.body

	if (!username) {
		return res.status(401).json({
			error: "Failed to authenticate."
		})
	}

	if (!postId) {
		return res.json({
			error: "Post `id` missing in requeest."
		})
	}

	try {
		const post = await Post.findById(postId)
		
		if (!post) {
			return res.status(404).json({
				error: "Post not found."
			})
		}

		if (post.likes.indexOf(username) !== -1) {
			post.likes = post.likes.filter(user=>user!==username)
			await post.save()

			res.json({
				liked: false,
				likes: post.likes.length,
				message: "Post disliked."
			})
		} else {
			post.likes.push(username)
			await post.save()
			
			res.json({
				liked: true,
				likes: post.likes.length,
				message: "Post liked."
			})
		}

	} catch (error) {
		res.status(500).json({
			error: "Something went wrong."
		})
	}
}

const deletePost = async (req, res) => {
	const username = req.user?.username
	const { id } = req.body

	if (!id) {
		return res.json({
			error: "Field `id` missing in request body."
		})
	}

	try {
		const post = await Post.findById(id)
		if (post) {
			if (post.author === username) {
				post.remove((error, result)=>{
					if (error) {
						res.json({
							error: "Failed to delete post."
						})
					} else {
						res.json({
							message: "Post deleted successfully."
						})
					}
				})
			} else {
				res.json({
					error: "Only author can delete the post."
				})
			}
		}
	} catch (error) {
		res.json({
			error: "Something went wrong."
		})
	}
}

const getReplies = async (req, res) => {
	const { id: post } = req.params
	if (!post) {
		return res.json({
			error: "String `post` missing in request."
		})
	}

	try {
		const username = req.user?.username
		const posts = await Post.aggregate([
			{
				$match: { ref: post },
			},
			{ 
				$project: {
					body: 1, author: 1, time: 1, board: 1, ref: 1,
					likes: { $size: "$likes" }, replies: { $size: "$replies" },
					liked: { 
						$cond: [{
							$gt: [{
								$size: {
									$setIntersection: ["$likes", [username]]
								}
							}, 0]
						}, true, false] 
					}
				} 
			},
			{
				$sort: { time: -1 }
			}
		])

		res.json(posts)

	} catch (error) {
		res.json({
			error: "Something went wrong."
		})
	}
}

module.exports = { getPost, getPosts, getFeed, getReplies, createPost, deletePost, likePost }