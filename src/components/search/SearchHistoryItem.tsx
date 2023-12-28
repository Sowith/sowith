import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import formatNumber from 'utils/formatNumber';

import deleteIcon from '../../assets/icon/icon-close.svg';
import textHistoryIcon from '../../assets/icon/icon-history_text.svg';
import userIcon from '../../assets/icon/icon-user.svg';
// import groupIcon from '../../assets/icon/icon-users_group-black.svg';
import folderIcon from '../../assets/icon/icon-folder.svg';
import dotIcon from '../../assets/icon/icon-dot.svg';
import tagIcon from '../../assets/icon/icon-tag.svg';

type HistoryCategory = 'text' | 'tag' | 'profile' | 'folder' | 'group';

export interface HistoryItemProps {
	historyCategory: HistoryCategory;
	title: string;
	tagCount?: number;
	followerCount?: number;
	likeCount?: number;
	folderTag?: string;
	groupTag?: string;
	isFollowing?: boolean;
	historyImg?: string;
	uid?: string;
	onDelete?: () => void;
}

export const HistoryItem: React.FC<HistoryItemProps> = ({
	historyCategory,
	title,
	tagCount,
	followerCount,
	likeCount,
	folderTag,
	groupTag,
	isFollowing,
	historyImg,
	uid,
	onDelete,
}) => {
	const navigate = useNavigate();

	const handleDeleteHistory = (event) => {
		event.stopPropagation();
		if (onDelete) onDelete();
	};

	const handleItemClick = () => {
		switch (historyCategory) {
			case 'text':
			case 'tag':
				navigate('/searchbycategory', { state: title });
				break;
			default:
				navigate(`/${historyCategory}/view/${uid}`);
				break;
		}
	};

	return (
		<Container historyCategory={historyCategory} onClick={handleItemClick}>
			<div className='icon-history'>
				<img
					src={
						historyCategory === 'text'
							? textHistoryIcon
							: historyCategory === 'tag'
							? tagIcon
							: historyImg
					}
					alt={title}
				/>
			</div>
			<div className='history-info'>
				<span className='history-title'>{title}</span>
				<div className='history-description'>
					{historyCategory === 'text' && <></>}

					{historyCategory === 'tag' && (
						<span className='description-tag'>{`게시물 ${formatNumber(
							tagCount
						)}개`}</span>
					)}

					{historyCategory === 'profile' && (
						<>
							<img className='icon-category' src={userIcon} alt='' />
							<span className='user-name'>{title}</span>
							<img src={dotIcon} alt='spacing dot' />
							{isFollowing ? (
								<span className='user-state'>팔로잉</span>
							) : (
								<span className='user-state'>{`팔로워 ${formatNumber(
									followerCount
								)}명`}</span>
							)}
						</>
					)}

					{historyCategory === 'folder' && (
						<>
							<img className='icon-category' src={folderIcon} alt='' />
							<span className='like-count'>{`좋아요 ${formatNumber(
								likeCount
							)}개`}</span>
							<img src={dotIcon} alt='spacing dot' />
							<span className='folder-tag'>{folderTag}</span>
						</>
					)}

					{/* {historyCategory === 'group' && (
						<>
							<img className='icon-category' src={groupIcon} alt='' />
							<span className='like-count'>{`좋아요 ${formatNumber(
								likes
							)}개`}</span>
							<img src={dotIcon} alt='spacing dot' />
							<span className='group-tag'>{groupTag}</span>
						</>
					)} */}
				</div>
			</div>
			<button className='icon-delete' onClick={handleDeleteHistory}>
				<img src={deleteIcon} alt='Delete' />
			</button>
		</Container>
	);
};

const Container = styled.div<{ historyCategory: HistoryCategory }>`
	cursor: pointer;
	background-color: #ffffff;
	display: flex;
	min-height: 50px;
	margin: 10px auto 10px auto;
	width: 88%;

	div.icon-history {
		border-radius: 50%;
		border: ${(props) =>
			props.historyCategory === 'text' || props.historyCategory === 'tag'
				? '1px solid var(--gray200-color)'
				: 'none'};
		width: 50px;
		height: 50px;
		align-self: center;
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;

		img {
			width: ${(props) =>
				props.historyCategory !== 'text' && props.historyCategory !== 'tag'
					? '100%'
					: undefined};
			aspect-ratio: 1 / 1;
			object-fit: cover;
		}
	}

	div.history-info {
		margin: auto 0;
		padding: 10px 15px;
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		gap: 5px;
	}

	div.history-info span {
		display: block;
	}

	span.history-title {
		font-family: var(--font--regular);
		font-size: 1rem;
	}

	div.history-description {
		display: flex;
		gap: 5px;

		span {
			font-size: 0.9rem;
			color: #898888;
		}
	}

	img.icon-category {
		width: 0.8rem;
		height: 0.8rem;
		align-self: center;
	}

	button.icon-delete {
		cursor: pointer;
		align-self: center;
		display: flex;
		justify-content: center;
		align-items: center;
	}
`;
