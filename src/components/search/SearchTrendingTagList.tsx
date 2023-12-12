import { useState, useEffect } from 'react';
import { useFirestoreRead } from 'hooks/useFirestoreRead';
import styled from 'styled-components';

import {
	SearchTrendingTagItem,
	TrendingTagData,
} from './SearchTrendingTagItem';

export const SearchTrendingTagList: React.FC = () => {
	const [archiveTrendingTagData, setArchiveTrendingTagData] = useState<
		TrendingTagData[]
	>([]);

	const firestoreReader = useFirestoreRead('tags');

	useEffect(() => {
		const fetchTrendingTags = async () => {
			const response = await firestoreReader.ReadAllDocument();

			const tagData: TrendingTagData[] = response.map((item) => {
				const taggedFolderCount = item?.data?.taggedFolderIDs?.length;
				const taggedGroupCount = item?.data?.taggedGroupIDs?.length;
				const taggedPostCount = item?.data?.taggedPostIDs?.length;

				return {
					tagId: item.id,
					trendingTag: item.data.tagName,
					tagNumber: taggedFolderCount + taggedGroupCount + taggedPostCount,
				};
			});

			const sortedByTrending = tagData.sort(
				(a, b) => a.tagNumber - b.tagNumber
			);
			setArchiveTrendingTagData(sortedByTrending);
		};

		fetchTrendingTags();
	}, []);

	return (
		<Container>
			{archiveTrendingTagData.map((tag) => (
				<SearchTrendingTagItem
					trendingTag={tag.trendingTag}
					tagNumber={tag.tagNumber}
				/>
			))}
		</Container>
	);
};

const Container = styled.section`
	width: 88%;
	padding: 5px;
	gap: 10px;
	margin: 0 auto;
	display: flex;
	overflow: auto;
`;
