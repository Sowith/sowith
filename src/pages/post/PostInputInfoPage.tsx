import { useEffect, useState } from "react";
import styled from "styled-components";

import { useRecoilValue } from "recoil";
import postFormState from "recoil/postFormState";

import { WritableTextarea, ReadonlyTextarea, ReadonlyInput } from "../../components/post/PostInput";
import { SelectedPicture } from "../../components/post/PostSelectedPicture";

import IconPhraseWrite from "../../assets/icon/icon-phrase-write.svg";
import IconLocation from "../../assets/icon/icon-location.svg";
import IconFolder from "../../assets/icon/icon-folder-post-only.svg";
import IconHashTag from "../../assets/icon/icon-hash-tag.svg";
import IconUserTag from "../../assets/icon/icon-user-tag.svg";
import { useModalControl } from "hooks/useModalControl";
import { PostSelectLocationPage } from "./PostSelectLocationPage";
import { PostSelectFolderPage } from "./PostSelectFolderPage";
import { PostSelectHashTagPage } from "./PostSelectHashTagPage";
import { PostSelectUserTagPage } from "./PostSelectUserTagPage";
import { PostCreateFolderPage } from "./PostCreateFolderPage";

interface FilterDataItem {
  src: string;
  filter: string;
}

interface PostInputInfoPageProps {
  filterStorage: FilterDataItem[];
}

export const PostInputInfoPage: React.FC<PostInputInfoPageProps> = ({ filterStorage }) => {
  const { openModal, closeModal, ModalComponent } = useModalControl(54);
  const [modalIndex, setModalIndex] = useState<number>(0);
  const [isModalOn, setIsModalOn] = useState<boolean>(false);
  const [firstMount, setFirstMount] = useState<boolean>(true);
  const [isHashTagSelected, setIsHashTagSelected] = useState<boolean>(false);
  const [isUserTagSelected, setIsUserTagSelected] = useState<boolean>(false);

  const postForm = useRecoilValue(postFormState)

  useEffect(() => {
    if (!firstMount) {
      openModal();
      setIsModalOn(false);
    }
    firstMount && setFirstMount(false)
  }, [isModalOn])  

  const handleModal = (index) => {
    setModalIndex(index);
    setIsModalOn(true)
  }
  
  useEffect(() => {
    postForm.hashtag.length !== 0 ? setIsHashTagSelected(true) : setIsHashTagSelected(false);
    postForm.usertag.length !== 0 ? setIsUserTagSelected(true) : setIsUserTagSelected(false);
  }, [postForm])

  useEffect(() => {
    modalIndex === 5 && openModal();
  }, [modalIndex])

  return (
    <>
      <WrapStyle>
        <SelectedPicture filterStorage={filterStorage}/>
        <WritableTextarea
          value={postForm.phrase}
          type="text"
          id="addPhraseWrite"
          label={'문구 입력'}
          placeholder="문구 입력..."
          icon={IconPhraseWrite}
          height={"100px"}
        />
        <ReadonlyTextarea
          value={postForm.location}
          type="text"
          id="addLocation"
          label={'위치 추가'}
          height={"50px"}
          placeholder="위치 추가 (필수)"
          icon={IconLocation}
          onClick={() => handleModal(1)}
        />
        <ReadonlyTextarea
          value={postForm.folder.join(' / ')}
          type="text"
          id="addFolder"
          label={'폴더 지정'}
          placeholder="폴더 지정"
          icon={IconFolder}
          onClick={() => handleModal(2)}
        />
        <ReadonlyInput
          selectTag={postForm.hashtag}
          isHashTagSelected={isHashTagSelected}
          tagname={"hashtag"}
          type="text"
          id="addHashTag"
          label={'해쉬 태그'}
          placeholder="해쉬 태그"
          icon={IconHashTag}
          onClick={() => handleModal(3)}
        />
        <ReadonlyInput
          selectTag={postForm.usertag}
          isUserTagSelected={isUserTagSelected}
          tagname={"usertag"}
          type="text"
          id="addUserTag"
          label={'유저 태그'}
          placeholder="유저 태그"
          icon={IconUserTag}
          onClick={() => handleModal(4)}
        />
      </WrapStyle>
      <ModalComponent>
        {
          (() => {
            switch (modalIndex) {
              case 1:
                return <PostSelectLocationPage closeModal={closeModal} />;
              case 2:
                return <PostSelectFolderPage closeModal={closeModal} setModalIndex={setModalIndex}/>;
              case 3:
                return <PostSelectHashTagPage closeModal={closeModal} />;
              case 4:
                return <PostSelectUserTagPage closeModal={closeModal} />;
              case 5:
                return <PostCreateFolderPage closeModal={closeModal}/>;
            }
          })()
        }
      </ModalComponent>
    </>
  );
};

const WrapStyle = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;