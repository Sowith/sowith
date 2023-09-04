import { styled } from 'styled-components';
import { AccountItem } from './AccountItem';

export const AccountList = () => {
  return (
    <AccountItemContainer>
      <AccountItem />
      <AccountItem />
      <AccountItem />
      <AccountItem />
    </AccountItemContainer>
  );
};

const AccountItemContainer = styled.div`
  width: 90%;
  margin: 0 auto;
`;
