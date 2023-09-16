import { FC, useState } from 'react';
import styled from 'styled-components';
import { SearchBar } from 'components/search/SearchBar';
import { SearchHistory } from 'components/search/SearchHistory';
import { GroupUI } from 'components/common/GroupUI';

export const SearchTrendingGroup: FC = () => {
  const groupCount = Array.from({ length: 7 });
  const [isInputClicked, setInputClicked] = useState(false);

  const handleInputClick = () => {
    setInputClicked(true);
  };

  const handleCancel = () => {
    setInputClicked(false);
  };

  return (
    <>
      <h1 className="a11y-hidden">인기 그룹 페이지</h1>
      <SearchBar onInputClick={handleInputClick} />
      {isInputClicked ? (
        <SearchHistory onCancel={handleCancel} />
      ) : (
        <Container>
          {groupCount.map((_, index) => (
            <GroupUI key={index} />
          ))}
        </Container>
      )}
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
