import { styled } from 'styled-components';
import { TagItem, TagItemProps } from './SearchTagItem';

interface TagData extends TagItemProps {
  id: number;
}

const sampleTags: TagData[] = [
  { id: 1, tagTitle: '#태그1', tagNumber: 100 },
  { id: 2, tagTitle: '#태그2', tagNumber: 200 },
  { id: 3, tagTitle: '#태그3', tagNumber: 150 },
  { id: 4, tagTitle: '#태그4', tagNumber: 250 },
];

interface SearchTagListProps {
  searchKeyword: string;
}

export const TagList: React.FC<SearchTagListProps> = ({ searchKeyword }) => {
  // 로직 추가
  // firestore에서 태그 리스트 데이터를 불러올 때 SearchBar의 placeholder에 입력된 문자열을 기반으로 filter된 태그 리스트 데이터를 불러오도록 수정

  return (
    <TagItemContainer>
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
  width: 100%;
  margin: 30px auto;
`;
