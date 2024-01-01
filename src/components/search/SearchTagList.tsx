import { useState, useEffect } from 'react';
import { useFirestoreRead } from 'hooks/useFirestoreRead';

import { styled } from 'styled-components';

import { TagItem, TagItemProps } from './SearchTagItem';

interface SearchTagListProps {
	searchKeyword: string;
}

export const TagList: React.FC<SearchTagListProps> = ({ searchKeyword }) => {
	const [archiveTagData, setArchiveTagData] = useState<TagItemProps[]>([]);

	const firestoreReader = useFirestoreRead('tags');

	useEffect(() => {
		const fetchFilteredTags = async () => {
			const response = await firestoreReader.ReadField(
				'tagNameKeywords',
				'array-contains-any',
				[searchKeyword]
			);

			const tagData: TagItemProps[] = response.map((item) => {
				const taggedFolderCount = item.data.taggedFolderIDs.length;
				// const taggedGroupCount = item.data.taggedGroupIDs.length;
				const taggedPostCount = item.data.taggedPostIDs.length;

				return {
					tagTitle: item.id,
					tagNumber: taggedFolderCount + taggedPostCount,
				};
			});

			setArchiveTagData(tagData);
		};

		fetchFilteredTags();
	}, [searchKeyword]);

	return (
		<TagItemContainer>
			{archiveTagData.map((tag) => (
				<TagItem
					key={tag.tagTitle}
					tagTitle={tag.tagTitle}
					tagNumber={tag.tagNumber}
				/>
			))}
		</TagItemContainer>
	);
};

const TagItemContainer = styled.div`
	width: 100%;
	margin: 30px auto;
`;
