import { styled } from "styled-components";
import { useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import { useAlertControl } from "hooks/useAlertControl";
import { AlertBox } from "components/common/AlertBox";

import profileimg from "../../assets/profiletest.jpeg";
import updateCancel from "../../assets/icon/icon-profile-update-cancel.svg";
import updateSave from "../../assets/icon/icon-profile-update-save.svg";

export const ProfileUpdatePage = () => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const navigate = useNavigate();

  const [profileSelectedImage, setProfileSelectedImage] = useState<
    string | null
  >(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertChoices, setAlertChoices] = useState<[string, string?]>([
    "",
    undefined,
  ]);
  const { openAlert, AlertComponent } = useAlertControl();

  const handleUpdateImg = (fileBlob: File | null) => {
    if (fileBlob) {
      const reader = new FileReader();
      reader.readAsDataURL(fileBlob);
      reader.onload = () => {
        setProfileSelectedImage(reader.result as string);
      };
    }
  };

  const handleSave = () => {
    navigate("/profilePage")
  }

  return (
    <>
    <ProfileUpdateForm>
      <ProfileUpdateTop>
        <input
          id="fileInput"
          type="file"
          style={{ display: "none" }}
          accept="image/*"
          onChange={(e) => {
            handleUpdateImg(e.target.files ? e.target.files[0] : null);
          }}
        />
        <label htmlFor="fileInput">
          <ProfileUpdateImgWrap>
            <img
              src={profileSelectedImage ? profileSelectedImage : profileimg}
              alt="Upload"
              className="profile-img"
              ref={(ref) => (imgRef.current = ref)}
            />
            <span>프로필 이미지 수정하기</span>
          </ProfileUpdateImgWrap>
        </label>
      </ProfileUpdateTop>
      <ProfileUpdateInputWrap>
        <fieldset>
          <input id="accountID" />
          <label htmlFor="accountID">계정 닉네임</label>
        </fieldset>
        <fieldset>
          <input id="userName" />
          <label htmlFor="userName">이름</label>
        </fieldset>
        <fieldset>
          <textarea id="profileMessage" />
          <label htmlFor="profileMessage">프로필 메세지</label>
        </fieldset>
      </ProfileUpdateInputWrap>

      <button className="update-cancel" onClick={openAlert}>
        <img src={updateCancel} alt="프로필 수정 취소하기 버튼" />
      </button>

      <button className="update-save" onClick={handleSave}>
        <img src={updateSave} alt="수정한 프로필 내용 저장하기 버튼" />
      </button>
    </ProfileUpdateForm>
    <AlertComponent>
        <AlertBox
          alertMsg={"프로필 수정을 취소하시겠습니까?"}
          choice={["취소", "확인"]}
        />
      </AlertComponent>
    </>
  );
};
const ProfileUpdateForm = styled.div`
  position: relative;
  .update-cancel,
  .update-save {
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
  cursor: pointer;
  .profile-img-update {
    position: absolute;
    width: 40px;
    bottom: 0;
    right: 40%;
    z-index: 1;
  }
`;
const ProfileUpdateImgWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 40px;

  & span {
    color: var(--gray200-color);
    font-family: var(--font--Medium);
    cursor: pointer;
  }
  .profile-img {
    cursor: pointer;
    border-radius: 50%;
    width: 30%;
    max-width: 200px;
    aspect-ratio: 1/1;
    position: relative;
    z-index: 1;
    margin-bottom: 15px;
  }
`;

const ProfileUpdateInputWrap = styled.form`
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
