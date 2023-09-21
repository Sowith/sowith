import { styled } from "styled-components";

import { ProfileTop } from "components/profile/ProfileTop";
import { ProfileTabMenu } from "components/profile/ProfileTapMenu";

import arrowBack from "../../assets/icon/icon-arrow.svg";
import setting from "../../assets/icon/icon-setting.svg";

export const ProfilePage = () => {
  return (
    <>
      <h1 className="a11y-hidden">회원가입 페이지</h1>
      <SettingButton>
        <img src={setting} />
      </SettingButton>
      <ProfilePageWrap>
        <ProfileTop />
        <ProfileTabMenu />
      </ProfilePageWrap>
      <ArrowBackButton>
        <img src={arrowBack} />
      </ArrowBackButton>
    </>
  );
};

const ProfilePageWrap = styled.div`
  width: 100%;
  margin: 40px auto 0;
  position: relative;
`;

const SettingButton = styled.button`
  cursor: pointer;
  position: absolute;
  top: 25px;
  right: 15px;
  padding: 10px;
`;

const ArrowBackButton = styled.button`
  cursor: pointer;
  position: absolute;
  top: 15px;
  left: 15px;
  padding: 10px;
`;
