import User from './User'

export default interface AuthContext {
	user: User | null,
	login: (user: User)=>void,
	logout: ()=>void,
}