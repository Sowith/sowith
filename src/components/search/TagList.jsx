import { styled } from 'styled-components';
import { TagItem } from './TagItem';

export const TagList = () => {
  return (
    <TagItemContainer>
      <TagItem />
      <TagItem />
      <TagItem />
      <TagItem />
    </TagItemContainer>
  );
};

const TagItemContainer = styled.div`
  width: 90%;
  margin: 0 auto;
`;
