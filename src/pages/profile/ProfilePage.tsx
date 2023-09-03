import { styled } from "styled-components";

import { ProfileTop } from "components/profile/ProfileTop";
import { ProfileTabMenu } from "components/profile/ProfileTapMenu";

export const ProfilePage = () => {
  return (
    <>
      <h1 className="a11y-hidden">회원가입 페이지</h1>
      <button>환경 설정</button>
      <ProfilePageWrap>
        <ProfileTop></ProfileTop>
        <ProfileTabMenu></ProfileTabMenu>
      </ProfilePageWrap>
      <button>뒤로가기</button>
    </>
  );
};

const ProfilePageWrap = styled.div`
  width: 80%;
  margin: 0 auto;
`;
