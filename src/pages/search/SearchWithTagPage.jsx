import { useState } from 'react';
import { styled } from 'styled-components';

export const SearchWithTag = () => {
  // 저장할 상태들

  // 로직 구현
  // 인기 폴더, 그룹, 친구 리스트 별

  // 컴포넌트
  return (
    <>
      <h1>검색 페이지/태그</h1>
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
        <p>슬라이더 추가</p>
        <TagList>
          <TagListItem>
            <img src="" alt="해쉬태그" />
            <TagInfo>
              <p>#당근</p>
              <p>게시물 38만개</p>
            </TagInfo>
          </TagListItem>
          <TagListItem>
            <img src="" alt="해쉬태그" />
            <TagInfo>
              <p>#당근</p>
              <p>게시물 38만개</p>
            </TagInfo>
          </TagListItem>
          <TagListItem>
            <img src="" alt="해쉬태그" />
            <TagInfo>
              <p>#당근</p>
              <p>게시물 38만개</p>
            </TagInfo>
          </TagListItem>
          <TagListItem>
            <img src="" alt="해쉬태그" />
            <TagInfo>
              <p>#당근</p>
              <p>게시물 38만개</p>
            </TagInfo>
          </TagListItem>
        </TagList>
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

const TagList = styled.section`
  background-color: royalblue;
`;

const TagListItem = styled.div`
  display: flex;
  padding: 10px 10px;

  img {
    border-radius: 50%;
    margin-right: 15px;
  }
`;

const TagInfo = styled.div`
  p {
    margin: 0;
  }
  p:first-child {
    margin-bottom: 10px;
  }
`;
