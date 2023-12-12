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
				'tagName',
				'==',
				searchKeyword
			);

			const tagData: TagItemProps[] = response.map((item) => {
				const taggedFolderCount = item.data.taggedFolderIDs.length;
				const taggedGroupCount = item.data.taggedGroupIDs.length;
				const taggedPostCount = item.data.taggedPostIDs.length;

				return {
					tagTitle: item.data.tagName,
					tagNumber: taggedFolderCount + taggedGroupCount + taggedPostCount,
				};
			});

			setArchiveTagData(tagData);
		};

		fetchFilteredTags();
	}, []);

	return (
		<TagItemContainer>
			{archiveTagData.map((tag) => (
				<TagItem tagTitle={tag.tagTitle} tagNumber={tag.tagNumber} />
			))}
		</TagItemContainer>
	);
};

const TagItemContainer = styled.div`
	width: 100%;
	margin: 30px auto;
`;
