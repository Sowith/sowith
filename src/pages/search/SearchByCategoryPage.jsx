import { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { SearchBar } from '../../components/search/SearchBar';
import { StepBar } from '../../components/common/StepBar';
import { PostList } from '../../components/search/PostList';
import { FolderList } from '../../components/search/FolderList';
import { GroupList } from '../../components/search/GroupList';
import { AccountList } from '../../components/search/AccountList';
import { TagList } from '../../components/search/TagList';

export const SearchByCategory = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleButtonClick = (step) => {
    setCurrentStep(step);
  };

  const renderComponentByCategory = () => {
    switch (currentStep) {
      case 1:
        return <PostList />;
      case 2:
        return <FolderList />;
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
          <button
            className="category-post"
            onClick={() => handleButtonClick(1)}
          >
            게시글
          </button>
          <button
            className="category-folder"
            onClick={() => handleButtonClick(2)}
          >
            폴더
          </button>
          <button
            className="category-account"
            onClick={() => handleButtonClick(3)}
          >
            계정
          </button>
          <button
            className="category-group"
            onClick={() => handleButtonClick(4)}
          >
            그룹
          </button>
          <button className="category-tag" onClick={() => handleButtonClick(5)}>
            태그
          </button>
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
    // 추가적으로 설정할 것
    /* min-width: 80px; */
  }
`;
