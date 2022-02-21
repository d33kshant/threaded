import Message from "./Message";

export default interface ToastContext {
	toast: (message: Message) => void,
}