import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

import camera from '../../assets/icon/icon-chat-camera.svg';
import gallery from '../../assets/icon/icon-chat-send.svg';
import add from '../../assets/icon/icon-create-folder.svg';

export const ChatBottomAndContents = () => {
	const textareaRef = useRef<HTMLTextAreaElement | null>(null);
	const chatBottomRef = useRef<HTMLDivElement | null>(null);

	const [message, setMessage] = useState<string>('');
	const [messages, setMessages] = useState<
		Array<{ text: string; timestamp: number }>
	>([]);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [chatBottomHeight, setChatBottomHeight] = useState<number>(0);

	useEffect(() => {
		if (chatBottomRef && chatBottomRef.current) {
			const chatBottomHeight = chatBottomRef.current.clientHeight;
			setChatBottomHeight(chatBottomHeight);
		}
		console.log(chatBottomHeight, '높이');
	}, [message, isModalOpen]);

	const handleChange = (e) => {
		setMessage(e.target.value);
	};

	const handleChatSend = () => {
		if (message) {
			const timestamp = Date.now();
			setMessages([...messages, { text: message, timestamp }]);
			setMessage('');
		}
	};

	const calculateElapsedTime = (timestamp: number) => {
		const messageTime = new Date(timestamp);
		const hours = messageTime.getHours();
		const minutes = messageTime.getMinutes();

		const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')}`;
		return formattedTime;
	};

	const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setMessage(e.currentTarget.value);
		if (textareaRef && textareaRef.current) {
			textareaRef.current.style.height = '0px';
			const scrollHeight = textareaRef.current.scrollHeight;
			textareaRef.current.style.height = scrollHeight + 'px';
		}
	};

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			<ChatRoomWrap>
				<ChatRoom
					style={{ height: `calc(100vh - 80px - ${chatBottomHeight}px)` }}
				>
					{messages.map((msg, index) => (
						<div className='massage-wrap'>
							<div className='timestamp'>
								{calculateElapsedTime(msg.timestamp)}
							</div>
							<ChatMessage>{msg.text}</ChatMessage>
						</div>
					))}
				</ChatRoom>
				<ChatBottom ref={chatBottomRef}>
					{isModalOpen && (
						<Modal>
							<div className='modal-content'>
								<button>
									<div>
										<img src={camera}></img>
										<span>카메라</span>
									</div>
								</button>
							</div>
							<div className='modal-content'>
								<button>
									<div>
										<img src={gallery}></img>
										<span>갤러리</span>
									</div>
								</button>
							</div>
						</Modal>
					)}
					<div className='chat-bottom-box'>
						<button onClick={openModal}>
							<img src={camera}></img>
						</button>

						<textarea
							ref={textareaRef}
							value={message}
							rows={1}
							onChange={onChange}
							autoFocus
						/>
						<button style={{ marginRight: '5px' }} onClick={handleChatSend}>
							<img src={gallery}></img>
						</button>
					</div>
				</ChatBottom>
			</ChatRoomWrap>
		</>
	);
};

const ChatRoomWrap = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

const ChatRoom = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	margin-right: 20px;
	margin-top: 80px;
	overflow-y: auto;

	& .massage-wrap {
		display: flex;
		flex-direction: row;
		align-items: flex-end;
		max-width: 70vw;

		& .timestamp {
			color: var(--gray300-color);
			font-size: 14px;
			margin-right: 10px;
      margin-bottom: 10px;
		}
	}
`;

const ChatMessage = styled.div`
	background-color: var(--main-color);
	padding: 7px 10px;
	margin-bottom: 10px;
	border-radius: 10px;
	width: auto;
`;

const ChatBottom = styled.div`
	border-top: 1px solid var(--gray100-color);
	padding: 15px 0;
	width: 100%;
	max-height: 182px;

	& .chat-bottom-box {
		display: flex;
		width: 90%;
		border: 2px solid var(--main-color);
		justify-content: space-between;
		margin: 0 auto;
		border-radius: 10px;
		min-height: 40px;

		& textarea {
			border: none;
			width: calc(100% - 100px);
			margin: 10px 0 5px;
			outline: none;
			resize: none;
			font-size: 16px;
			line-height: 1.5;
			max-height: 152px;
		}

		& img:first-child {
			margin: 5px 0 5px 5px;
		}

		& img:nth-child(3) {
			margin: 0 5px;
			width: 30px;
		}
	}
`;

const Modal = styled.div`
	width: calc(100% - 100px);
	margin: 0 auto 20px;
	height: 50px;
	display: flex;

	& .modal-content {
		display: flex;
		flex-direction: column;
		width: 50%;

		& button {
			height: 50px;

			& > div {
				display: flex;
				flex-direction: column;

				& > span {
					color: var(--gray300-color);
				}
			}
		}

		& img {
			width: 30px;
			text-align: center;
			margin: 0 auto 5px;
		}
	}
`;
