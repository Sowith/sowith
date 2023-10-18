import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { SearchBar } from '../../components/search/SearchBar';
import { GroupUI } from '../../components/common/GroupUI';
import { SearchTrendingFolderList } from 'components/search/SearchTrendingFolderList';
import { SearchTrendingTagList } from 'components/search/SearchTrendingTagList';

import arrowNext from '../../assets/icon/icon-arrow-next.svg';

interface SectionTitleProps {
  index: number;
}

export const SearchMain: FC = () => {
  const trendingGroups = [1, 2, 3, 4, 5, 6];

  return (
    <>
      <h1 className="a11y-hidden">검색 메인 페이지</h1>
      <MainTopNav>
        <SearchBar />
        <SearchTrendingTagList />
      </MainTopNav>
      <Container>
        <TrendingFolder>
          <SectionTitle index={1}>
            <h2>인기 폴더</h2>
            <Link to="/trendingfolder">
              <img src={arrowNext} alt="인기 폴더 더보기" />
            </Link>
          </SectionTitle>
          <SearchTrendingFolderList />
        </TrendingFolder>
        <TrendingGroup>
          <SectionTitle index={2}>
            <h2>인기 그룹</h2>
            <Link to="/trendinggroup">
              <img src={arrowNext} alt="인기 그룹 더보기" />
            </Link>
          </SectionTitle>
          <TrendingSearchGroupList>
            {trendingGroups.map((_, idx) => (
              <GroupUI key={idx} />
            ))}
          </TrendingSearchGroupList>
        </TrendingGroup>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  background-color: #ffffff;
  margin: 0 auto;
  padding-bottom: 10px;

  h2 {
    margin: 0;
  }

  > section {
    padding-top: 18px;
  }
`;

const MainTopNav = styled.div`
  z-index: 999;
  position: sticky;
  top: 0;
  background: #ffffff;
  box-shadow: 0px 5px 5px -5px rgba(0, 0, 0, 0.5);
  padding-bottom: 10px;
`;

const SectionTitle = styled.div<SectionTitleProps>`
  display: flex;
  justify-content: space-between;
  width: 88%;
  margin: 0 auto 10px auto;

  h2 {
    font-family: var(--font--semibold);
    font-size: 1rem;
  }

  ${(props) =>
    (props.index === 2 || props.index === 3) &&
    `
    border-bottom: 2px solid #FFDDCC;
  `}
`;

const TrendingFolder = styled.section`
  width: 100%;
  margin-bottom: 45px;
`;

const TrendingGroup = styled.section`
  width: 100%;
  margin: 0 auto;
`;

const TrendingSearchGroupList = styled.div`
  padding-top: 10px;
`;
