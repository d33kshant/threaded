import Post from "./Post";

export default interface PostProps {
	data: Post,
	isReply?: boolean,
	replyable?: boolean,
}