const Post = require('../models/Post')
const ObjectId = require('mongoose').Types.ObjectId

const getPost = async (req, res) => {
	try {
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
						likes: { $size: "$likes" },
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
				res.status(404).json({
					error: "Post not found."
				})
			}
		} else {
			res.status(400).json({
				error: "Missing post id in request."
			})
		}
	} catch (error) {
		res.status(500).json({
			error: "Something went wrong."
		})
	}
}

const getPosts = async (req, res) => {
	const board = req.query.board

	if (!board) {
		return res.status(400).json({
			error: "Board name is required."
		})
	}

	const username = req.user?.username || ""
	const page = req.query.page || 1
	const POST_PER_PAGE = 10

	try {

		const posts = await Post.aggregate([
			{
				$match: { board },
			},
			{ 
				$project: {
					body: 1, author: 1, time: 1, board: 1, ref: 1,
					likes: { $size: "$likes" },
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

const createPost = async (req, res) => {
	const { body, board } = req.body
	const ref = req.body.ref || ""
	const time = new Date()
	const { username: author} = req.user
	const likes = [ author ]

	if (!body || !board) {
		return res.status(400).json({
			error: "Required fields cannot be empty."
		})
	}

	try {

		const post = new Post({
			body,
			ref,
			likes,
			time,
			author,
			board
		})

		const { _id: id } = await post.save()
		res.json({
			post: id,
			message: "New post is created.",
		})
	} catch (error) {
		res.json(error)
	}
}

module.exports = { getPost, getPosts, createPost }