import { styled } from "styled-components";
import { useState, useEffect, FormEvent } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, updateProfile, createUserWithEmailAndPassword } from "firebase/auth";

import { useProfileUpdateHook } from "hooks/useProfileUpdate";
import { useAlertControl } from "hooks/useAlertControl";
import { AlertBox } from "components/common/AlertBox";

import profileimg from "../../assets/profiletest.jpeg";
import updateCancel from "../../assets/icon/icon-profile-update-cancel.svg";
import updateSave from "../../assets/icon/icon-profile-update-save.svg";

export const ProfileUpdatePage = () => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const navigate = useNavigate();
  const { openAlert, AlertComponent } = useAlertControl();
  
  const [profileImg, setProfileImg] = useState("")

  const [profileUpdateData, setProfileUpdateData] = useState({
    displayName: "",
    userRealName: "",
    profileMessage: "",
    profileImage: profileImg,
  });
  
  const { updateProfileInfo } = useProfileUpdateHook();
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setProfileUpdateData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

const handleUpdateImg = (fileBlob: File | null) => {
  if (fileBlob) {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    reader.onload = () => {
      setProfileImg(reader.result as string);
      // setProfileUpdateData((prevState) => ({
      //   ...prevState,
      //   profileImage: reader.result as string,
      // }));
    };
  }
};

  const { displayName, userRealName, profileMessage, profileImage } = profileUpdateData;

  const handleSave = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        console.log("로그인 안했을 땐데 우리는 그럴 일이 없다");
        return;
      }

      await updateProfile(user, {
        displayName: displayName,
        photoURL: profileImage,
      });

      console.log("프로필 데이터가 성공적으로 업데이트되었습니다.");
      navigate("/profilePage");

    } catch (error) {
      console.error("프로필 업데이트 오류:");
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("섭밋했을 때 이미지", profileImg );
    console.log("업데이트 할 데이터", profileUpdateData)
  };

  return (
    <>
      <ProfileUpdateForm onSubmit={handleSubmit}>
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
                src={profileImg ? profileImg : profileimg}
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
            <input
              type="text"
              id="accountID"
              name="displayName"
              value={displayName}
              onChange={handleInputChange}
            />
            <label htmlFor="accountID">계정 닉네임</label>
          </fieldset>
          <fieldset>
            <input
              id="userName"
              type="text"
              name="userRealName" // 필드 이름을 설정
              value={userRealName}
              onChange={handleInputChange}
              placeholder="이름"
            />
            <label htmlFor="userName">이름</label>
          </fieldset>
          <fieldset>
            <textarea
              id="profileMessage"
              name="profileMessage" // 필드 이름을 설정
              value={profileMessage}
              onChange={handleInputChange}
            />
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

const ProfileUpdateForm = styled.form`
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
