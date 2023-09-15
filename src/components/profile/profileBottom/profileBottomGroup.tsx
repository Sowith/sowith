import { useState } from "react";
import { styled } from "styled-components";

import { GroupUI } from "../../common/GroupUI";

import arrowNext from "../../../assets/icon/icon-arrow-next.svg";
import sowithHeart from "../../../assets/icon/icon-sowith-heart.svg";

export const ProfileBottomGroup = () => {

  const [isGroupUI, setIsGroupUI] = useState(true)

  return (
    <ProfileBottomGroupWrap>
      {isGroupUI === true ? (
        <>
        <div className="participated group-tab">
        <span>참여한 그룹</span>
        <button>
          <img src={arrowNext}></img>
        </button>
      </div>
      <GroupUI />
      <GroupUI />
      <GroupUI />
      <div className="follow group-tab">
        <span>팔로우 한 그룹</span>
        <button>
          <img src={arrowNext}></img>
        </button>
      </div>
      <GroupUI />
      <GroupUI />
      </>
      ) : <img className="no-group" src={sowithHeart} /> }
    </ProfileBottomGroupWrap>
  );
};

const ProfileBottomGroupWrap = styled.section`
  margin-top: 3%;
  position: relative;

  & .group-tab {
    cursor: pointer;
    width: 88%;
    margin: 10px auto 0;
    display: flex;
    justify-content: space-between;
    & span {
      font-family: var(--font--SemiBold);
      line-height: 27px;
    }
    & img {
      width: 27px;
    }
  }

  & .no-group {
    position: absolute;
    top: 250%;
    left: 50%;
  }
`;
