import { styled } from "styled-components";
import { useState } from "react";

import profileimg from "../../assets/profiletest.jpeg";
import profileImgUpdate from "../../assets/icon/icon-profile-update-img.svg";
import updateCancel from "../../assets/icon/icon-profile-update-cancel.svg";
import updateSave from "../../assets/icon/icon-profile-update-save.svg";

export const ProfileUpdatePage = () => {
  return (
    <ProfileUpdateForm>
      <ProfileUpdateTop>
        <input
          id="fileInput"
          type="file"
          style={{ display: "none" }}
          accept="image/jpeg, image/png, image/svg"
        />
        <label htmlFor="fileInput">
          <ProfileUpdateImgWrap>
            <img src={profileimg} alt="Upload" className="profile-img" />
          </ProfileUpdateImgWrap>

          <img
            className="profile-img-update"
            src={profileImgUpdate}
            alt="Upload"
          />
        </label>
      </ProfileUpdateTop>
      <ProfileUpdateInputWrap>
        <fieldset>
          <input id="accountID"></input>
          <label htmlFor="accountID">계정 닉네임</label>
        </fieldset>
        <fieldset>
          <input id="userName" className="input"></input>
          <label htmlFor="userName">이름</label>
        </fieldset>
        <fieldset>
          <textarea className="input" id="profileMessage"></textarea>
          <label htmlFor="profileMessage">프로필 메세지</label>
        </fieldset>
      </ProfileUpdateInputWrap>
      <button className="update-cancel">
        <img src={updateCancel} alt="프로필 수정 취소하기 버튼" />
      </button>
      <button className="update-save">
        <img src={updateSave} alt="수정한 프로필 내용 저장하기 버튼" />
      </button>
    </ProfileUpdateForm>
  );
};
const ProfileUpdateForm = styled.form`
  position: relative;
  & > button {
    padding: 10px;
    position: absolute;
    top: 10px;
  }
  .update-cancel {
    left: 10px;
  }
  .update-save {
    right: 10px;
  }
`;

const ProfileUpdateTop = styled.div`
  position: relative;
  .profile-img-update {
    position: absolute;
    width: 40px;
    bottom: 0;
    right: 35vw;
    z-index: 1;
  }
`;
const ProfileUpdateImgWrap = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 40px;
  position: relative;
  & > div {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  .profile-img {
    width: 30%;
    border-radius: 50%;
    max-width: 180px;
    aspect-ratio: 1/1;
    position: relative;
    z-index: 1;
  }
`;

const ProfileUpdateInputWrap = styled.section`
  & fieldset {
    display: flex;
    flex-direction: column-reverse;
    border: none;
  }

  & label {
    color: var(--gray300-color);
    margin-top: 20px;
    font-weight: 700;
  }
  input:focus + label,
  textarea:focus + label {
    color: var(--main-color);
}

  & input {
    border: none;
    border-bottom: 2px solid var(--gray300-color);
    padding: 10px;
    font-size: 16px;
  }

  & textarea {
    font-size: 16px;
    resize: none;
    outline: none;
    height: 10vh;
    margin-top: 15px;
    border: 2px solid var(--gray300-color);
    border-radius: 10px;
    padding: 10px;
  }

  & input:focus,
  textarea:focus {
    outline: none;
    border-bottom: solid 2px transparent;
    background-image: linear-gradient(white, white),
      linear-gradient(to right, #ff547c, #ffc76c);
    background-origin: border-box;
    background-clip: padding-box, border-box;
  }

  & textarea:focus {
    border: solid 2px transparent;
    border-radius: 10px;
  }
`;

// const Label = styled.label<ProfileUpdatePageProps>`
//   color: ${(props) =>
//     props.focusCheck ? "var(--main-color)" : "var(--gray300-color)"};
//   font-weight: ${(props) => (props.focusCheck ? 700 : "normal")};
// `;
