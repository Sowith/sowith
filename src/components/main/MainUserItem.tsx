import React from 'react';
import styled from 'styled-components';

import { ReactComponent as IconDotMore } from '../../assets/icon/icon-dot-more.svg';

interface MainUserItemProps {
  profile: string;
  userId: string;
  location: string;
}

export const MainUserItem: React.FC<MainUserItemProps> = ({ profile, userId, location }) => {
  return (
    <Container>
      <img className="icon-user" src={profile} alt="" />
      <div className="user-info">
        <span className="user-id">{userId}</span>
        <span className="post-location">{location}</span>
      </div>
      <div className="more-btn">
        <IconDotMore />
      </div>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: 100%;
  margin-top: 2px;
  margin-right: -5px;
  margin-bottom: 5px;
  background-color: #FFF;
  display: flex;
  min-height: 50px;
  
  & + & {
    margin-top: 6px;
  }
  .icon-user {
    border-radius: 50%;
    border: 1px solid var(--gray200-color);
    margin-left: 5px;
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
  span.user-id {
    font-family: var(--font--Medium);
    font-size: 1rem;
  }
  span.post-location {
    display: flex;
    gap: 5px;
    font-size: 0.8rem;
  }
  div.more-btn {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
  }
`;