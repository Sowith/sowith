import { ChatSelectUser } from "pages/chat/ChatSelectUserPage";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../common/Button";

import sample from "../../assets/testImg/profile_5.jpg";

export const ChatSelectUserUI = () => {
  const [chatSelectUserData, setChatSelectUserData] = useState({
    user: {
      image: sample,
      displayName: "nkElla",
      realName: "김바보",
    },
  });

  const navigate = useNavigate();
  const goToChatRoom = () => {
    navigate("/chatRoom", { state: chatSelectUserData.user });
  };

  return (
    <>
      <SelectUserWrap>
        <div className="left">
          <ImageWrap>
            <img src={sample}></img>
          </ImageWrap>
          <ContentsWrap>
            <UserName>nkElla</UserName>
            <RealName>최나경</RealName>
          </ContentsWrap>
        </div>
        <div className="right">
          <Button
            text="선택"
            padding="0"
            width="50px"
            height="30px"
            borderRadius="5px"
            margin="0"
            onClick={goToChatRoom}
          ></Button>
        </div>
      </SelectUserWrap>
    </>
  );
};

const SelectUserWrap = styled.article`
  display: flex;
  width: 88%;
  margin: 10px auto;
  justify-content: space-between;

  & .left {
    display: flex;
    flex-direction: row;
    gap: 15px;
  }

  & .right {
    margin: auto 0;
  }
`;

const ImageWrap = styled.div`
  & img {
    width: 50px;
    aspect-ratio: 1/1;
    border-radius: 50%;
  }
`;

const ContentsWrap = styled.div``;

const UserName = styled.div`
  font-family: var(--font--SemiBold);
`;

const RealName = styled.div`
  color: var();
`;