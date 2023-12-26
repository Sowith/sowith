import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useFirestoreCreate } from "hooks/useFirestoreCreate";
import { useFirestoreUpdate } from "hooks/useFirestoreUpdate";
import { useCreateKeywords } from "hooks/useCreateKeywords";
import { useImageUpload } from "hooks/useImageUpload";
import { useRecoilValue } from "recoil";
import postFormState from "recoil/postFormState";
import { v4 as uuidv4 } from 'uuid';

import { useAlertControl } from "hooks/useAlertControl";
import { AlertBox } from "components/common/AlertBox";
import { Button } from "../common/Button";

import { ReactComponent as IconArrow } from "../../assets/icon/icon-back-arrow.svg";
import { ReactComponent as IconCamera } from "../../assets/icon/icon-camera.svg";

interface HeaderProps {
  content: string;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  filterStorageLength: number;
  // locationSet: boolean;
}

export const Header: React.FC<HeaderProps> = (props) => {

  const randomDoc = uuidv4()

  const token = sessionStorage.getItem('token');
  const uid = token !== null ? JSON.parse(token).uid : null;

  const { openAlert, AlertComponent } = useAlertControl();

  const postForm = useRecoilValue(postFormState);

  const navigate = useNavigate();

  const { imagesUpload } = useImageUpload()
  const { CreateDocumentManual } = useFirestoreCreate('posts');
  const { generateKeywordCombinations } = useCreateKeywords();

  // const updateTags = () => {
  //   const { UpdateField } = useFirestoreUpdate('tags');
  //   UpdateField(postForm.hashtag, 
  //   {
  //     tagNameKeywords: generateKeywordCombinations(),
  //     taggedFolderIDs: null,
  //     taggedPostIDs: randomDoc,
  //   });
  // }

  // const updateField = () => {
  //   const { UpdateField } = useFirestoreUpdate('folders');
  //   UpdateField('', 
  //   {
  //     uidContainers: uid,
  //   });
  // }

  const handleUpload = async () => {
    const uploadPromises = postForm.picture.map((item) => {
      return imagesUpload("post", item.src, item.filter);
    });


    try {
      // 모든 이미지 업로드를 기다림
      const downloadURLs = await Promise.all(uploadPromises);

      CreateDocumentManual({
        comments: [],
        content: postForm.phrase,
        images: downloadURLs,
        likedUsers: [],
        location: postForm.location,
        hashtags: postForm.hashtag,
        tagUsers: postForm.usertag,
        uuidv4
      }, randomDoc);

    } catch (error) {
      console.error("이미지 업로드 중 오류 발생:", error);
      // 오류 처리
    }
  };

  const handleGoForward = () => {
    if (props.step === 1 && !postForm.location) {
      openAlert();
    } else if (props.step === 1 && postForm.location) {
      handleUpload();
      navigate(-1);
    } else if (props.step === 0 && props.filterStorageLength === 0) {
      openAlert();
    } else {
      props.setStep(Prev => Prev === 0 ? Prev + 1 : Prev)
    }
  }

  const handleGoBack = () => {
    if (props.step === 0) {
      navigate(-1)
    }
    props.setStep(Prev => Prev === 1 ? Prev - 1 : Prev)
  }

  return (
    <>
      <AlertComponent>
        {props.step === 2 && !postForm.location ?
          <AlertBox alertMsg={"위치 지정은 필수입니다."} choice={["확인"]} /> :
          <AlertBox alertMsg={"사진 선택은 필수입니다."} choice={["확인"]} />}
      </AlertComponent>
      <WrapStyle>
        <IconArrow width={30} onClick={handleGoBack} />
        <CameraStyle step={props.step}>
          <IconCamera />
        </CameraStyle>
        <Button
          onClick={handleGoForward}
          type="button"
          text={props.content}
          width={'50px'}
          height={'30px'}
          fontSize={'12px'}
          fontFamily={'var(--font--Bold)'}
          margin={'0px'}
        />
      </WrapStyle>
    </>
  );
};

const WrapStyle = styled.div`
  width: 100%;
  /* min-width: 320px;
  max-width: 768px; */
  position: relative;
  margin: auto;
  padding-bottom: 24px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CameraStyle = styled.div<{ step: number }>`
  display: ${(props) => props.step !== 0 ? "none" : "block"};
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  padding: 6px;
  box-sizing: border-box;
  background-color: var(--main-color);
  right: 65px;
`;
