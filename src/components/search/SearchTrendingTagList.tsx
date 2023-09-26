import styled from 'styled-components';
import { SearchTrendingTagItem } from './SearchTrendingTagItem';

export const SearchTrendingTagList: React.FC = () => {
  const tagData = [
    '🔥 HOT',
    'JavaScript',
    'Styled Components',
    'Web Development',
    'Frontend',
    '유럽여행',
    '용리단길',
    'NBA',
    '피렌체',
  ];

  return (
    <Container>
      {tagData.map((tag, index) => (
        <SearchTrendingTagItem key={index} trendingTag={tag} />
      ))}
    </Container>
  );
};

const Container = styled.section`
  width: 88%;
  padding: 10px 5px;
  gap: 10px;
  margin: 0 auto;
  display: flex;
  overflow: auto;
`;
