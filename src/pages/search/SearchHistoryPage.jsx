import { useState } from 'react';
import { styled } from 'styled-components';
import { SearchBar } from '../../components/search/SearchBar';
import { HistoryItem } from '../../components/search/HistoryItem';

import soWithLogo from '../../assets/icon/icon-sowith-heart.svg';

export const SearchHistory = () => {
  // 저장할 상태들
  let [userSearchHistory, setUserSearchHistory] = useState(true);
  let [historyCategory, setHistoryCategory] = useState('group');
  // 로직 구현

  return (
    <>
      <h1 className="a11y-hidden">검색 페이지 숨김처리</h1>
      <Container>
        <SearchBar />

        {userSearchHistory === true && (
          <YesSearchHistory>
            <p>최근 검색 기록</p>
            <SearchHistoryList>
              <HistoryItem historyCategory={'user'} />
              <HistoryItem historyCategory={'group'} />
              <HistoryItem historyCategory={'text'} />
              <HistoryItem historyCategory={'folder'} />
              <HistoryItem historyCategory={'tag'} />
            </SearchHistoryList>
          </YesSearchHistory>
        )}

        {userSearchHistory === false && (
          <NoSearchHistory>
            <img src={soWithLogo} alt="" />
            <span>검색 기록이 없어요</span>
          </NoSearchHistory>
        )}
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
