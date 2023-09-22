import { useState } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

import { GroupUI } from "../../common/GroupUI";

import arrowNext from "../../../assets/icon/icon-arrow-next.svg";
import sowithHeart from "../../../assets/icon/icon-sowith-heart.svg";

export const ProfileBottomGroup = () => {
  const [isGroupUI, setIsGroupUI] = useState(true);

  const navigate = useNavigate();
  const openDetail = (currentStepValue) => {
    navigate(`/profiledetailPage/${currentStepValue}`);
  };

  return (
    <ProfileBottomGroupWrap>
      {isGroupUI === true ? (
        <>
          <div className="participated group-tab" onClick={() => openDetail(1)}>
            <span>참여한 그룹</span>
            <button>
              <img src={arrowNext}></img>
            </button>
          </div>
          <GroupUI />
          <GroupUI />
          <GroupUI />
          <div className="line"></div>
          <div className="follow group-tab" onClick={() => openDetail(2)}>
            <span>팔로우 한 그룹</span>
            <button>
              <img src={arrowNext}></img>
            </button>
          </div>
          <GroupUI />
          <GroupUI />
        </>
      ) : (
        <img className="no-group" src={sowithHeart} />
      )}
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

  & .line {
    width: 100%;
    height: 10px;
    background-color: #eaeaea;
    margin: 10px 0;
  }
`;
