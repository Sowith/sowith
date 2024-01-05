import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFirestoreRead } from 'hooks/useFirestoreRead';
import { useFirestoreUpdate } from 'hooks/useFirestoreUpdate';
import styled from 'styled-components';

import {
	HistoryItem,
	HistoryItemProps,
} from 'components/search/SearchHistoryItem';
import { SearchBar } from 'components/search/SearchBar';
import getUserInfo from 'utils/getUserInfo';

import soWithLogo from '../../assets/icon/icon-sowith-heart.svg';

interface SearchHistoryProps {}

export const SearchHistory: React.FC<SearchHistoryProps> = () => {
	const [searchHistoryData, setSearchHistoryData] = useState([]);
	const [userSearchHistory, setUserSearchHistory] = useState<boolean>(true);
	const [searchKeyword, setSearchKeyword] = useState('');
	const navigate = useNavigate();

	const firestoreReader = useFirestoreRead('users');
	const { UpdateField } = useFirestoreUpdate('users');

	const userInfo = getUserInfo();
	const fetchUserSearchHistory = async () => {
		const response = await firestoreReader.ReadDocument(userInfo);

		if (response && response.data.searchHistories.length > 0) {
			setSearchHistoryData(response.data.searchHistories || []);
			setUserSearchHistory(true);
		} else {
			setUserSearchHistory(false);
		}
	};

	useEffect(() => {
		fetchUserSearchHistory();
	}, [searchHistoryData.length]);

	const handleDeleteHistoryItem = async (index: number) => {
		if (index >= 0 && index < searchHistoryData.length) {
			const updatedSearchHistoryData = [
				...searchHistoryData.slice(0, index),
				...searchHistoryData.slice(index + 1),
			];

			await UpdateField(
				{ searchHistories: updatedSearchHistoryData },
				userInfo,
				false
			);

			setSearchHistoryData(updatedSearchHistoryData);
		}
	};

	const handleSearchKeywordChange = (value: string) => {
		setSearchKeyword(value);
	};

	const moveSearchByCategory = (): void => {
		navigate('/search/post', { state: searchKeyword });
	};

	return (
		<Container>
			<h1 className='a11y-hidden'>검색 기록 페이지</h1>
			<SearchBar
				onInputChange={handleSearchKeywordChange}
				onSearchButtonClick={moveSearchByCategory}
				searchValue={searchKeyword}
			/>
			{userSearchHistory && (
				<YesSearchHistory>
					<SearchStatus>
						<p>최근 검색 기록</p>
					</SearchStatus>

					<SearchHistoryList>
						{searchHistoryData
							.map((data, index) => (
								<HistoryItem
									key={index}
									{...(data as HistoryItemProps)}
									onDelete={() => handleDeleteHistoryItem(index)}
								/>
							))
							.reverse()}
					</SearchHistoryList>
				</YesSearchHistory>
			)}

			{!userSearchHistory && (
				<NoSearchHistory>
					<SearchStatus>
						<p>최근 검색 기록</p>
					</SearchStatus>
					<NoSearchHistoryIcon>
						<img src={soWithLogo} alt='SoWith Logo' />
						<span>검색 기록이 없어요</span>
					</NoSearchHistoryIcon>
				</NoSearchHistory>
			)}
		</Container>
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

const YesSearchHistory = styled.div`
	margin: 30px auto 30px auto;

	> p {
		width: 88%;
		margin: 0 auto;
	}
`;

const SearchStatus = styled.div`
	width: 88%;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
	> p,
	button {
		font-size: 1rem;
	}
`;

const SearchHistoryList = styled.section``;

const NoSearchHistory = styled.div`
	margin: 30px auto 30px auto;

	> p {
		width: 88%;
		margin: 0 auto;
	}
`;

const NoSearchHistoryIcon = styled.div`
	display: flex;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	display: flex;
	flex-direction: column;
	gap: 5px;
	align-items: center;
	justify-content: center;

	span {
		font-size: 1rem;
		color: var(--gray200-color);
		text-align: center;
	}
`;
