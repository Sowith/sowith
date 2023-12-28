import { useEffect, useState } from 'react';
import { useFirestoreRead } from 'hooks/useFirestoreRead';
import { useFirestoreUpdate } from 'hooks/useFirestoreUpdate';
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

	const getCurrentUserUid = () => {
		const token = sessionStorage.getItem('token');
		return token ? JSON.parse(token).uid : null;
	};

	const { UpdatePublicField } = useFirestoreUpdate('folders');

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
				fetchFilteredFolders(); // 데이터를 다시 불러옵니다.
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
				fetchFilteredFolders(); // 데이터를 다시 불러옵니다.
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
