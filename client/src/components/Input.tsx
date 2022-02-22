import styled from "styled-components"

const Input = styled.input`
	padding: 8px;
	border: 1px solid #6e767d;
	border-radius: 4px;
	font-family: inherit;
	background: none;

	:focus-visible {
		outline: 1px solid #1d9bf0;
		border-color: #1d9bf0;
	}
`

export default Input