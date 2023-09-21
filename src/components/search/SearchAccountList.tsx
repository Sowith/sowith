import React from 'react';
import { styled } from 'styled-components';
import { AccountItem, AccountItemProps } from './SearchAccountItem';

interface AccountListProps {
  accounts?: AccountItemProps[];
}

const sampleAccounts: AccountItemProps[] = [
  {
    id: 1,
    accountName: 'user1',
    userName: 'nickname1',
    follower: 100,
    isFollowing: false,
  },
  {
    id: 2,
    accountName: 'user2',
    userName: 'nickname2',
    follower: 200,
    isFollowing: true,
  },
  {
    id: 3,
    accountName: 'user3',
    userName: 'nickname3',
    follower: 200,
    isFollowing: true,
  },
  {
    id: 4,
    accountName: 'user4',
    userName: 'nickname4',
    follower: 200,
    isFollowing: true,
  },
];

export const AccountList: React.FC<AccountListProps> = ({
  accounts = sampleAccounts,
}): JSX.Element => {
  return (
    <AccountItemContainer>
      {accounts.map((account) => (
        <AccountItem key={account.id} {...account} />
      ))}
    </AccountItemContainer>
  );
};

const AccountItemContainer = styled.div`
  width: 100%;
  margin: 20px auto;
`;
