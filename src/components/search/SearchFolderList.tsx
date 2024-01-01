import { useEffect, useState } from 'react';
import { useFirestoreRead } from 'hooks/useFirestoreRead';
import { useFirestoreUpdate } from 'hooks/useFirestoreUpdate';
import getUserInfo from 'utils/getUserInfo';
import { styled } from 'styled-components';

import { SearchFolderItem, FolderDataItem } from './SearchFolderItem';

interface SearchFolderListProps {
	searchKeyword: string;
}

export const SearchFolderList: React.FC<SearchFolderListProps> = ({
	searchKeyword,
}) => {
	const [archiveFolderData, setArchiveFolderData] = useState<FolderDataItem[]>(
		[]
	);
	const userInfo = getUserInfo();
	console.log(userInfo);

	const { UpdateField } = useFirestoreUpdate('folders');

	const firestoreReader = useFirestoreRead('folders');

	const fetchFilteredFolders = async () => {
		const response = await firestoreReader.ReadField(
			'folderNameKeywords',
			'array-contains-any',
			[searchKeyword]
		);

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
		fetchFilteredFolders();
	}, [searchKeyword]);

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
				fetchFilteredFolders();
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
				fetchFilteredFolders();
			} catch (error) {
				console.error('북마크 업데이트 실패:', error);
			}
		}
	};

	return (
		<Container>
			{archiveFolderData.map((folderItem) => (
				<SearchFolderItem
					key={folderItem.folderId}
					data={folderItem}
					onLikeToggle={handleLikeToggle}
					onBookmarkToggle={handleBookmarkToggle}
					folderImages={folderItem.folderImages[0]}
				/>
			))}
		</Container>
	);
};

const Container = styled.section`
	width: 88%;
	padding: 0;
	gap: 5px;
	box-sizing: border-box;
	margin: 0 auto;
	margin-top: 30px;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
`;
