import { useState, useEffect } from 'react';
import { useFirestoreRead } from 'hooks/useFirestoreRead';
import { styled } from 'styled-components';

import { AccountItem, AccountItemProps } from './SearchAccountItem';

interface AccountListProps {
	searchKeyword: string;
}

export const AccountList: React.FC<AccountListProps> = ({
	searchKeyword,
}): JSX.Element => {
	const [archiveUserData, setArchiveUserData] = useState<AccountItemProps[]>(
		[]
	);
	const firestoreReader = useFirestoreRead('users');

	useEffect(() => {
		const fetchFilteredUsers = async () => {
			const response = await firestoreReader.ReadField(
				'userId',
				'==',
				searchKeyword
			);

			const userData: AccountItemProps[] = response.map((item) => ({
				id: item.id,
				accountName: item.data.userId,
				userName: item.data.userName,
				follower: item.data.followers,
				profileImageURL: item.data.profile,
			}));

			setArchiveUserData(userData);
		};

		fetchFilteredUsers();
	}, []);

	return (
		<AccountItemContainer>
			{archiveUserData.map((item) => (
				<AccountItem {...item} />
			))}
		</AccountItemContainer>
	);
};

const AccountItemContainer = styled.div`
	width: 100%;
	margin: 30px auto;
`;
