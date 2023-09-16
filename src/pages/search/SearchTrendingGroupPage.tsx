import { FC, useState } from 'react';
import styled from 'styled-components';
import { SearchBar } from 'components/search/SearchBar';
import { SearchHistory } from 'components/search/SearchHistory';
import { GroupUI } from 'components/common/GroupUI';

export const SearchTrendingGroup: FC = () => {
  const groupCount = Array.from({ length: 7 });

  return (
    <>
      <h1 className="a11y-hidden">인기 그룹 페이지</h1>
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

  section {
    padding-top: 18px;
  }
`;
