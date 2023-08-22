import { useState } from 'react';
import { styled } from 'styled-components';

export const Search2 = () => {
  // 저장할 상태들

  // 로직 구현
  // 인기 폴더, 그룹, 친구 리스트 별

  // 컴포넌트
  return (
    <>
      <h1>검색 페이지2 숨김처리</h1>
      <Container>
        <SearchNavBar>
          <button>⏪</button>
          <input type="text" placeholder="검색어를 입력하세요" />
        </SearchNavBar>
        <p>최근 검색 기록</p>
        <SearchHistoryList>
          <SearchHistoryBtn>상도동 맛집</SearchHistoryBtn>
          <SearchHistoryBtn>스타벅스</SearchHistoryBtn>
          <SearchHistoryBtn>카페</SearchHistoryBtn>
          <SearchHistoryBtn>그쪽도 홍박사님을 아세요</SearchHistoryBtn>
        </SearchHistoryList>

        <p>검색 기록이 없어요</p>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 80%;
  background-color: #756e6e;
  margin: 0 auto;

  button {
    margin-right: 20px;
  }
  input {
  }

  > * {
    width: 90%;
    margin: 0 auto;
  }
`;

const SearchNavBar = styled.div`
  width: 90%;
  display: flex;
  justify-content: flex-start;
  margin: 0 auto;

  button {
    margin-right: 20px;
    flex-shrink: 0;
  }
  input {
    flex-grow: 1;
  }
`;

const SearchHistoryList = styled.section``;

const SearchHistoryBtn = styled.button`
  all: unset;
  background-color: #fc9763;
  border-radius: 5px;
`;
