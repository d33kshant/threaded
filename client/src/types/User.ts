export default interface User {
	_id: string,
	username: string,
	email: string,
	token: string,
	avatar: string,
	bio: string,
	follow: string[],
	boards: string[],
	joined: Date,
}