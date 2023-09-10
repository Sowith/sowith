import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";

import firebase from "firebase/app";
import { auth } from "../../firebase/config";

import profileimg from "../../assets/profiletest.jpeg";

interface ProfileTopProps {
  userAccountID?: string;
  postCount?: number;
  profileMessage?: null | string;
  howManyfollowers?: number;
  howManyfollowings?: number;
  isProfilemessage?: boolean;
}

export const ProfileTop: React.FC<ProfileTopProps> = ({
  userAccountID,
  postCount,
  profileMessage,
  howManyfollowers,
  howManyfollowings,
}) => {
  const [isProfilemessage, SetIsProfilemessage] = useState(true);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const user = auth.currentUser;

    if (user !== null) {
      const name = user.displayName;
      const email = user.email;
      const photo_url = user.photoURL;
      const uid = user.uid;

      console.log("프로필 탑 유저", user)
      console.log("스테이트 : 유저데이터", userData)

      setUserData({ name, email, photo_url, uid });
    }
  }, []);

  return (
    <ProfileTopContainer>
      <ProfileImage src={profileimg} alt="프로필 이미지"></ProfileImage>
      <ProfileTopInfo>
        <div className="ID-button-wrap">
          <span className="accountID">{userData?.name}</span>
          <button>팔로우</button>
          <button>메세지</button>
        </div>
        <span>게시물(23){postCount}개</span>
        {isProfilemessage === true ? (
          <p>
            프로필 메세지 총 스무 글자입니다하하프로필 메세지 총 스무
            글자입니다하하프로필 메세지 총 스무 글자입니다하하자입니다하하프로필 메세지 총 스무 글자입니다하하자입니다하하프로필 메세지 총 스무 글자입니다하하 {profileMessage}
          </p>
        ) : (
          ""
        )}
        <div className="follow-following-wrap">
          <button>Follower 23{howManyfollowers}</button>
          <button>Following 23{howManyfollowings}</button>
        </div>
      </ProfileTopInfo>
    </ProfileTopContainer>
  );
};

const ProfileTopContainer = styled.section`
  width: 100%;
  margin: 0 auto;
  gap: 3%;
  display: flex;
`;

const ProfileImage = styled.img`
  width: 25%;
  max-width: 180px;
  height: 25%;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  margin: auto 0 auto 6%;
  vertical-align: bottom;
`;

const ProfileTopInfo = styled.div`
  margin: 0 0 0 2%;

  position: relative;
  & > p {
    width: 95%;
    font-size: 0.9rem;
    margin-top: 2%;
  }
  & > span {
    margin-top: 5px;
    font-size: 0.9rem;
    color: var(--gray300-color);
  }
  & .accountID {
    font-size: 1.3rem;
    font-family: var(--font--semibold);
  }

  & .ID-button-wrap {
    margin-top: 10px;
    & button {
      font-size: 0.8rem;
      text-align: center;
      border-radius: 15px;
      box-sizing: border-box;
      padding: 7px 12px;
    }
    & button:nth-child(2) {
      background-color: var(--main-color);
      margin: 0 10px;
    }
    & button:nth-child(3) {
      border: 1px solid var(--main-color);
    }
  }

  & .follow-following-wrap {
    margin-top: 1%;
    & button {
      font-size: 0.8rem;
      padding: 10px 10px 10px 0px;
    }
    & button:nth-child(2) {
      padding-left: 10px;
    }
  }
`;
