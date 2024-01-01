import { useEffect, useState } from 'react';
import { useFirestoreRead } from 'hooks/useFirestoreRead';
import { useFirestoreUpdate } from 'hooks/useFirestoreUpdate';
import getUserInfo from 'utils/getUserInfo';
import { styled } from 'styled-components';

import {
	SearchTrendingFolderItem,
	FolderDataItem,
} from './SearchTrendingFolderItem';

export const SearchTrendingFolderList: React.FC = () => {
	const [archiveFolderData, setArchiveFolderData] = useState<FolderDataItem[]>(
		[]
	);

	const userInfo = getUserInfo();

	const { UpdateField } = useFirestoreUpdate('folders');

	const firestoreReader = useFirestoreRead('folders');

	const fetchTrendingFolders = async () => {
		const response = await firestoreReader.ReadAllDocument();

		const folderData: FolderDataItem[] = response.map((item) => ({
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
		if (userInfo) {
			try {
				const folder = archiveFolderData.find(
					(folder) => folder.folderId === folderId
				);
				const newLikedUsers =
					folder && folder.likedUsers.includes(userInfo)
						? folder.likedUsers.filter((userId) => userId !== userInfo)
						: [...(folder?.likedUsers || []), userInfo];

				await UpdateField({ likedUsers: newLikedUsers }, folderId, false);
				fetchTrendingFolders();
			} catch (error) {
				console.error('좋아요 업데이트 실패:', error);
			}
		}
	};

	const handleBookmarkToggle = async (folderId: string) => {
		if (userInfo) {
			try {
				const folder = archiveFolderData.find(
					(folder) => folder.folderId === folderId
				);
				const newBookmarkedUsers =
					folder && folder.bookmarkedUsers.includes(userInfo)
						? folder.bookmarkedUsers.filter((userId) => userId !== userInfo)
						: [...(folder?.bookmarkedUsers || []), userInfo];

				await UpdateField(
					{ bookmarkedUsers: newBookmarkedUsers },
					folderId,
					false
				);
				fetchTrendingFolders();
			} catch (error) {
				console.error('북마크 업데이트 실패:', error);
			}
		}
	};

	return (
		<Container>
			{archiveFolderData.map((folderItem) => (
				<SearchTrendingFolderItem
					key={folderItem.folderId}
					data={folderItem}
					onLikeToggle={handleLikeToggle}
					onBookmarkToggle={handleBookmarkToggle}
					src={folderItem.folderImages[0]}
				/>
			))}
		</Container>
	);
};

const Container = styled.section`
	width: 88%;
	padding: 0;
	gap: 10px;
	box-sizing: border-box;
	margin: 0 auto;
	display: flex;
	overflow: auto;
`;
