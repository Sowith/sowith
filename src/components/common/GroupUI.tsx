import { styled } from "styled-components";
import { useState } from "react";

import testImg from "../../assets/testImg/testimg-post.svg";
import groupParticipatedUserImg from "../../assets/testImg/testimg-user.png";

interface GroupUIProps {
  groupTitle?: string;
  groupTag?: string;
  groupParticipatedUser?: number;
  groupFriendsWith?: string;
}

export const GroupUI: React.FC<GroupUIProps> = ({
  groupTitle,
  groupTag,
  groupParticipatedUser,
  groupFriendsWith,
}) => {
  const [isWith, setIsWith] = useState(false);

  return (
    <GroupUIWrap>
      <img src={testImg} />
      <ContentsWrap>
        <h3>다람쥐 도토리 주기 모임 {groupTitle}</h3>
        <span># 당근 노맛 {groupTag}</span>
        <span># 당근 짱맛 {groupTag}</span>
        <div style={{ display: "flex" }}>
          <UserImgWrap>
            <div>
              <img src={groupParticipatedUserImg}></img>
              <img src={groupParticipatedUserImg}></img>
              <img src={groupParticipatedUserImg}></img>
              {isWith === true ? (
                <span>
                  lucy{groupFriendsWith}외 {groupParticipatedUser}3 명
                </span>
              ) : (
                <span>외 {groupParticipatedUser}2 명</span>
              )}
            </div>
          </UserImgWrap>
        </div>
      </ContentsWrap>
    </GroupUIWrap>
  );
};
const GroupUIWrap = styled.article`
  width: 88%;
  margin: 0 auto;
  padding: 10px 0;
  border-bottom: 1px solid var(--gray100-color);
  box-sizing: border-box;
  display: flex;

  & > img {
    display: inline-block;
    width: 25%;
    max-width: 100px;
    border-radius: 10px;
  }
`;

const ContentsWrap = styled.div`
  padding-left: 15px;
  position: relative;

  & h3 {
    font-size: 1rem;
  }

  & > span {
    font-size: 0.8rem;
  }
`;

const UserImgWrap = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;

  & div {
    position: relative;
    & img {
      width: 30px;
    }
    & img:nth-child(2) {
      position: absolute;
      left: 10%;
    }
    & img:nth-child(3) {
      position: absolute;
      left: 20%;
    }
    & span {
      position: absolute;
      left: 40%;
      display: inline-block;
      font-size: 0.8rem;
      line-height: 40px;
    }
  }
`;
