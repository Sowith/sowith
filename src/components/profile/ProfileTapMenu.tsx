import { styled } from "styled-components";
import { useState } from "react";

import { ProfileBottomPost } from "./profileBottom/ProfileBottomPost";
import { ProfileBottomFolder } from "./profileBottom/ProfileBottomFolder";
import { ProfileBottomGroup } from "./profileBottom/profileBottomGroup";
import { ProfileBottomBookMark } from "./profileBottom/ProfileBottomBookMark";

import iconPost from "../../assets/icon/icon-post.svg";
import iconFolder from "../../assets/icon/icon-folder.svg";
import iconGroup from "../../assets/icon/icon-group.svg";
import iconBookmark from "../../assets/icon/icon-bookmark.svg";

export const ProfileTabMenu = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const openTabMenu = (currentStep) => {
    setCurrentStep(currentStep);
  };

  return (
    <>
      {" "}
      <ProfileTabMenuWrap>
        <div>
          <button onClick={() => openTabMenu(1)}>
            <img src={iconPost} />
          </button>
          <button onClick={() => openTabMenu(2)}>
            <img src={iconFolder} />
          </button>
          <button onClick={() => openTabMenu(3)}>
            <img src={iconGroup} />
          </button>
          <button onClick={() => openTabMenu(4)}>
            <img src={iconBookmark} />
          </button>
        </div>
      </ProfileTabMenuWrap>
      <ProfileBottom>
        {currentStep === 1 && <ProfileBottomPost />}
        {currentStep === 2 && <ProfileBottomFolder />}
        {currentStep === 3 && <ProfileBottomGroup />}
        {currentStep === 4 && <ProfileBottomBookMark />}
      </ProfileBottom>
    </>
  );
};

const ProfileTabMenuWrap = styled.div`
  width: 100%;
  background-color: skyblue;

  & > div {
    display: flex;
    justify-content: space-evenly;
    button {
      padding: 5px 10px;
      box-shadow: inset 1px 1px 10px red;
      box-sizing: border-box;
    }
  }
`;

const ProfileBottom = styled.section`
  width: 100%;
  background-color: #76895a;
`;
