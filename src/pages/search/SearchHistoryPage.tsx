import styled from 'styled-components';
import { useState, useEffect } from 'react';
import {
  HistoryItem,
  HistoryItemProps,
} from 'components/search/SearchHistoryItem';
import { SearchBar } from 'components/search/SearchBar';

import soWithLogo from '../../assets/icon/icon-sowith-heart.svg';

interface SearchHistoryProps {}

const sampleData: HistoryItemProps[] = [
  {
    historyCategory: 'text',
    title: '상도동 맛집',
  },
  {
    historyCategory: 'tag',
    title: '상도동',
    relatedPosts: 3000,
  },
  {
    historyCategory: 'user',
    title: '꼬마유령 캐스퍼',
    followers: 130000,
  },
  {
    historyCategory: 'folder',
    title: '게임 폴더',
    likes: 1800000,
    folderTag: '게임',
  },
  {
    historyCategory: 'group',
    title: '여행 그룹',
    likes: 5600,
    groupTag: '여행',
  },
];

export default sampleData;

export const SearchHistory: React.FC<SearchHistoryProps> = () => {
  const [searchHistoryData, setSearchHistoryData] = useState(sampleData);
  const [userSearchHistory, setUserSearchHistory] = useState<boolean>(true);

  useEffect(() => {
    if (searchHistoryData.length === 0) {
      setUserSearchHistory(false);
    }
  }, [searchHistoryData]);

  const handleDeleteHistoryItem = (index: number) => {
    const updatedData = [...searchHistoryData];
    updatedData.splice(index, 1);
    setSearchHistoryData(updatedData);
  };

  return (
    <Container>
      <h1 className="a11y-hidden">검색 기록 페이지</h1>
      <SearchBar />
      {userSearchHistory && (
        <YesSearchHistory>
          <SearchStatus>
            <p>최근 검색 기록</p>
          </SearchStatus>

          <SearchHistoryList>
            {searchHistoryData.map((data, index) => (
              <HistoryItem
                key={index}
                {...(data as HistoryItemProps)}
                onDelete={() => handleDeleteHistoryItem(index)}
              />
            ))}
          </SearchHistoryList>
        </YesSearchHistory>
      )}

      {!userSearchHistory && (
        <NoSearchHistory>
          <SearchStatus>
            <p>최근 검색 기록</p>
          </SearchStatus>
          <NoSearchHistoryIcon>
            <img src={soWithLogo} alt="SoWith Logo" />
            <span>검색 기록이 없어요</span>
          </NoSearchHistoryIcon>
        </NoSearchHistory>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  background-color: #ffffff;
  margin: 0 auto;
  padding-bottom: 10px;

  h2 {
    margin: 0;
  }

  > section {
    padding-top: 18px;
  }
`;

const YesSearchHistory = styled.div`
  margin: 30px auto 30px auto;

  > p {
    width: 88%;
    margin: 0 auto;
  }
`;

const SearchStatus = styled.div`
  width: 88%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  > p,
  button {
    font-size: 1rem;
  }
`;

const SearchHistoryList = styled.section``;

const NoSearchHistory = styled.div`
  margin: 30px auto 30px auto;

  > p {
    width: 88%;
    margin: 0 auto;
  }
`;

const NoSearchHistoryIcon = styled.div`
  display: flex;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
  justify-content: center;

  span {
    font-size: 1rem;
    color: var(--gray200-color);
    text-align: center;
  }
`;
