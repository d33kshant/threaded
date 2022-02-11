import { createContext } from 'react'
import AuthContextInterface from '../types/AuthContext'

export const AuthContext = createContext<AuthContextInterface | null>(null)
const AuthProvider = AuthContext.Provider
export default AuthProvider