import React from "react";
import styled from "styled-components";

import profileimg from "../../assets/profiletest.jpeg";

interface ProfileTopProps {
  userAccountID?: string;
  postCount?: number;
  profileMessage?: null | string;
  howManyfollowers?: number;
  howManyfollowings?: number;
}

export const ProfileTop: React.FC<ProfileTopProps> = ({
  userAccountID,
  postCount,
  profileMessage,
  howManyfollowers,
  howManyfollowings,
}) => {
  return (
    <ProfileTopContainer>
      <ProfileImage src={profileimg} alt="프로필 이미지"></ProfileImage>
      <ProfileTopInfo>
        <span className="accountID">(유저아이디){userAccountID}</span>
        <span>게시물(23){postCount}개</span>
        <p>{profileMessage}</p>
        <div>
          <button>팔로워(23){howManyfollowers}명</button>
          <button>팔로잉(23){howManyfollowings}명</button>
        </div>
      </ProfileTopInfo>
    </ProfileTopContainer>
  );
};

const ProfileTopContainer = styled.section`
  width: 100%;
  box-shadow: inset 1px 1px 10px red;
  display: flex;
`;

const ProfileImage = styled.img`
  width: 30%;
  height: 30%;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
`;

const ProfileTopInfo = styled.div`
  margin: 0 auto;

  & > span {
    display: block;
  }
  & .accountID {
    font-size: 1.3rem;
  }

  button {
    font-size: 0.8rem;
  }
`;
