import { useState, useEffect } from 'react';
import { useFirestoreRead } from 'hooks/useFirestoreRead';
import { styled } from 'styled-components';

import { PostItem, PostItemProps } from './SearchPostItem';

interface SearchPostListProps {
	searchKeyword: string;
}

export const PostList: React.FC<SearchPostListProps> = ({ searchKeyword }) => {
	const [archivePostData, setArchivePostData] = useState<PostItemProps[]>([]);

	const firestoreReader = useFirestoreRead('posts');

	useEffect(() => {
		const fetchFilteredPosts = async () => {
			const response = await firestoreReader.ReadField(
				'hashtags',
				'array-contains-any',
				[searchKeyword]
			);

			const postData: PostItemProps[] = response.map((item) => ({
				postId: item.id,
				imageUrl: item.data.images,
			}));

			setArchivePostData(postData);
		};

		fetchFilteredPosts();
	}, []);

	// 반환하는 컴포넌트
	return (
		<Container>
			{archivePostData.map((post, index) => (
				<PostItem
					key={index}
					isMultiplePhotos={post.imageUrl.length > 1}
					imageUrl={post.imageUrl[0]}
					postId={post.postId}
				/>
			))}
		</Container>
	);
};

const Container = styled.section`
	margin-top: 30px;
	margin-left: 1.5px;
	display: flex;
	flex-wrap: wrap;
	gap: 2px;
`;
