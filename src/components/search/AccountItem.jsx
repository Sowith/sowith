import { styled } from 'styled-components';

import dotIcon from '../../assets/icon/icon-dot.svg';
import testImg from '../../assets/testImg/testimg-user.png';

export const AccountItem = () => {
  // 해당 태그가 달린 게시물의 개수에 따라서 대략적인 개수를 정해주는 로직 추가 필요

  return (
    <Container>
      <div className="icon-user">
        <img src={testImg} alt="" />
      </div>
      <div className="user-info">
        <span className="user-accountname">hh_lovelyGhost</span>
        <div className="user-description">
          <span className="user-nickname">꼬마유령 캐스퍼</span>
          <img src={dotIcon} alt="spacing dot" />
          <span className="user-state">팔로워 13만명</span>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  background-color: #ffffff;
  display: flex;
  margin-bottom: 5px;

  div.icon-user {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    align-self: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  div.user-info {
    padding: 10px 15px;
  }

  div.user-info span {
    display: block;
  }

  span.user-accountname {
    font-family: var(--font--Medium);
    font-size: 14px;
  }

  div.user-description {
    display: flex;
    gap: 5px;

    span {
      font-size: 10px;
      color: #898888;
    }
  }
`;
