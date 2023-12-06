import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

export interface TrendingTagData {
	trendingTag: string;
	tagNumber: number;
}

export const SearchTrendingTagItem: React.FC<TrendingTagData> = ({
	trendingTag,
}) => {
	const navigate = useNavigate();
	const handleTagClick = (): void => {
		navigate('/searchbycategory', { state: trendingTag });
	};

	return (
		<Container>
			<span onClick={handleTagClick}># {trendingTag}</span>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	white-space: nowrap;
	padding: 10px;
	font-size: 0.8rem;
	box-sizing: border-box;
	border-radius: 20px;
	cursor: pointer;
	background-color: var(--main-color);

	span {
		display: inline-block;
		color: #ffffff;
		font-family: var(--font--SemiBold);
	}

	&:hover {
		outline: 1px solid var(--main-color);
		background-color: #ffffff;
		span {
			color: var(--main-color);
		}
	}
`;
