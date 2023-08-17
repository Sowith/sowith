import { useState } from 'react';
import { styled } from 'styled-components';

export const SearchWithAccount = () => {
  // 저장할 상태들

  // 로직 구현
  // 인기 폴더, 그룹, 친구 리스트 별

  // 컴포넌트
  return (
    <>
      <h1>검색 페이지/계정</h1>
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
        <AccountList>
          {/* 컴포넌트화 필요 */}
          <AccountListItem>
            <img src="" alt="유저 프로필" />
            <AccountInfo>
              <AccountName>
                <p>닉네임</p>
                <p>이름</p>
              </AccountName>
              <p>소개 메세지</p>
            </AccountInfo>
          </AccountListItem>
          <AccountListItem>
            <img src="" alt="유저 프로필" />
            <AccountInfo>
              <AccountName>
                <p>닉네임</p>
                <p>이름</p>
              </AccountName>
              <p>소개 메세지</p>
            </AccountInfo>
          </AccountListItem>
          <AccountListItem>
            <img src="" alt="유저 프로필" />
            <AccountInfo>
              <AccountName>
                <p>닉네임</p>
                <p>이름</p>
              </AccountName>
              <p>소개 메세지</p>
            </AccountInfo>
          </AccountListItem>
          <AccountListItem>
            <img src="" alt="유저 프로필" />
            <AccountInfo>
              <AccountName>
                <p>닉네임</p>
                <p>이름</p>
              </AccountName>
              <p>소개 메세지</p>
            </AccountInfo>
          </AccountListItem>
        </AccountList>
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

const AccountList = styled.section`
  width: 90%;
  margin: 0 auto;
  background-color: royalblue;
`;

const AccountListItem = styled.div`
  display: flex;
  padding: 10px 10px;

  img {
    border-radius: 50%;
    margin-right: 15px;
  }
`;

const AccountInfo = styled.div`
  p {
    margin: 0;
  }
`;

const AccountName = styled.div`
  display: flex;
  gap: 10px;
`;
