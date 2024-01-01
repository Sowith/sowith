import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useFirestoreUpdate } from 'hooks/useFirestoreUpdate';
import getUserInfo from 'utils/getUserInfo';
import { arrayUnion } from 'firebase/firestore';
import { ReactComponent as IconBookmark } from '../../assets/icon/icon-bookmark.svg';

import heartUnfilled from '../../assets/icon/icon-heart_unfilled.svg';
import heartFilled from '../../assets/icon/icon-heart_filled.svg';
import formatNumber from 'utils/formatNumber';

export interface FolderDataItem {
	folderId: string;
	folderImages: string[];
	name: string;
	likedUsers: string[];
	bookmarkedUsers: string[];
	hashtags: string[];
}

interface FolderItemProps {
	data: FolderDataItem;
	onLikeToggle: (folderId: string) => void;
	onBookmarkToggle: (folderId: string) => void;
	folderImages: string;
}

export const SearchFolderItem: React.FC<FolderItemProps> = ({
	data,
	onLikeToggle,
	onBookmarkToggle,
}) => {
	const maxTagCount = 3;

	const { UpdateField } = useFirestoreUpdate('users');
	const navigate = useNavigate();
	const userInfo = getUserInfo();
	const handleFolderClick = async () => {
		const newHistory = {
			title: data.name,
			historyCategory: 'folder',
			historyImg: data.folderImages[0],
			folderTag:
				data.hashtags && data.hashtags.length > 0
					? data.hashtags[0]
					: '태그 없음',
			likeCount: data.likedUsers.length,
			uid: data.folderId,
		};

		try {
			await UpdateField(
				{ searchHistories: arrayUnion(newHistory) },
				userInfo,
				false
			);

			console.log('검색 기록이 업데이트되었습니다');
		} catch (error) {
			console.error('검색 기록 업데이트 실패:', error);
		}

		navigate(`/folder/view/${data.folderId}`);
	};

	const isLiked = () => {
		return data.likedUsers.includes(userInfo);
	};

	const isBookmarked = () => {
		return data.bookmarkedUsers.includes(userInfo);
	};

	const handleLikeClick = (event) => {
		event.stopPropagation();
		if (!userInfo) {
			console.log('좋아요를 누르려면 로그인 하세요');
			return;
		}
		onLikeToggle(data.folderId);
	};

	const handleBookmarkClick = (event) => {
		event.stopPropagation();
		if (!userInfo) {
			console.log('북마크를 누르려면 로그인 하세요');
			return;
		}
		onBookmarkToggle(data.folderId);
	};

	return (
		<Container
			style={{ backgroundImage: `url(${data.folderImages[0]})` }}
			onClick={handleFolderClick}
		>
			<BlackOverlay />
			<FolderDescription>
				<p>{data.name}</p>
				<FolderTagList>
					{data.hashtags.slice(0, maxTagCount).map((tag, index) => (
						<FolderTagItem key={index}>
							<HashTag># </HashTag>
							{tag}
						</FolderTagItem>
					))}

					{data.hashtags.length > maxTagCount && (
						<NumberHiddenFolderTagItem>
							+{data.hashtags.length - maxTagCount}
						</NumberHiddenFolderTagItem>
					)}
				</FolderTagList>
			</FolderDescription>
			<FolderInfo>
				<FolderLike>
					{isLiked() ? (
						<img
							src={heartFilled}
							alt='Heart Filled'
							onClick={handleLikeClick}
						/>
					) : (
						<img
							src={heartUnfilled}
							alt='Heart Unfilled'
							onClick={handleLikeClick}
						/>
					)}
					<span>{formatNumber(data.likedUsers.length)}</span>
				</FolderLike>
				<IconBookmark
					fill={isBookmarked() ? '#FFDF44' : '#C4C4C4'}
					stroke={isBookmarked() ? '#FFDF44' : 'none'}
					onClick={handleBookmarkClick}
				/>
			</FolderInfo>
		</Container>
	);
};

const Container = styled.div`
	cursor: pointer;
	position: relative;
	width: calc((100% / 2) - 4px);
	display: flex;
	flex-shrink: 0;
	flex-direction: column;
	justify-content: space-between;
	aspect-ratio: 1 / 1;
	box-sizing: border-box;
	border-radius: 5px;
	padding: 10px;
	background-size: cover;

	> img {
		z-index: 0;
	}

	> * {
		z-index: 1;
	}
`;

const BlackOverlay = styled.div`
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background-color: #000000;
	border-radius: 5px;
	opacity: 0.7;
`;

const FolderDescription = styled.div`
	> p {
		font-family: var(--font--Bold);
		color: #ffffff;
		font-size: 2rem;
		margin-bottom: 5px;
		padding: 5px 7px;
		overflow-wrap: break-word;
		letter-spacing: 1px;
	}

	@media (max-width: 576px) {
		> p {
			font-size: 1rem;
		}
	}
`;

const FolderTagList = styled.div`
	display: flex;
	gap: 2px;
	flex-wrap: wrap;
	flex: 1;
	padding: 5px 5px;
`;

const HashTag = styled.span`
	color: var(--main-color);
`;

const FolderTagItem = styled.p`
	border-radius: 3px;
	font-family: var(--font--Regular);
	font-size: 1rem;
	color: #ffffff;
	padding: 0px 3px;
	text-align: start;
	margin: 0;

	@media (max-width: 576px) {
		font-size: 0.8rem;
	}
`;

const NumberHiddenFolderTagItem = styled.p`
	border-radius: 5px;
	font-family: var(--font--Regular);
	font-size: 1rem;
	background-color: var(--main-color);
	color: #ffffff;
	padding: 0px 7px;
	text-align: start;
	margin: 0;

	@media (max-width: 576px) {
		font-size: 0.8rem;
	}
`;

const FolderInfo = styled.div`
	padding: 5px 5px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const FolderLike = styled.div`
	display: flex;
	gap: 4px;
	img {
		width: 30px;
		height: 30px;
	}

	span {
		align-self: center;
		font-size: 1rem;
		font-family: var(--font--Regular);
		color: #ffffff;
	}
`;
