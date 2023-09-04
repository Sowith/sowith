import { styled } from 'styled-components';
import { GroupItem } from './GroupItem';

export const GroupList = () => {
  return (
    <GroupItemContainer>
      <GroupItem />
      <GroupItem />
      <GroupItem />
      <GroupItem />
    </GroupItemContainer>
  );
};

const GroupItemContainer = styled.div`
  width: 90%;
  margin: 0 auto;
`;
