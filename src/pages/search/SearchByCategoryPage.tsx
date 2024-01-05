import { useState, FC } from 'react';
import { styled } from 'styled-components';
import { SearchBar } from '../../components/search/SearchBar';
import { StepBar } from '../../components/common/StepBar';
import { PostList } from '../../components/search/SearchPostList';
import { SearchFolderList } from 'components/search/SearchFolderList';
import { AccountList } from '../../components/search/SearchAccountList';
import { TagList } from '../../components/search/SearchTagList';
import { useLocation, useNavigate } from 'react-router-dom';

interface Category {
	id: number;
	name: string;
	className: string;
}

export const SearchByCategory: FC = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const searchKeyword: string = location.state;
	console.log(searchKeyword);
	const [currentStep, setCurrentStep] = useState<number>(1);
	const CATEGORIES: Category[] = [
		{ id: 1, name: '게시글', className: 'post' },
		{ id: 2, name: '폴더', className: 'folder' },
		{ id: 3, name: '계정', className: 'account' },
		{ id: 4, name: '태그', className: 'tag' },
	];

	const handleButtonClick = (categoryId: number) => {
		setCurrentStep(categoryId);
		const categoryPath = CATEGORIES.find(
			(category) => category.id === categoryId
		)?.className;
		navigate(`/search/${categoryPath}`, { state: searchKeyword });
	};

	const renderComponentByCategory = () => {
		switch (currentStep) {
			case 1:
				return <PostList searchKeyword={searchKeyword} />;
			case 2:
				return <SearchFolderList searchKeyword={searchKeyword} />;
			case 3:
				return <AccountList searchKeyword={searchKeyword} />;
			case 4:
				return <TagList searchKeyword={searchKeyword} />;
			default:
				return <PostList searchKeyword={searchKeyword} />;
		}
	};

	return (
		<>
			<h1 className='a11y-hidden'>검색 페이지/게시글</h1>
			<Container>
				<SearchBar searchValue={searchKeyword} />
				<CategorySwitcher>
					{CATEGORIES.map((category) => (
						<button
							key={category.id}
							onClick={() => handleButtonClick(category.id)}
						>
							{category.name}
						</button>
					))}
				</CategorySwitcher>
				<StepBar currentStep={currentStep} howManyTabs={4} />
				{renderComponentByCategory()}
			</Container>
		</>
	);
};

const Container = styled.div`
	width: 100%;
	background-color: #ffffff;
	margin: 0 auto;
`;

const CategorySwitcher = styled.div`
	display: flex;
	justify-content: space-evenly;
	width: 88%;
	margin: 60px auto 5px auto;

	button {
		display: block;
		flex: 1;
		cursor: pointer;
		font-size: 1rem;
		font-family: var(--font--Medium);
		text-align: center;
	}
`;
