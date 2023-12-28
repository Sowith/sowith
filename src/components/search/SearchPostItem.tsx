import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';

import multiplePhotosIcon from '../../assets/icon/icon-multiple_photos.svg';

export interface PostItemProps {
	isMultiplePhotos?: boolean;
	imageUrl: string;
	postId: string;
}

export const PostItem: React.FC<PostItemProps> = ({
	isMultiplePhotos,
	imageUrl,
	postId,
}) => {
	const navigate = useNavigate();

	const handlePostClick = () => {
		navigate(`/post/view/${postId}`);
	};

	return (
		<Container onClick={handlePostClick}>
			<img src={imageUrl} alt='post list item' className='post-item' />
			{isMultiplePhotos && (
				<img
					src={multiplePhotosIcon}
					alt='multiple photos icon'
					className='icon-multiple_photos'
				/>
			)}
		</Container>
	);
};
const Container = styled.div`
	width: calc((100% / 3) - 4px);
	margin-left: 1.5px;
	cursor: pointer;
	position: relative;
	& img {
		width: 100%;
		aspect-ratio: 1 / 1;
	}

	img.icon-multiple_photos {
		position: absolute;
		margin: 0;
		bottom: 5px;
		right: 5px;
		width: 40px;
		height: 40px;
	}
`;
