import styled from 'styled-components';

import dotIcon from '../../assets/icon/icon-dot.svg';
import testImg from '../../assets/testImg/testimg-user.png';

export interface AccountItemProps {
  id?: number;
  accountName?: string;
  userName?: string;
  follower?: number;
  isFollowing?: boolean;
}

export const AccountItem: React.FC<AccountItemProps> = ({
  accountName,
  userName,
  follower,
  isFollowing,
}) => {
  return (
    <Container>
      <div className="icon-user">
        <img src={testImg} alt="" />
      </div>
      <div className="user-info">
        <span className="user-accountname">hh_lovelyGhost{accountName}</span>
        <div className="user-description">
          <span className="user-nickname">꼬마유령 캐스퍼{userName}</span>
          <img src={dotIcon} alt="spacing dot" />
          {isFollowing ? (
            <span className="user-state">팔로잉</span>
          ) : (
            <span className="user-state">팔로워 {follower} 명</span>
          )}
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  background-color: #ffffff;
  display: flex;
  margin: 10px auto;
  width: 88%;

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
    padding: 5px 10px;
    display: flex;
    flex-direction: column;
    gap: 5px;
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
