import React, { useEffect, useRef } from "react"
import styled from "styled-components"
import PostReplyProp from "../types/PostReplyProp"
import Button from "./Button"

const PostReplyModal: React.FC<PostReplyProp> = ({ post, close }) => {

	const inputRef = useRef<HTMLDivElement>(null)

	useEffect(()=>{
		inputRef.current?.focus()
	})

	const onSubmitReply = () => {
		alert(inputRef.current?.innerText)
	}

	return (
		<Background onClick={close}>
			<Container onClick={event=>event.stopPropagation()}>
				<CloseButton onClick={close}>
					<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
				</CloseButton>
				<Input ref={inputRef} contentEditable={true} placeholder="Write you reply here..." />
				<PostButton onClick={onSubmitReply}>Post</PostButton>
			</Container>
		</Background>
	)
}

export default PostReplyModal

const Background = styled.div`
	position: fixed;
	background: #5b708366;
	height: 100vh;
	width: 100vw;
	top: 0;
	left: 0;
	z-index: 50000;
	display: flex;
	justify-content: center;
	align-items: center;
`

const Container = styled.div`
	background: black;
	border-radius: 16px;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	padding: 16px;
	width: max-content;
	gap: 16px;
	min-width: 300px;
	margin-bottom: 8rem;
	cursor: default;
`

const CloseButton = styled.button`
	border: none;
	background: none;
	padding: 0;
	cursor: pointer;
`

const Input = styled.div`
	width: 100%;
	border: none;
	background: none;
	resize: vertical;
	font-family: inherit;
	font-size: 16px;
	outline: none;
	cursor: text;

	:empty::before {
		content: attr(placeholder);
		color: gray;
	}
`

const PostButton = styled(Button)`
	background: #1d9bf0;
	color: white;
	margin: 4px 0;

	:disabled {
		opacity: 0.5;
	}
`