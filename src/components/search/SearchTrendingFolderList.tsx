import { useEffect, useState } from 'react';
import { useFirestoreRead } from 'hooks/useFirestoreRead';
import { styled } from 'styled-components';

import {
	SearchTrendingFolderItem,
	FolderDataItem,
} from './SearchTrendingFolderItem';

export const SearchTrendingFolderList: React.FC = () => {
	const [archiveFolderData, setArchiveFolderData] = useState<FolderDataItem[]>(
		[]
	);

	const firestoreReader = useFirestoreRead('folders');

	useEffect(() => {
		const fetchTrendingFolders = async () => {
			const response = await firestoreReader.ReadAllDocument();
			const sortedByLikeCount = response.sort(
				(a, b) => b.data.likeCount - a.data.likeCount
			);

			const folderData: FolderDataItem[] = sortedByLikeCount.map((item) => ({
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

		fetchTrendingFolders();
	}, []);

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
