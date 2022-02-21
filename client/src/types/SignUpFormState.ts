export default interface SignUpFormState {
	username: string,
	email: string,
	password: string,
	confirmPassword: string,
	[key: string]: string,
}