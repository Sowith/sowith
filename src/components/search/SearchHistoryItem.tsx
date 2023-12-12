import { useState } from 'react';
import { styled } from 'styled-components';

import deleteIcon from '../../assets/icon/icon-close.svg';
import textHistoryIcon from '../../assets/icon/icon-history_text.svg';
import userIcon from '../../assets/icon/icon-user.svg';
import groupIcon from '../../assets/icon/icon-users_group-black.svg';
import folderIcon from '../../assets/icon/icon-folder.svg';
import dotIcon from '../../assets/icon/icon-dot.svg';
import tagIcon from '../../assets/icon/icon-tag.svg';
import testImg from '../../assets/testImg/testimg-user.jpg';

// 기능구현 시 하드코딩 되어있는 정보 변경하기
// todo 다음과 같은 기능 구현:
// 1. 유저, 폴더, 그룹 검색 결과의 경우 클릭 시 해당 정보가 위치한 페이지로 이동
// 2. 텍스트 검색 결과 클릭 시 해당 텍스트를 검색 상세 페이지로 전달
// 3. 태그 검색 결과 해당 태그를 게시글 검색 상세 페이지로 전달

type HistoryCategory = 'text' | 'tag' | 'user' | 'folder' | 'group';

export interface HistoryItemProps {
	historyCategory: HistoryCategory;
	title: string;
	relatedPosts?: number;
	followers?: number;
	likes?: number;
	folderTag?: string;
	groupTag?: string;
	isFollowing?: boolean;
	onDelete?: () => void;
}

export const HistoryItem: React.FC<HistoryItemProps> = ({
	historyCategory,
	title,
	relatedPosts,
	followers,
	likes,
	folderTag,
	groupTag,
	isFollowing,
	onDelete,
}) => {
	const handleDeleteHistory = () => {
		if (onDelete) onDelete();
	};

	return (
		<Container historyCategory={historyCategory}>
			<div className='icon-history'>
				<img
					src={
						historyCategory === 'text'
							? textHistoryIcon
							: historyCategory === 'tag'
							? tagIcon
							: testImg
					}
					alt={title}
				/>
			</div>
			<div className='history-info'>
				<span className='history-title'>{title}</span>
				<div className='history-description'>
					{historyCategory === 'text' && <></>}

					{historyCategory === 'tag' && (
						<span className='description-tag'>게시물 {relatedPosts}+개</span>
					)}

					{historyCategory === 'user' && (
						<>
							<img className='icon-category' src={userIcon} alt='' />
							<span className='user-name'>{title}</span>
							<img src={dotIcon} alt='spacing dot' />
							{isFollowing ? (
								<span className='user-state'>팔로잉</span>
							) : (
								<span className='user-state'>팔로워 {followers}명</span>
							)}
						</>
					)}

					{historyCategory === 'folder' && (
						<>
							<img className='icon-category' src={folderIcon} alt='' />
							<span className='like-count'>좋아요 {likes}</span>
							<img src={dotIcon} alt='spacing dot' />
							<span className='folder-tag'>{folderTag}</span>
						</>
					)}

					{historyCategory === 'group' && (
						<>
							<img className='icon-category' src={groupIcon} alt='' />
							<span className='like-count'>좋아요 {likes}</span>
							<img src={dotIcon} alt='spacing dot' />
							<span className='group-tag'>{groupTag}</span>
						</>
					)}
				</div>
			</div>
			<button className='icon-delete' onClick={handleDeleteHistory}>
				<img src={deleteIcon} alt='Delete' />
			</button>
		</Container>
	);
};

const Container = styled.div<{ historyCategory: HistoryCategory }>`
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
