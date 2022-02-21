import { createContext, useContext } from "react"
import Message from "../types/Message"

const ToastContext = createContext((message: Message)=>{})
export const useToastContext = () => useContext(ToastContext)

export default ToastContext.Provider