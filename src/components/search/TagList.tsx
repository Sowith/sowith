import { styled } from 'styled-components';
import { TagItem, TagItemProps } from './TagItem';

interface TagData extends TagItemProps {
  id: number;
}

const sampleTags: TagData[] = [
  { id: 1, tagTitle: '#태그1', tagNumber: 100 },
  { id: 2, tagTitle: '#태그2', tagNumber: 200 },
  { id: 3, tagTitle: '#태그3', tagNumber: 150 },
  { id: 4, tagTitle: '#태그4', tagNumber: 250 },
];

export const TagList = () => {
  return (
    <TagItemContainer>
      {/* 3. 데이터 맵핑 */}
      {sampleTags.map((tag) => (
        <TagItem
          key={tag.id}
          tagTitle={tag.tagTitle}
          tagNumber={tag.tagNumber}
        />
      ))}
    </TagItemContainer>
  );
};

const TagItemContainer = styled.div`
  width: 90%;
  margin: 0 auto;
`;
