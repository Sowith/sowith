import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { BackButton } from 'components/common/BackButton';

import search from '../../assets/icon/icon-search.svg';

export const SearchBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleInputClick = (): void => {
    console.log('Input has been clicked!');
    if (location.pathname !== '/searchhistory') {
      navigate('/searchhistory');
    }
  };

  const handleInputFocus = (): void => {
    console.log('Input has been Focused!');
    if (location.pathname !== '/searchhistory') {
      navigate('/searchhistory');
    }
  };

  const handleSearchButtonClick = (): void => {
    if (location.pathname === '/searchhistory') {
      console.log('검색 시작!');
    }
  };

  return (
    <SearchBarContainer>
      <BackButton />
      <SearchArea>
        <SearchInput
          type="text"
          placeholder="검색어를 입력하세요"
          onClick={handleInputClick}
          onFocus={handleInputFocus}
        />
        <SearchButton onClick={handleSearchButtonClick} />
      </SearchArea>
    </SearchBarContainer>
  );
};

const SearchBarContainer = styled.div`
  display: flex;
  margin: 20px auto 20px auto;
  width: 88%;
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
  font-size: 1rem;

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
