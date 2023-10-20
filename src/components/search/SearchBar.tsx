import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import styled from 'styled-components';

import { BackButton } from 'components/common/BackButton';

import search from '../../assets/icon/icon-search.svg';

export interface SearchBarProps {
	onSearchButtonClick?: () => void;
	onInputChange?: (string) => void;
	searchValue?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
	onSearchButtonClick,
	onInputChange,
	searchValue,
}) => {
	const navigate = useNavigate();
	const location = useLocation();
	const currentPath = location.pathname;
	const [placeholderText, SetPlaceHolderText] = useState('');
	const [searchKeyword, setSearchKeyword] = useState('');

	useEffect(() => {
		if (currentPath === '/profiledetailPage/1') {
			SetPlaceHolderText('내가 참여한 그룹은?');
		} else if (currentPath === '/profiledetailPage/2') {
			SetPlaceHolderText('내가 팔로우한 그룹은?');
		} else if (currentPath === '/chatting') {
			SetPlaceHolderText('내가 마지막으로 이야기를 나눈 친구는?');
		} else if (currentPath === '/searchhistory') {
			SetPlaceHolderText('나는 뭘 검색했을까?👀');
		} else SetPlaceHolderText('요즘 소윗에서 가장 핫한 검색어는?');
	}, [currentPath]);

	const handleInputClick = (): void => {
		if (
			currentPath !== '/searchhistory' &&
			!currentPath.startsWith('/profiledetailPage/') &&
			!currentPath.startsWith('/chatting')
		) {
			navigate('/searchhistory');
		}
	};

	const handleInputFocus = (): void => {
		if (
			currentPath !== '/searchhistory' &&
			!currentPath.startsWith('/profiledetailPage/') &&
			!currentPath.startsWith('/chatting')
		) {
			navigate('/searchhistory');
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchKeyword(e.target.value);

		if (onInputChange) {
			onInputChange(e.target.value);
		}
	};

	const handleSearchButtonClick = (): void => {
		if (onSearchButtonClick) {
			onSearchButtonClick();
		}
	};

	return (
		<SearchBarContainer>
			<BackButton />
			<SearchArea>
				<SearchInput
					type='text'
					placeholder={placeholderText}
					value={searchValue}
					onClick={handleInputClick}
					onFocus={handleInputFocus}
					onChange={handleInputChange}
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
