export enum MessageType {
	Success,
	Error,
}

export default interface Message{
	type: MessageType,
	body: string,
}