import { useState } from 'react';
import { styled } from 'styled-components';

export const SearchWithGroup = () => {
  // 저장할 상태들

  // 로직 구현
  // 인기 폴더, 그룹, 친구 리스트 별

  // 컴포넌트
  return (
    <>
      <h1>검색 페이지/그룹</h1>
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
        <GroupAccountList>
          <GroupAccountListItem>
            <img src="" alt="그룹 계정" />
            <GroupAccountInfo>
              <div>
                <p>당근이모임</p>
                <p>/</p>
                <p>private</p>
              </div>
              <div>
                <p>레저</p>
                <p>/</p>
                <p>여행</p>
              </div>
              <p>176k</p>
            </GroupAccountInfo>
            <GroupButtonList>
              <button>그룹 팔로우</button>
              <button>그룹 참가 신청</button>
            </GroupButtonList>
          </GroupAccountListItem>
          <GroupAccountListItem>
            <img src="" alt="그룹 계정" />
            <GroupAccountInfo>
              <div>
                <p>당근이모임</p>
                <p>/</p>
                <p>private</p>
              </div>
              <div>
                <p>레저</p>
                <p>/</p>
                <p>여행</p>
              </div>
              <p>176k</p>
            </GroupAccountInfo>
            <GroupButtonList>
              <button>그룹 팔로우</button>
              <button>그룹 참가 신청</button>
            </GroupButtonList>
          </GroupAccountListItem>
          <GroupAccountListItem>
            <img src="" alt="그룹 계정" />
            <GroupAccountInfo>
              <div>
                <p>당근이모임</p>
                <p>/</p>
                <p>private</p>
              </div>
              <div>
                <p>레저</p>
                <p>/</p>
                <p>여행</p>
              </div>
              <p>176k</p>
            </GroupAccountInfo>
            <GroupButtonList>
              <button>그룹 팔로우</button>
              <button>그룹 참가 신청</button>
            </GroupButtonList>
          </GroupAccountListItem>
        </GroupAccountList>
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
`;

const SearchNavBar = styled.div`
  display: flex;
  justify-content: flex-start;

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
`;

const GroupAccountList = styled.section`
  background-color: royalblue;
`;

const GroupAccountListItem = styled.div`
  display: flex;
  padding: 10px 10px;

  img {
    border-radius: 50%;
    margin-right: 15px;
  }
`;

const GroupAccountInfo = styled.div`
  div {
    display: flex;
  }

  p {
    margin: 5px;
  }

  margin: 0 10px;
`;

const GroupButtonList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
`;
