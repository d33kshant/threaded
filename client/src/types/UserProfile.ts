export default interface UserProfile {
	username: string,
	email: string,
	avatar: string,
	bio: string,
	joined: Date,
	follower: number,
	following: number,
	isFollower: boolean,
	inFollowing: boolean,
}