import { useState, useEffect } from 'react';
import { styled } from 'styled-components';

import { CircleCheckBox } from 'components/common/CheckBox';

import dotIcon from '../../assets/icon/icon-dot.svg';

interface UserItemProps {
  profile: string;
  userId: string;
  userName: string;
  isFollow?: boolean;
  index: number;
  checkedBox: number[];
  setCheckedBox: React.Dispatch<React.SetStateAction<number[]>>;
}

export const UserItem: React.FC<UserItemProps> = ({profile, userId, userName, isFollow, index, checkedBox, setCheckedBox}) => {


  return (
    <>
    <Container>
      <img className="icon-user" src={profile} alt="" />
      <div className="user-info">
        <span className="user-id">{userId}</span>
        <div className="user-description">
          <span className="user-name">{userName}</span>
          {isFollow && (
            <>
              <img src={dotIcon} alt="spacing dot" />
              <span>팔로잉</span>
            </>
          )}
        </div>
      </div>
      <CheckBoxPosition>
        <CircleCheckBox index={index} checkedBox={checkedBox} setCheckedBox={setCheckedBox}/>
      </CheckBoxPosition>
    </Container>
    </>
  );
};

const CheckBoxPosition = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
`;

const Container = styled.div`
  position: relative;
  width: 100%;
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