const Board = require('../models/Board')
const User = require('../models/User')

const getBoard = async (req, res) => {
	const username = req.user?.username
	const { name } = req.params

	try {
		if (name) {
			const board = await Board.findOne({ name }, { _id: 0, __v: 0 })

			if(!board) {
				return res.json({
					error: "Board not found."
				})
			}

			const members = await User.find({ board: name }).count()
			const joined = await User.find({ username, boards: name }).count() !== 0
			res.json({
				...board._doc,
				members: members,
				joined
			})
		}
	} catch (error) {
		res.status(500).json({
			error: "Something went wrong."
		})
	}
}

const createBoard = async (req, res) => {
	const { username: creator } = req.user
	const { name } = req.body
	const about = req.body.about || ""
	const icon = req.body.icon || ""
	const banner = req.body.banner || ""

	try {

		if (await Board.find({ name })) {
			return res.json({
				error: "Board already exist."
			})
		}

		if (name) {
			const board = new Board({
				creator,
				name,
				about,
				icon,
				banner,
				created: new Date()
			})

			const { _id: id } = await board.save()
			if (id) {
				res.json({
					board: id,
					message: "New board is created." 
				})
			} else {
				res.status(500).json({
					error: "Something went wrong, Try again later."
				})
			}

		} else {
			res.status(400).json({
				error: "Required field cannot be empty."
			})
		}
	} catch (error) {
		res.status(500).json({
			error: "Something went wrong, Try again later."
		})
	}
}

const joinBoard = async (req, res) => {
	const { username, id } = req.user
	const { name: board } = req.body

	if (!username) {
		return res.status(401).json({
			error: "Failed to authenticate."
		})
	}

	if (!board) {
		return res.json({
			error: "Board `name` missing in requeest."
		})
	}

	try {
		const user = await User.findById(id)
		const _board = await Board.findOne({ name: board })

		if(!_board) {
			return res.json({
				error: "Board not found."
			})
		}

		if (board) {
			if (user.boards.indexOf(board) !== -1) {
				user.boards = user.boards.filter(joined=>joined!==board)
				user.save((error, result) => {
					if (!error) {
						res.json({
							joined: false,
							message: `Successfully left ${board}.`
						})
					} else {
						res.json({
							error: `Failed to leave ${board}.`
						})
					}
				})
			} else {
				user.boards.push(board)
				user.save((error, result) => {
					if (!error) {
						res.json({
							joined: true,
							message: `Successfully joined ${board}.`
						})
					} else {
						res.json({
							error: `Failed to join ${board}.`
						})
					}
				})
			}
		} else {
			return res.status(404).json({
				error: "Board not found."
			})
		}

	} catch(error) {
		res.json({
			error: "Something went wrong, Try again later."
		})
	}
}

module.exports = { getBoard, createBoard, joinBoard }