import styled from "styled-components";

import userImage from "../../assets/testImg/profile_2.jpg";

export const ChatHistoryUserUI = () => {
  return (
    <Outer>
      <UserUIWrap>
        <ImageWrap>
          <img src={userImage}></img>
        </ImageWrap>
        <ContentsWrap>
          <UserName>nkElla</UserName>
          <MessageAndDate>
            <span>메세지</span>
            <span>·</span>
            <span>2일 전</span>
          </MessageAndDate>
        </ContentsWrap>
      </UserUIWrap>
    </Outer>
  );
};
const Outer = styled.article`
  .bar {
    width: 70%;
    height: 1px;
    background: var(--gray100-color);
    margin: 0 auto;
  }
`

const UserUIWrap = styled.div`
  display: flex;
  gap: 15px;
  width: 88%;
  margin: 10px auto;
`;

const ImageWrap = styled.div`
  & img {
    width: 50px;
    border-radius: 50%;
    aspect-ratio: 1/1;
  }
`;

const ContentsWrap = styled.div`
  margin: auto 0;
`;

const UserName = styled.strong`
  display: block;
  font-family: var(--font--SemiBold);
  margin-bottom: 3px;
`;

const MessageAndDate = styled.div`
  display: flex;
  gap: 10px;
`;
