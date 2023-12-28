import { useEffect, useState } from 'react';
import { useFirestoreRead } from 'hooks/useFirestoreRead';
import { useFirestoreUpdate } from 'hooks/useFirestoreUpdate';
import styled from 'styled-components';

import { BackButton } from 'components/common/BackButton';
import { SearchFolderItem } from 'components/search/SearchFolderItem';
import { FolderDataItem } from 'components/search/SearchFolderItem';

export const SearchTrendingFolder: React.FC = () => {
	const [archiveFolderData, setArchiveFolderData] = useState<FolderDataItem[]>(
		[]
	);

	const getCurrentUserUid = () => {
		const token = sessionStorage.getItem('token');
		return token ? JSON.parse(token).uid : null;
	};

	const { UpdatePublicField } = useFirestoreUpdate('folders');

	const firestoreReader = useFirestoreRead('folders');

	const fetchTrendingFolders = async () => {
		const response = await firestoreReader.ReadAllDocument();
		const sortedByLikeCount = response.sort(
			(a, b) =>
				(b.data.likedUsers?.length || 0) - (a.data.likedUsers?.length || 0)
		);

		const folderData: FolderDataItem[] = sortedByLikeCount.map((item) => ({
			folderId: item.id,
			folderImages: item.data.folderImages,
			name: item.data.folderName,
			likedUsers: item.data.likedUsers,
			bookmarkedUsers: item.data.bookmarkedUsers,
			hashtags: item.data.hashtags,
		}));

		setArchiveFolderData(folderData);
	};

	useEffect(() => {
		fetchTrendingFolders();
	}, []);

	const handleLikeToggle = async (folderId: string) => {
		const currentUserUid = getCurrentUserUid();

		if (currentUserUid) {
			try {
				const action = archiveFolderData.some(
					(folder) =>
						folder.folderId === folderId &&
						folder.likedUsers.includes(currentUserUid)
				)
					? { likedUsers: { remove: true } } // 좋아요 제거
					: { likedUsers: { add: true } }; // 좋아요 추가

				await UpdatePublicField(folderId, action);
				fetchTrendingFolders(); // 데이터를 다시 불러옵니다.
			} catch (error) {
				console.error('좋아요 업데이트 실패:', error);
			}
		}
	};

	const handleBookmarkToggle = async (folderId: string) => {
		const currentUserUid = getCurrentUserUid();

		if (currentUserUid) {
			try {
				const action = archiveFolderData.some(
					(folder) =>
						folder.folderId === folderId &&
						folder.bookmarkedUsers.includes(currentUserUid)
				)
					? { bookmarkedUsers: { remove: true } } // 북마크 제거
					: { bookmarkedUsers: { add: true } }; // 북마크 추가

				await UpdatePublicField(folderId, action);
				fetchTrendingFolders(); // 데이터를 다시 불러옵니다.
			} catch (error) {
				console.error('북마크 업데이트 실패:', error);
			}
		}
	};

	return (
		<Container>
			<h1 className='a11y-hidden'>인기 폴더 페이지</h1>
			<TopNav>
				<BackButton />
				<p>인기 폴더</p>
			</TopNav>
			<TrendingFolder>
				{archiveFolderData.map((folderItem) => (
					<SearchFolderItem
						key={folderItem.folderId}
						data={folderItem}
						onLikeToggle={handleLikeToggle}
						onBookmarkToggle={handleBookmarkToggle}
						folderImages={folderItem.folderImages[0]}
					/>
				))}
			</TrendingFolder>
		</Container>
	);
};

const Container = styled.div`
	width: 88%;
	background-color: #ffffff;
	margin: 0 auto;
	padding-bottom: 10px;

	section {
		padding-top: 18px;
	}
`;

const TopNav = styled.div`
	display: flex;
	align-items: center;
	gap: 5px;
	margin-top: 40px;
	p {
		font-size: 1.5rem;
		font-family: var(--font--SemiBold);
	}
`;

const TrendingFolder = styled.section`
	width: 100%;
	padding: 0;
	gap: 5px;
	box-sizing: border-box;
	margin: 0 auto;
	margin-top: 30px;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
`;
