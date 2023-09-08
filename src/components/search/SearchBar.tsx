import styled from 'styled-components';

import arrowBack from '../../assets/icon/icon-arrow.svg';
import search from '../../assets/icon/icon-search.svg';

export const SearchBar: React.FC = () => {
  const handleBackButtonClick = (): void => {
    console.log('BackButton has been clicked!');
  };

  const handleSearchButtonClick = (): void => {
    console.log('SearchButton has been clicked!');
  };

  return (
    <SearchBarContainer>
      <BackButton onClick={handleBackButtonClick} />
      <SearchArea>
        <SearchInput type="text" placeholder="검색어를 입력하세요" />
        <SearchButton onClick={handleSearchButtonClick} />
      </SearchArea>
    </SearchBarContainer>
  );
};

const SearchBarContainer = styled.div`
  display: flex;
  margin: 0 auto;
  width: 90%;
  align-items: center;
`;

const BackButton = styled.button`
  background-image: url(${arrowBack});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  width: 20px;
  height: 20px;
  cursor: pointer;
  margin-right: 10px;
`;

const SearchArea = styled.div`
  display: flex;
  gap: 0px;
  border-bottom: 2px solid var(--main-color);
  flex-grow: 1;
  align-items: center;
`;

const SearchInput = styled.input`
  flex-grow: 1;
  background: none;
  border: none;
  line-height: 30px;
  outline: none;
  font-size: 16px;

  &::placeholder {
    color: #c4c4c4;
  }
`;

const SearchButton = styled.button`
  all: unset;
  background-image: url(${search});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;
