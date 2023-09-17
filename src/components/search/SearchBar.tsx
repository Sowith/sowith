import styled from 'styled-components';

import { BackButton } from 'components/common/BackButton';
import search from '../../assets/icon/icon-search.svg';

interface SearchBarProps {
  onInputClick: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onInputClick }) => {
  const handleSearchButtonClick = (): void => {
    console.log('SearchButton has been clicked!');
  };

  return (
    <SearchBarContainer>
      <BackButton />
      <SearchArea>
        <SearchInput
          type="text"
          placeholder="검색어를 입력하세요"
          onClick={onInputClick}
        />
        <SearchButton onClick={handleSearchButtonClick} />
      </SearchArea>
    </SearchBarContainer>
  );
};

const SearchBarContainer = styled.div`
  display: flex;
  margin: 0 auto 20px auto;
  width: 90%;
  align-items: center;

  padding-top: 20px;
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
