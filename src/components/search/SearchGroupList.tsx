import { styled } from 'styled-components';
import { GroupUI } from 'components/common/GroupUI';

export const GroupList = () => {
  return (
    <GroupItemContainer>
      <GroupUI />
      <GroupUI />
      <GroupUI />
      <GroupUI />
    </GroupItemContainer>
  );
};

const GroupItemContainer = styled.div`
  width: 100%;
  margin: 0 auto;
`;
