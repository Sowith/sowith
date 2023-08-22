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
          <TrendingFolderList>
            {/* 컴포넌트화 필요 */}
            <TrendingFolderItem>
              <div>
                <img src="" alt="유저 프로필 아이콘" />
                <p>유저 닉네임</p>
              </div>
              <p>빠니보틀의 로드맵</p>
              <div>
                <p>여행</p>
                <p>가상요소 추가 1.8M</p>
              </div>
            </TrendingFolderItem>
            <TrendingFolderItem>
              <div>
                <img src="" alt="유저 프로필 아이콘" />
                <p>유저 닉네임</p>
              </div>
              <p>용리단길 맛집 모음</p>
              <div>
                <p>여행</p>
                <p>가상요소 추가 1.8M</p>
              </div>
            </TrendingFolderItem>
            <TrendingFolderItem>
              <div>
                <img src="" alt="유저 프로필 아이콘" />
                <p>유저 닉네임</p>
              </div>
              <p>내 2023년 여름</p>
              <div>
                <p>여행</p>
                <p>가상요소 추가 1.8M</p>
              </div>
            </TrendingFolderItem>
          </TrendingFolderList>
        </TrendingFolder>
        <TrendingGroup>
          <p>인기 그룹</p>
          {/* 컴포넌트화 필요 */}
          <TrendingGroupItem>
            <img src="" alt="그룹 프로필 아이콘" />
            <div>
              <p>3반 얼짱 공주들</p>
              <div>
                <p>패션</p>
                <p>패션</p>
                <p>수험생활</p>
              </div>
            </div>
            <div>
              <button>팔로우</button>
              <span>5.6 K</span>
            </div>
          </TrendingGroupItem>
          <TrendingGroupItem>
            <img src="" alt="그룹 프로필 아이콘" />
            <div>
              <p>3반 얼짱 공주들</p>
              <div>
                <p>패션</p>
                <p>패션</p>
                <p>수험생활</p>
              </div>
            </div>
            <div>
              <button>팔로우</button>
              <span>5.6 K</span>
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
            <div>
              <img src="" alt="메세지 보내기" />
              <span>메세지 보내기</span>
            </div>
          </FriendsListItem>
          <FriendsListItem>
            <img src="" alt="친구 프로필 아이콘" />
            <div>
              <p>친구 닉네임</p>
              <p>한 줄 소개</p>
            </div>
            <div>
              <img src="" alt="메세지 보내기" />
              <span>메세지 보내기</span>
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

const TrendingFolder = styled.section`
  background-color: teal;
`;

const TrendingFolderList = styled.section`
  display: flex;
  gap: 10px;
`;

const TrendingFolderItem = styled.div`
  padding: 10px 10px;
  border-radius: 5px;
  background-color: yellow;

  img {
    border-radius: 50%;
    margin-right: 15px;
  }

  div:first-child,
  :last-child {
    display: flex;
    gap: 10px;
  }

  div:last-child {
    justify-content: space-between;
  }
`;

const TrendingGroup = styled.section`
  background-color: royalblue;
`;

const TrendingGroupItem = styled.div`
  display: flex;
  background-color: tomato;
  margin-bottom: 5px;
  img {
    border-radius: 50%;
    margin-right: 10px;
  }

  p {
    margin-bottom: 5px;
  }

  div > div {
    display: flex;
  }

  align-items: center;
`;

const FriendsList = styled.section`
  background-color: salmon;
`;

const FriendsListItem = styled.div`
  display: flex;
  background-color: whitesmoke;
  margin-bottom: 5px;

  img {
    border-radius: 50%;
    margin-right: 10px;
  }

  div:nth-child(2) {
    margin-right: 30px;
  }
`;
