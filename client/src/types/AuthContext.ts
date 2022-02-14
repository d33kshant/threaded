import User from './User'

export default interface AuthContext {
	user: User | null,
	setUser: (user: User | null)=>void
}