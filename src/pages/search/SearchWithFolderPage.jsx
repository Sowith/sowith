import { useState } from 'react';
import { styled } from 'styled-components';

export const SearchWithFolder = () => {
  // 저장할 상태들

  // 로직 구현
  // 인기 폴더, 그룹, 친구 리스트 별

  // 컴포넌트
  return (
    <>
      <h1>검색 페이지/폴더</h1>
      <Container>
        <SearchNavBar>
          <button>⏪</button>
          <input type="text" placeholder="검색어를 입력하세요" />
        </SearchNavBar>
        <CategoryNavBar>
          <div>게시글</div>
          <div>폴더</div>
          <div>계정</div>
          <div>그룹</div>
          <div>태그</div>
        </CategoryNavBar>
        <div>슬라이더 추가</div>
        <PostList>
          <div>테스트</div>
          <div>테스트</div>
          <div>테스트</div>
          <div>테스트</div>
          <div>테스트</div>
          <div>테스트</div>
          <div>테스트</div>
          <div>테스트</div>
          <div>테스트</div>
          <div>테스트</div>
        </PostList>
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

const CategoryNavBar = styled.div`
  display: flex;
  gap: 10px;
  width: 90%;
  margin: 0 auto;
`;

const PostList = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 100px));
  gap: 5px;
  box-sizing: border-box;
  margin: 0 auto;
  border-radius: 5px;
  background-color: royalblue;
  overflow: hidden;

  div {
    width: 100px;
    height: 100px;
    background-color: white;
    box-sizing: border-box;
  }
`;
