import { styled } from 'styled-components';
import dotIcon from '../../../assets/icon/icon-dot.svg';

export const UserItem = ({ handleFunc, profile, userId, userName, isFollow }) => {
  return (
    <Container onClick={() => handleFunc(userId)}>
      <img className="icon-user" src={profile} alt="" />
      <div className="user-info">
        <span className="user-id">{userId}</span>
        <div className="user-description">
          <span className="user-name">{userName}</span>
          {isFollow &&
            <>
              <img src={dotIcon} alt="spacing dot" />
              <span>팔로잉</span>
            </>
          }
        </div>
      </div>
    </Container>
  )
}

const Container = styled.div`
  width: 90%;
  margin-top: 2px;
  margin-right: -5px;
  background-color: #FFF;
  display: flex;
  min-height: 50px;
  margin-bottom: 5px;
  
  & + & {
    margin-top: 6px;
  }
  .icon-user {
    border-radius: 50%;
    border: 1px solid var(--gray200-color);
    width: 40px;
    height: 40px;
    align-self: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  div.user-info {
    margin: auto 0;
    padding: 10px 15px;
    flex-grow: 1;
  }
  div.user-info span {
    display: block;
  }
  span.user-id {
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
