import { styled } from 'styled-components';

import tagIcon from '../../assets/icon/icon-tag.svg';

export const TagItem = () => {
  // 해당 태그가 달린 게시물의 개수에 따라서 대략적인 개수를 정해주는 로직 추가 필요

  return (
    <Container>
      <div className="icon-tag">
        <img src={tagIcon} alt="" />
      </div>
      <div className="tag-info">
        <span className="tag-title">#가로수길</span>
        <span className="tag-number">게시물 3000+개</span>
      </div>
    </Container>
  );
};

const Container = styled.div`
  background-color: #ffffff;
  display: flex;
  margin-bottom: 5px;

  div.icon-tag {
    border-radius: 50%;
    border: 1px solid var(--gray200-color);
    width: 40px;
    height: 40px;
    align-self: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  div.tag-info {
    padding: 10px 15px;
  }

  div.tag-info span {
    display: block;
  }

  span.tag-title {
    font-family: var(--font--Medium);
    font-size: 14px;
  }

  span.tag-number {
    font-size: 10px;
    color: #898989;
  }
`;
