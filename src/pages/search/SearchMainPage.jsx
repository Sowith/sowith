import { useState } from 'react';
import { styled } from 'styled-components';
import { SearchBar } from '../../components/search/SearchBar';
import { GroupItem } from '../../components/search/GroupItem';
import { FolderItem } from '../../components/search/FolderItem';
import { TagItem } from '../../components/search/TagItem';

export const SearchMain = () => {
  // 저장할 상태들
  // FolderItem의 높이 구분을 위한 상태
  let renderLocation = 'searchMain';

  // 로직 구현
  // 인기 폴더, 그룹, 친구 리스트 별

  // 컴포넌트

  return (
    <>
      <h1 className="a11y-hidden">검색 메인 페이지 숨김처리 예정</h1>
      <Container>
        <SearchBar />
        <TrendingFolder>
          <SectionTitle index={1}>
            <h2>인기 폴더</h2>
            <a href="#">더보기</a>
          </SectionTitle>
          <TrendingFolderList>
            <FolderItem renderLocation={renderLocation} />
            <FolderItem renderLocation={renderLocation} />
            <FolderItem renderLocation={renderLocation} />
            <FolderItem renderLocation={renderLocation} />
            <FolderItem renderLocation={renderLocation} />
            <FolderItem renderLocation={renderLocation} />
            <FolderItem renderLocation={renderLocation} />
            <FolderItem renderLocation={renderLocation} />
            <FolderItem renderLocation={renderLocation} />
            <FolderItem renderLocation={renderLocation} />
          </TrendingFolderList>
        </TrendingFolder>
        <TrendingGroup>
          <SectionTitle index={2}>
            <h2>인기 그룹</h2>
            <a href="#">더보기</a>
          </SectionTitle>

          <TrendingGroupList>
            <GroupItem />
            <GroupItem />
            <GroupItem />
          </TrendingGroupList>
        </TrendingGroup>
        <TrendingTag>
          <SectionTitle index={3}>
            <h2>인기 태그</h2>
            <a href="#">더보기</a>
          </SectionTitle>
          {/* 컴포넌트화 필요 */}
          <TrendingTagList>
            <TagItem />
            <TagItem />
            <TagItem />
          </TrendingTagList>
        </TrendingTag>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  background-color: #ffffff;
  margin: 0 auto;
  padding: 40px 0 10px 0;

  margin-top: 60px;

  > * {
    width: 90%;
    margin: 0 auto;
  }

  h2 {
    margin: 0;
  }

  section {
    padding-top: 18px;
  }
`;

const SectionTitle = styled.div`
  display: flex;
  padding-bottom: 6px;
  justify-content: space-between;

  h2 {
    font-family: var(--font--semibold);
    font-size: 18px;
  }

  a {
    align-self: flex-end;
    font-size: 11px;
  }

  ${(props) =>
    (props.index === 2 || props.index === 3) &&
    `
    border-bottom: 2px solid #FFDDCC;
  `}
`;

const TrendingFolder = styled.section`
  border-bottom: 5px solid #eeeeee;
`;

const TrendingFolderList = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: auto;
  margin-bottom: 15px;
`;

const TrendingGroup = styled.section`
  border-bottom: 5px solid #eeeeee;
`;

const TrendingGroupList = styled.div`
  padding-top: 10px;
`;

const TrendingTag = styled.section``;

const TrendingTagList = styled.div`
  padding-top: 6px;
  margin-bottom: 10px;
`;

// const TagItem = styled.p`
//   border-radius: 5px;
//   background: linear-gradient(137deg, #ff537c 0%, #ffd66d 100%);
//   font-size: 10px;
//   color: #ffffff;
//   padding: 2px 7px;
//   text-align: center;
//   margin: 0;
// `;
