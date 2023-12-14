import { useState } from 'react';
import styled from 'styled-components';

import dotIcon from '../../assets/icon/icon-dot.svg';

export interface AccountItemProps {
	id: string;
	accountName: string;
	userName: string;
	follower: string[];
	profileImageURL: string;
}

export const AccountItem: React.FC<AccountItemProps> = ({
	accountName,
	userName,
	follower,
	profileImageURL,
}) => {
	let [isFollowing, setIsFollowing] = useState(false);

	return (
		<Container>
			<div className='icon-user'>
				<img src={profileImageURL} alt='' />
			</div>
			<div className='user-info'>
				<span className='user-accountname'>{accountName}</span>
				<div className='user-description'>
					<span className='user-nickname'>{userName}</span>
					<img src={dotIcon} alt='spacing dot' />
					{isFollowing ? (
						<span className='user-state'>팔로잉</span>
					) : (
						<span className='user-state'>팔로워 {follower?.length} 명</span>
					)}
				</div>
			</div>
		</Container>
	);
};

const Container = styled.div`
	background-color: #ffffff;
	display: flex;
	margin: 10px auto;
	width: 88%;

	div.icon-user {
		border-radius: 50%;
		width: 50px;
		height: 50px;
		align-self: center;
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;

		img {
			width: 100%;
			aspect-ratio: 1 / 1;
			object-fit: cover;
		}
	}

	div.user-info {
		padding: 5px 10px;
		display: flex;
		flex-direction: column;
		gap: 5px;
	}

	div.user-info span {
		display: block;
	}

	span.user-accountname {
		font-family: var(--font--Medium);
		font-size: 1rem;
	}

	div.user-description {
		display: flex;
		gap: 5px;

		span {
			font-size: 0.8rem;
			color: #898888;
		}
	}
`;
