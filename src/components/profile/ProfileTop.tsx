import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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

      setUserData({ name, email, photo_url, uid });
    }
  }, []);

  const navigate = useNavigate()
const goToProfileUpdatePage = () => {
  navigate("/profileUpdatePage")
}

  return (
    <ProfileTopContainer>
      <div className="profileTopLeft">
      <ProfileImage src={userData?.photo_url} alt="프로필 이미지"></ProfileImage>
      <button onClick={goToProfileUpdatePage}>프로필 수정</button>
      </div>
      <ProfileTopInfo>
        <div className="ID-button-wrap">
          <span className="accountID">{userData?.name}</span>
          <div>
          <button>팔로우</button>
          <button>메세지</button>
          </div>
        </div>
        <span>게시물(23){postCount}개</span>
        {isProfilemessage === true ? (
          <p>
            나랑 도토리 한사발 할텨? 나랑 도토리 한사발 할텨? 나랑 도토리 한사발 할텨? 나랑 도토리 한사발 할텨? 나랑 도토리 한사발 할텨? 나랑 도토리 한사발 할텨?{profileMessage}
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
  align-items: center;

  .profileTopLeft {
    display: flex;
    flex-direction: column;
    min-width: 90px;
    align-items: center;
    margin-left: 3%;
    button {
      width: 80px;
      border: 1px solid black;
      padding: 2px;
      font-size: 14px;
      text-align: center;
      margin-top: 20px;
      font-family: var(--font--Regular);
      border-radius: 5px;
    }
  }
  
`;

const ProfileImage = styled.img`
  width: 100%;
  max-width: 100px;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
`;

const ProfileTopInfo = styled.div`
  margin: 0 0 0 2%;

  position: relative;
  & > p {
    width: 95%;
    font-size: 14px;
    margin-top: 2%;
  }
  & > span {
    margin-top: 5px;
    font-size: 14px;
    color: var(--gray300-color);
  }
  & .accountID {
    font-size: 1.3rem;
    font-family: var(--font--semibold);
  }

  & .ID-button-wrap {
    margin-top: 10px;
    display: flex;
    position: relative;
    & > div {
      position: absolute;
      right: 5%;
      & button {
        font-size: 0.8rem;
        text-align: center;
        border-radius: 15px;
        box-sizing: border-box;
        padding: 7px 12px;
      }
      & button:nth-child(1) {
        background-color: var(--main-color);
        margin: 0 10px;
      }
      & button:nth-child(2) {
        border: 1px solid var(--main-color);
      }
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
