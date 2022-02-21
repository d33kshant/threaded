import { createContext, useContext } from 'react'
import AuthContextInterface from '../types/AuthContext'
import User from '../types/User'

const AuthContext = createContext<AuthContextInterface>({ user: null, login: (user: User)=>{}, logout: ()=>{} })
export const useAuthContext = () => useContext(AuthContext)
const AuthProvider = AuthContext.Provider
export default AuthProvider