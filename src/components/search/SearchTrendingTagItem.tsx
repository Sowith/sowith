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
  width: auto;
  font-size: 0.8rem;
  box-sizing: border-box;
  border-radius: 20px;
  cursor: pointer;
  background-color: var(--main-color);
  text-align: center;
  line-height: 2.5;

  span {
    color: #ffffff;
    font-family: var(--font--SemiBold);
  }

  &:hover {
    border: 1px solid var(--main-color);
    background-color: #ffffff;
    margin: -1px;
    span {
      color: var(--main-color);
    }
  }
`;
