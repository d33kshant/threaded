import { createContext, useContext } from 'react'
import AuthContextInterface from '../types/AuthContext'

export const AuthContext = createContext<AuthContextInterface>({ user: null, setUser: (user)=>{} })
export const useAuthContext = () => useContext(AuthContext)
const AuthProvider = AuthContext.Provider
export default AuthProvider