import { styled } from "styled-components";

import { ProfileTop } from "components/profile/ProfileTop";
import { ProfileTabMenu } from "components/profile/ProfileTapMenu";
import { BackButton } from "components/common/BackButton";

import setting from "../../assets/icon/icon-setting.svg";

export const ProfilePage = () => {
  return (
    <>
      <h1 className="a11y-hidden">프로필 페이지</h1>
      <SettingButton>
        <img src={setting} />
      </SettingButton>
      <ProfilePageWrap>
        <ProfileTop />
        <ProfileTabMenu />
      </ProfilePageWrap>
      <ArrowBackButton>
        <BackButton />
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
  top: 15px;
  right: 15px;
  padding: 10px;
`;

const ArrowBackButton = styled.button`
  cursor: pointer;
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 10px;
`;
