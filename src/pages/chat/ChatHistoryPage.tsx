import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { SearchBar } from 'components/search/SearchBar';
import { ChatHistoryUserUI } from 'components/chat/ChatHistoryUserUI';
import { Button } from '../../components/common/Button';

import logoHeart from '../../assets/logo/logo-heart.svg';

export const ChatHistoryPage = () => {
	const [isHistory, setIsHistory] = useState(true);

	const navigate = useNavigate();
	const goToChatSelectUser = () => {
		navigate('/chatSelectUser');
	};

	return (
		<>
			<SearchBar></SearchBar>
			<ChatTop>
				<span>메세지</span>
				<Button
					text='세 메세지'
					width='80px'
					borderRadius='5px'
					padding='5px'
					margin='0'
					onClick={goToChatSelectUser}
				></Button>
			</ChatTop>
			{isHistory ? (
				<section>
					<ChatHistoryUserUI />
					<ChatHistoryUserUI />
					<ChatHistoryUserUI />
				</section>
			) : (
				<NoHistory>
					<img src={logoHeart} alt='sowith 하트 모양 로고'></img>
					<p>메세지 내역이 없어요</p>
				</NoHistory>
			)}
		</>
	);
};

const ChatTop = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 88%;
	margin: 0 auto;

	& span {
		font-size: 16px;
		font-family: var(--font--SemiBold);
	}
`;

const NoHistory = styled.div`
	position: absolute;
	top: 40%;
	left: 50%;
	transform: translate(-50%, -40%);

	& img {
		opacity: 35%;
		display: block;
		margin: 0 auto;
	}

	& p {
		margin-top: 20px;
		color: var(--gray200-color);
	}
`;
