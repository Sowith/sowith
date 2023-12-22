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
			const responseIdQuery = await firestoreReader.ReadField(
				'accountIdKeywords',
				'array-contains',
				searchKeyword
			);
			const responseNameQuery = await firestoreReader.ReadField(
				'accountNameKeywords',
				'array-contains',
				searchKeyword
			);

			const combinedResponse = [
				...responseIdQuery,
				...responseNameQuery,
			].reduce((acc, current) => {
				if (!acc.find((item) => item.id === current.id)) {
					acc.push(current);
				}
				return acc;
			}, [] as { id: string; data: any }[]);

			const userData: AccountItemProps[] = combinedResponse.map((item) => ({
				id: item.id,
				accountId: item.data.accountId,
				accountName: item.data.accountName,
				followers: item.data.followers,
				profileImageURL: item.data.profileImageURL,
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
