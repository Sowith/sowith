import styled from 'styled-components';

interface TrendingTagItemProps {
  trendingTag?: string;
}

export const SearchTrendingTagItem: React.FC<TrendingTagItemProps> = ({
  trendingTag,
}) => {
  return (
    <Container>
      <span># {trendingTag}</span>
    </Container>
  );
};

const Container = styled.div`
  /* width: auto; */
  white-space: nowrap;
  padding: 10px;
  font-size: 0.8rem;
  box-sizing: border-box;
  border-radius: 20px;
  cursor: pointer;
  background-color: var(--main-color);

  span {
    color: #ffffff;
    font-family: var(--font--SemiBold);
  }

  &:hover {
    outline: 1px solid var(--main-color);
    background-color: #ffffff;
    span {
      color: var(--main-color);
    }
  }
`;
