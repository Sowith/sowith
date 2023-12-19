import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useFirestoreCreate } from "hooks/useFirestoreCreate";
import { useFirestoreUpdate } from "hooks/useFirestoreUpdate";
import { useCreateKeywords } from "hooks/useCreateKeywords";
import { useImageUpload } from "hooks/useImageUpload";
import { useRecoilState } from "recoil";
import postFormState from "recoil/postFormState";
import { Timestamp } from 'firebase/firestore';
import { arrayUnion } from "firebase/firestore";


import { useAlertControl } from "hooks/useAlertControl";
import { AlertBox } from "components/common/AlertBox";
import { Button } from "../common/Button";

import { ReactComponent as IconArrow } from "../../assets/icon/icon-back-arrow.svg";
import { ReactComponent as IconCamera } from "../../assets/icon/icon-camera.svg";
import { useEffect } from "react";

interface HeaderProps {
  content: string;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  filterStorageLength: number;
  // locationSet: boolean;
}

export const Header: React.FC<HeaderProps> = (props) => {

  const [postForm, setPostForm] = useRecoilState(postFormState);

  const { CreateDocument } = useFirestoreCreate('posts');
  const { imagesUpload } = useImageUpload()
  const { generateKeywordCombinations } = useCreateKeywords();
  const { openAlert, AlertComponent } = useAlertControl();
  const navigate = useNavigate();
  const createdAt = Timestamp.fromDate(new Date());

  const UpdateTags = (postId) => {
    const { UpdateField } = useFirestoreUpdate('tags');
    const { CreateDocumentWithCustomID } = useFirestoreCreate('tags');

    postForm.hashtag.map(async (item) => {
      const isExistTag = await UpdateField(
        {
          taggedPostIDs: arrayUnion(postId),
        }, item, false);
      !isExistTag && CreateDocumentWithCustomID(item, {
        createdAt: createdAt,
        tagNameKeywords: generateKeywordCombinations(item),
        taggedFolderIDs: [],
        taggedPostIDs: arrayUnion(postId),
      })
    })
  }

  const UpdateFolders = (postId) => {
    const { UpdateField } = useFirestoreUpdate('folders');
    postForm.folder.map((item) => {
      UpdateField(
        {
          postUids: arrayUnion(postId),
        }, item.id);
    })
  }

  const resetPostForm = () => {
    setPostForm({
      picture: [],
      phrase: '',
      location: '',
      folder: [],
      hashtag: [],
      usertag: []
    })
  }

  const isEmpty = (item) => {
    for (let key in item) {
      if (Array.isArray(item[key]) && item[key].length > 0) {
        return false;
      } else if (typeof item[key] === 'string' && item[key].trim() !== "") {
        return false;
      }
      return true;
    }
  }

  useEffect(() => {
    !isEmpty(postForm) && openAlert();
  }, [])

  const handleUpload = async () => {
    const uploadPromises = postForm.picture.map((item) => {
      return imagesUpload("post", item.src, item.filter);
    });

    try {
      const downloadURLs = await Promise.all(uploadPromises);

      const postId = await CreateDocument({
        comments: [],
        content: postForm.phrase,
        images: downloadURLs,
        likedUsers: [],
        location: postForm.location,
        hashtags: postForm.hashtag,
        tagUsers: postForm.usertag.map(item => item.id),
      });

      UpdateTags(postId)
      UpdateFolders(postId)

      resetPostForm()

    } catch (error) {
      console.error("이미지 업로드 중 오류 발생:", error);
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
        {props.step === 0 && postForm.picture.length === 0 && <AlertBox alertMsg={"사진 선택은 필수입니다."} choice={["확인"]} />}
        {props.step === 0 && !isEmpty(postForm) && <AlertBox alertMsg={"이전에 작성하던 데이터가 있습니다."} choice={["불러오기", "새로작성"]} handleFunc={() => resetPostForm()} />}
        {props.step === 1 && !postForm.location && <AlertBox alertMsg={"사진 선택은 필수입니다."} choice={["확인"]} />}
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
