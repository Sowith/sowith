import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFirestoreUpdate } from 'hooks/useFirestoreUpdate';
import styled from 'styled-components';

import formatNumber from 'utils/formatNumber';
import { arrayUnion } from 'firebase/firestore';

import dotIcon from '../../assets/icon/icon-dot.svg';

export interface AccountItemProps {
	id: string;
	accountId: string;
	accountName: string;
	followers: string[];
	profileImageURL: string;
}

export const AccountItem: React.FC<AccountItemProps> = ({
	accountId,
	accountName,
	followers,
	profileImageURL,
	id,
}) => {
	let [isFollowing, setIsFollowing] = useState(false);
	const token = sessionStorage.getItem('token');
	const currentUserUid = token ? JSON.parse(token).uid : null;
	const { UpdateFieldUid } = useFirestoreUpdate('users');
	const navigate = useNavigate();

	const handleAccountClick = async () => {
		const newHistory = {
			title: accountId,
			historyCategory: 'profile',
			historyImg: profileImageURL,
			followerCount: followers.length,
			uid: id,
		};
		try {
			await UpdateFieldUid(currentUserUid, {
				searchHistories: arrayUnion(newHistory),
			});
			console.log('검색 기록이 업데이트되었습니다');
		} catch (error) {
			console.error('검색 기록 업데이트 실패:', error);
		}
		navigate(`/profile/view/${id}`);
	};

	useEffect(() => {
		setIsFollowing(followers.includes(currentUserUid));
	}, [followers, currentUserUid]);

	return (
		<Container onClick={handleAccountClick}>
			<div className='icon-user'>
				<img src={profileImageURL} alt='' />
			</div>
			<div className='user-info'>
				<span className='user-accountId'>{accountId}</span>
				<div className='user-description'>
					<span className='user-accountName'>{accountName}</span>
					<img src={dotIcon} alt='spacing dot' />
					{isFollowing ? (
						<span className='user-state'>팔로잉</span>
					) : (
						<span className='user-state'>{`팔로워 ${formatNumber(
							followers?.length
						)} 명`}</span>
					)}
				</div>
			</div>
		</Container>
	);
};

const Container = styled.div`
	cursor: pointer;
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

	span.user-accountId {
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
