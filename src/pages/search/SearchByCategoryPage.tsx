import { useState, useEffect, FC } from 'react';
import { styled } from 'styled-components';
import { SearchBar } from '../../components/search/SearchBar';
import { StepBar } from '../../components/common/StepBar';
import { PostList } from '../../components/search/SearchPostList';
import { FolderList } from '../../components/search/SearchFolderList';
import { GroupList } from '../../components/search/SearchGroupList';
import { AccountList } from '../../components/search/SearchAccountList';
import { TagList } from '../../components/search/SearchTagList';

interface Category {
  id: number;
  name: string;
  className: string;
}

export const SearchByCategory: FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const CATEGORIES: Category[] = [
    { id: 1, name: '게시글', className: 'category-post' },
    { id: 2, name: '폴더', className: 'category-folder' },
    { id: 3, name: '계정', className: 'category-account' },
    { id: 4, name: '그룹', className: 'category-group' },
    { id: 5, name: '태그', className: 'category-tag' },
  ];

  const handleButtonClick = (step: number) => {
    setCurrentStep(step);
  };

  const renderComponentByCategory = () => {
    switch (currentStep) {
      case 1:
        return <PostList />;
      case 2:
        return <></>;
      case 3:
        return <AccountList />;
      case 4:
        return <GroupList />;
      case 5:
        return <TagList />;
      default:
        return <PostList />;
    }
  };

  return (
    <>
      <h1 className="a11y-hidden">검색 페이지/게시글</h1>
      <Container>
        <SearchBar />
        <CategorySwitcher>
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              className={category.className}
              onClick={() => handleButtonClick(category.id)}
            >
              {category.name}
            </button>
          ))}
        </CategorySwitcher>
        <StepBar currentStep={currentStep} howManyTab={5} />
        {renderComponentByCategory()}
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  background-color: #ffffff;
  margin: 0 auto;

  margin-top: 60px;
`;

const CategorySwitcher = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 88%;
  margin: 0 auto 5px auto;

  button {
    flex: 1;
    cursor: pointer;
    font-size: 13px;
    font-family: var(--font--Medium);
    text-align: center;
  }
`;