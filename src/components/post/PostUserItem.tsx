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
  selectTag: any;
  setSelectTag: React.Dispatch<React.SetStateAction<any>>;
}

export const UserItem: React.FC<UserItemProps> = ({profile, userId, userName, isFollow, index, selectTag, setSelectTag}) => {

  const handleCheckBox = (e) => {
    setSelectTag && setSelectTag(prevData => {
      if (prevData.includes(userId)) {
        return prevData.filter(item => item !== userId);
      } else {
        return [...prevData, userId];
      }
    });
  };

  return (
    <>
    <Container onClick={handleCheckBox} key={index} data-id={userId}>
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
        <CircleCheckBox id={userId} checkedBox={selectTag} setCheckedBox={setSelectTag}/>
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

const Container = styled.li`
  position: relative;
  width: 100%;
  margin-top: 2px;
  /* margin-right: -5px; */
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
  div.user-description {
    display: flex;
    gap: 5px;
    span {
      font-size: 0.8rem;
      color: #898888;
    }
  }
`;