import styled from "styled-components";
import { useLocation } from "react-router-dom";

import { ChatBottomAndContents } from "components/chat/ChatBottomAndContents";
import { BackButton } from "components/common/BackButton";

export const ChatRoomPage = () => {
  const location = useLocation();
  const { image, displayName, realName } = location.state || {
    image: "",
    displayName: "",
    realName: "",
  };

  return (
    <>
      <ChatRoomTop>
        <BackButtonWrap>
          <BackButton></BackButton>
        </BackButtonWrap>
        <ImageWrap>
          <img src={image}></img>
        </ImageWrap>
        <ContentsWrap>
          <span className="display-name">{displayName}</span>
          <span className="real-name">{realName}</span>
        </ContentsWrap>
      </ChatRoomTop>
      <ChatBottomAndContents></ChatBottomAndContents>
    </>
  );
};

const ChatRoomTop = styled.div`
  padding-left: 20px;
  width: 100%;
  position: absolute;
  top: 20px;
  display: flex;
  border-bottom: 1px solid var(--gray100-color);
  padding-bottom: 10px;
  box-sizing: border-box;
`;

const Bar = styled.div`
  width: 100%;
  height: 1px;
  margin-top: 100px;
  background-color: var(--gray100-color);
`;

const BackButtonWrap = styled.div`
  margin: auto 0;
`;

const ImageWrap = styled.div`
  margin: 0 10px;
  & img {
    width: 50px;
    aspect-ratio: 1/1;
    border-radius: 50%;
  }
`;

const ContentsWrap = styled.div`
  margin: auto 0;
  & span {
    display: block;
  }
  & .display-name {
    font-family: var(--font--SemiBold);
    margin-bottom: 3px;
  }
  & .real-name {
    color: var(--gray300-color);
    font-size: 14px;
  }
`;
