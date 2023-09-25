import { FC, useState } from 'react';
import styled from 'styled-components';
import { BackButton } from 'components/common/BackButton';
import { GroupUI } from 'components/common/GroupUI';

export const SearchTrendingGroup: FC = () => {
  return (
    <Container>
      <h1 className="a11y-hidden">인기 그룹 페이지</h1>
      <TopNav>
        <BackButton />
        <p>인기 그룹</p>
      </TopNav>
      <TrendingGroup>
        <GroupUI />
        <GroupUI />
        <GroupUI />
        <GroupUI />
        <GroupUI />
      </TrendingGroup>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  background-color: #ffffff;
  margin: 0 auto;
  padding-bottom: 10px;

  section {
    padding-top: 18px;
  }
`;

const TopNav = styled.div`
  display: flex;
  width: 88%;
  align-items: center;
  gap: 5px;
  margin: 0 auto;
  margin-top: 40px;
  p {
    font-size: 1.5rem;
    font-family: var(--font--SemiBold);
  }
`;

const TrendingGroup = styled.section`
  width: 100%;
  margin: 0;
  margin-top: 30px;
`;
