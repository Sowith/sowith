import { useState, useRef, useEffect } from 'react';
import { styled } from 'styled-components';
import { SearchBar } from '../../components/search/SearchBar';
import { PostList } from '../../components/search/PostList';
import { FolderList } from '../../components/search/FolderList';
import { GroupList } from '../../components/search/GroupList';
import { AccountList } from '../../components/search/AccountList';
import { TagList } from '../../components/search/TagList';

export const SearchByCategory = () => {
  // 저장할 상태들
  const [selectedCategory, setSelectedCategory] = useState('post');
  const [barWidth, setBarWidth] = useState(0); // 막대의 너비
  const [barPosition, setBarPosition] = useState(0); // 막대의 위치
  // 로직 구현
  // 인기 폴더, 그룹, 친구 리스트 별
  const selectedButtonRef = useRef(null);

  const handleButtonClick = (category, event) => {
    setSelectedCategory(category);
    selectedButtonRef.current = event.currentTarget; // 여기서 참조 업데이트

    const { width, left } = event.currentTarget.getBoundingClientRect();
    const parentLeft =
      event.currentTarget.parentElement.getBoundingClientRect().left;

    setBarWidth(width);
    setBarPosition(left - parentLeft);
  };

  useEffect(() => {
    const handleResize = () => {
      if (selectedButtonRef.current) {
        const { width, left } =
          selectedButtonRef.current.getBoundingClientRect();
        const parentLeft =
          selectedButtonRef.current.parentElement.getBoundingClientRect().left;

        setBarWidth(width);
        setBarPosition(left - parentLeft);
      }
    };

    window.addEventListener('resize', handleResize);

    // 이벤트 리스너 정리
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const renderComponentByCategory = () => {
    switch (selectedCategory) {
      case 'post':
        return <PostList />;
      case 'folder':
        return <FolderList />;
      case 'account':
        return <AccountList />;
      case 'group':
        return <GroupList />;
      case 'tag':
        return <TagList />;
      default:
        return <PostList />;
    }
  };
  // 컴포넌트
  return (
    <>
      <h1 className="a11y-hidden">검색 페이지/게시글</h1>
      <Container>
        <SearchBar />
        <CategorySwitcher>
          <button
            className="category-post"
            onClick={(e) => handleButtonClick('post', e)}
          >
            게시글
          </button>
          <button
            className="category-folder"
            onClick={(e) => handleButtonClick('folder', e)}
          >
            폴더
          </button>
          <button
            className="category-account"
            onClick={(e) => handleButtonClick('account', e)}
          >
            계정
          </button>
          <button
            className="category-group"
            onClick={(e) => handleButtonClick('group', e)}
          >
            그룹
          </button>
          <button
            className="category-tag"
            onClick={(e) => handleButtonClick('tag', e)}
          >
            태그
          </button>
          <IndicatorBar width={barWidth} left={barPosition} />
          {/* <BackgroundBar /> */}
        </CategorySwitcher>
        {renderComponentByCategory()}
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 80%;
  background-color: #ffffff;
  margin: 0 auto;

  margin-top: 60px;

  > * {
    width: 90%;
    margin: 0 auto;
  }
`;

const CategorySwitcher = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  gap: 10px;
  width: 80%;
  margin: 20px auto;
  padding: 0 5%;

  button {
    cursor: pointer;
    font-size: 13px;
    font-family: var(--font--Medium);
  }
`;

const IndicatorBar = styled.div`
  position: absolute;
  top: 16px;
  left: ${(props) => props.left}px;
  width: ${(props) => props.width}px;
  height: 4px; // stroke-width
  background-color: #fc9763;
  border-radius: 5px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  transition: left 0.3s, width 0.3s;
  z-index: 1;
`;

const BackgroundBar = styled.div`
  position: absolute;
  top: 16px;
  height: 4px;
  background-color: #dddddd;
  border-radius: 5px;
`;
