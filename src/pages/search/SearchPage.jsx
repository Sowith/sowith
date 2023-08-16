import { useState } from 'react';
import { styled } from 'styled-components';

export const Search = () => {
  // 저장할 상태들

  // 로직 구현
  // 인기 폴더, 그룹, 친구 리스트 별

  // 컴포넌트
  return (
    <>
      <h1>검색 페이지1 숨김처리</h1>
      <Container>
        <SearchNavBar>
          <button>⏪</button>
          <input type="text" placeholder="검색어를 입력하세요" />
        </SearchNavBar>
        <TrendingFolder>
          <p>인기 폴더</p>
          {/* 컴포넌트화 필요 */}
          <TrendingFolderItem>
            <img src="" alt="유저 프로필 아이콘" />
            <div>
              <p>유저 닉네임</p>
              <div>
                <p>폴더 카테고리</p>
                <p>폴더명</p>
              </div>
            </div>
          </TrendingFolderItem>
        </TrendingFolder>
        <TrendingGroup>
          <p>인기 그룹</p>
          {/* 컴포넌트화 필요 */}
          <TrendingGroupItem>
            <img src="" alt="그룹 프로필 아이콘" />
            <div>
              <div>
                <p>그룹 이름</p>
                <p>팔로워 수</p>
              </div>
              <p>그룹 카테고리</p>
            </div>
          </TrendingGroupItem>
        </TrendingGroup>
        <FriendsList>
          <p>내 친구 리스트 (가나다 순)</p>
          {/* 컴포넌트화 필요 */}
          <FriendsListItem>
            <img src="" alt="친구 프로필 아이콘" />
            <div>
              <p>친구 닉네임</p>
              <p>한 줄 소개</p>
            </div>
          </FriendsListItem>
        </FriendsList>
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

const SearchNavBar = styled.div``;

const TrendingFolder = styled.section``;

const TrendingFolderItem = styled.div``;

const TrendingGroup = styled.section``;

const TrendingGroupItem = styled.div``;

const FriendsList = styled.section``;

const FriendsListItem = styled.div``;
