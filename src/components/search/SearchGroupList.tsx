import styled from 'styled-components';
import { GroupUI } from 'components/common/GroupUI';

interface SearchGroupListProps {
  searchKeyword: string;
}

export const SearchGroupList: React.FC<SearchGroupListProps> = ({
  searchKeyword,
}) => {
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
  margin: 30px auto;
`;
