export default interface Post {
	_id: string,
	body: string,
	time: string,
	author: string,
	ref: string,
	board: string,
	likes: number,
	replies: number,
	liked: boolean,
}