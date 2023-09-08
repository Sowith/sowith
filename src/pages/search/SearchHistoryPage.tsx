import { useState } from 'react';
import { styled } from 'styled-components';
import { SearchBar } from '../../components/search/SearchBar';
import {
  HistoryItem,
  HistoryItemProps,
} from '../../components/search/HistoryItem';

import soWithLogo from '../../assets/icon/icon-sowith.svg';

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

export const SearchHistory: React.FC = () => {
  const [userSearchHistory, setUserSearchHistory] = useState<boolean>(true);

  return (
    <>
      <h1 className="a11y-hidden">검색 페이지 숨김처리</h1>
      <Container>
        <SearchBar />

        {userSearchHistory && (
          <YesSearchHistory>
            <p>최근 검색 기록</p>
            <SearchHistoryList>
              {sampleData.map((data, index) => (
                <HistoryItem key={index} {...(data as HistoryItemProps)} />
              ))}
            </SearchHistoryList>
          </YesSearchHistory>
        )}

        {!userSearchHistory && (
          <NoSearchHistory>
            <img src={soWithLogo} alt="SoWith Logo" />
            <span>검색 기록이 없어요</span>
          </NoSearchHistory>
        )}
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  background-color: #ffffff;
  margin: 0 auto;

  margin-top: 60px;

  > * {
    width: 90%;
    margin: 0 auto;
  }

  > p {
    font-size: 13px;
  }
`;

const YesSearchHistory = styled.div`
  > p {
    font-size: 13px;
  }
`;

const SearchHistoryList = styled.section``;

const NoSearchHistory = styled.div`
  display: flex;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  span {
    font-size: 14px;
    color: var(--gray200-color);
    text-align: center;
  }
`;
