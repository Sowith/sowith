import { useEffect, useState } from 'react';
import { useFirestoreRead } from 'hooks/useFirestoreRead';
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

	const firestoreReader = useFirestoreRead('folders');

	useEffect(() => {
		const fetchFilteredFolders = async () => {
			const response = await firestoreReader.ReadField(
				'tags',
				'array-contains-any',
				[searchKeyword]
			);

			const folderData: FolderDataItem[] = response.map((item) => ({
				folderId: item.id,
				folderImages: item.data.folderImages,
				name: item.data.name,
				likeCount: item.data.likeCount,
				like: item.data.like,
				bookmark: item.data.bookmark,
				tags: item.data.tags,
			}));

			setArchiveFolderData(folderData);
		};

		fetchFilteredFolders();
	}, [searchKeyword]);

	const handleLikeToggle = (folderId: string) => {
		const updatedFolderData = [...archiveFolderData];
		const folderIndex = updatedFolderData.findIndex(
			(folder) => folder.folderId === folderId
		);

		if (folderIndex !== -1) {
			const folder = updatedFolderData[folderIndex];
			folder.like = !folder.like;
			if (folder.like) {
				folder.likeCount += 1;
			} else {
				folder.likeCount -= 1;
			}
		}
		setArchiveFolderData(updatedFolderData);
	};

	const handleBookmarkToggle = (folderId: string) => {
		const updatedFolderData = [...archiveFolderData];
		const folderIndex = updatedFolderData.findIndex(
			(folder) => folder.folderId === folderId
		);

		if (folderIndex !== -1) {
			updatedFolderData[folderIndex].bookmark =
				!updatedFolderData[folderIndex].bookmark;
		}
		setArchiveFolderData(updatedFolderData);
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
