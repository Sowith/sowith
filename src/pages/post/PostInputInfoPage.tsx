import { useEffect, useState } from "react";
import styled from "styled-components";

import { Input, TextArea } from "../../components/post/PostInput";
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

interface PostInfo {
  phrase: string,
  location: string,
  folder: string,
  hashtag: string[],
  usertag: string[],
}

interface FilterDataItem {
  src: string;
  filter: string;
}

interface PostInputInfoPageProps {
  filterStorage: FilterDataItem[];
  postInfo: PostInfo;
  setPostInfo: React.Dispatch<React.SetStateAction<PostInfo>>;
}

export const PostInputInfoPage: React.FC<PostInputInfoPageProps> = ({ filterStorage, postInfo, setPostInfo }) => {

  const { openModal, closeModal, ModalComponent } = useModalControl();
  const [modalIndex, setModalIndex] = useState<number>(0);
  const [isHashTagSelected, setIsHashTagSelected] = useState<boolean>(false);
  const [isUserTagSelected, setIsUserTagSelected] = useState<boolean>(false);

  const handleModal = (index) => {
    openModal();
    setModalIndex(index)
  }

  useEffect(() => {
    postInfo.hashtag.length !== 0 ? setIsHashTagSelected(true) : setIsHashTagSelected(false);
    postInfo.usertag.length !== 0 ? setIsUserTagSelected(true) : setIsUserTagSelected(false);
  }, [postInfo])

  return (
    <>
      <WrapStyle>
        <SelectedPicture filterStorage={filterStorage}/>
        <TextArea
          type="text"
          id="addPhraseWrite"
          label={'문구 입력'}
          placeholder="문구 입력..."
          icon={IconPhraseWrite}
          height={"100px"}
          setPostInfo={setPostInfo}
        />
        <Input
          value={postInfo.location}
          type="text"
          id="addLocation"
          label={'위치 추가'}
          height={"50px"}
          placeholder="위치 추가 (필수)"
          icon={IconLocation}
          onClick={() => handleModal(1)}
        />
        <Input
          value={postInfo.folder}
          type="text"
          id="addFolder"
          label={'폴더 지정'}
          placeholder="폴더 지정"
          icon={IconFolder}
          onClick={() => handleModal(2)}
        />
        <Input
          selectTag={postInfo.hashtag}
          isHashTagSelected={isHashTagSelected}
          tagname={"hashtag"}
          type="text"
          id="addHashTag"
          label={'해쉬 태그'}
          placeholder="해쉬 태그"
          icon={IconHashTag}
          onClick={() => handleModal(3)}
        />
        <Input
          selectTag={postInfo.usertag}
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
                return <PostSelectLocationPage setPostInfo={setPostInfo} closeModal={closeModal} />;
              case 2:
                return <PostSelectFolderPage setPostInfo={setPostInfo} closeModal={closeModal} setModalIndex={setModalIndex} />;
              case 3:
                return <PostSelectHashTagPage setPostInfo={setPostInfo} closeModal={closeModal} />;
              case 4:
                return <PostSelectUserTagPage setPostInfo={setPostInfo} closeModal={closeModal} />;
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
  display: flex;
  flex-direction: column;
  gap: 24px;
`;