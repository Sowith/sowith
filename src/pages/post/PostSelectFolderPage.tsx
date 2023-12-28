import { useEffect, useState } from "react";
import { styled } from "styled-components";

import { useFirestoreRead } from "hooks/useFirestoreRead";
import { useRecoilState } from "recoil";
import postFormState from "recoil/postFormState";

import { SearchBar } from "../../components/post/PostSearchBar";
import { FolderList } from "../../components/common/FolderList";
import { Button } from "../../components/common/Button"
import getUserInfo from "utils/getUserInfo";

import IconFolder from "../../assets/icon/icon-folder-post-only.svg";

interface PostInfo {
  phrase: string,
  location: string,
  folder: string,
  hashtag: string[],
  usertag: string[],
}

interface SelectFolderProps {
  closeModal: () => void;
  setModalIndex?: React.Dispatch<React.SetStateAction<number>>
  setSearchKeyword?: React.Dispatch<React.SetStateAction<string>>
}

export const PostSelectFolderPage: React.FC<SelectFolderProps> = ({ closeModal, setModalIndex }) => {

  const { ReadField } = useFirestoreRead('folders');

  const uid = getUserInfo();

  const [postForm, setPostForm] = useRecoilState(postFormState)
  const [searchKeyword, setSearchKeyword] = useState<any>('');
  const [seletedFolder, setSeletedFolder] = useState<any>(postForm.folder);
  const [archiveFolderData, setArchiveFolderData] = useState<any>([]);


  const handleCloseModal = () => {
    closeModal();
    setTimeout(() => {
      setPostForm((Prev) => {
        const updatedPostInfo = { ...Prev };
        updatedPostInfo.folder = seletedFolder;
        return updatedPostInfo;
      });
    }, 400)
  }

  const openCreateFolderModal = () => {
    closeModal && closeModal();
    setTimeout(() => {
      setModalIndex && setModalIndex(5)
    }, 400)
  }

  const AllFolderData = () => {
    return ReadField('userId', '==', uid).then(response => setArchiveFolderData(response))
  }

  useEffect(() => {
    const fetchData = () => {
      return ReadField('folderNameKeywords', 'array-contains', searchKeyword);
    }
    searchKeyword.length > 0 && fetchData().then(response => setArchiveFolderData(response));
    searchKeyword.length === 0 && AllFolderData()
  }, [searchKeyword])

  return (
    <>
      <SearchBar
        id={'folderSearch'}
        icon={IconFolder}
        placeholder={'폴더 검색...'}
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
      />

      <FolderList
        AllFolderData={AllFolderData}
        archiveFolderData={archiveFolderData}
        setArchiveFolderData={setArchiveFolderData}
        isAddButton={true}
        seletedFolder={seletedFolder}
        setSeletedFolder={setSeletedFolder}
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        setModalIndex={setModalIndex && setModalIndex}
        closeModal={closeModal} />

      {archiveFolderData.length === 0 &&
        <NonFolderContainer>
          <p className="alert-msg">폴더가 존재하지 않습니다</p>
          <Button type="button" text={"폴더생성하기"} width={'112px'} height={'41px'} fontSize={'12px'} fontFamily={'var(--font--Bold)'} borderRadius={'30px'} onClick={openCreateFolderModal} />
        </NonFolderContainer>
      }

      <Button
        type="button"
        text={"완료"}
        width={'90%'}
        height={'41px'}
        fontSize={'12px'}
        margin={'16px 0 16px'}
        fontFamily={'var(--font--Bold)'}
        onClick={handleCloseModal}
      />
    </>
  );
};

const NonFolderContainer = styled.div`
  width: 90%;
  height: calc(100% - 170px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 18px;

  .alert-msg {
    font-size: 16px;
    color: var(--gray200-color);
  }
`;
