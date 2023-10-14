import { useState } from "react";
import { styled } from "styled-components";

import { SearchBar } from "../../components/post/PostSearchBar";
import { FolderList } from "../../components/common/FolderList";
import { Button } from "../../components/common/Button"

import IconFolder from "../../assets/icon/icon-folder-post-only.svg";

interface PostInfo {
  phrase: string,
  location: string,
  folder: string,
  hashtag: string[],
  usertag: string[],
}

interface SelectFolderProps {
  setPostInfo: React.Dispatch<React.SetStateAction<PostInfo>>
  closeModal: () => void;
  setModalIndex?: React.Dispatch<React.SetStateAction<number>>
  setSearchKeyword?: React.Dispatch<React.SetStateAction<string>>
}

interface FolderData {
  folderId: number;
  name: string;
  totalpost: number;
  bookmark: boolean;
  src: string[];
}

export const PostSelectFolderPage: React.FC<SelectFolderProps> = ({ setPostInfo, closeModal, setModalIndex }) => {

  const folderData: FolderData[] = [
    {
      folderId: 1,
      name: "빠니보틀의 로드맵",
      totalpost: 10,
      bookmark: true,
      src: [
        "https://picsum.photos/200/191",
        "https://picsum.photos/200/192",
        "https://picsum.photos/200/193",
        "https://picsum.photos/200/194",
      ],
    },
    {
      folderId: 2,
      name: "용리단길 맛집 모음",
      totalpost: 78,
      bookmark: true,
      src: [
        "https://picsum.photos/200/195",
        "https://picsum.photos/200/196",
        "https://picsum.photos/200/197",
        "https://picsum.photos/200/198",
      ],
    },
    {
      folderId: 3,
      name: "내 2023년 여름",
      totalpost: 10,
      bookmark: false,
      src: [
        "https://picsum.photos/200/199",
        "https://picsum.photos/200/200",
        "https://picsum.photos/200/201",
        "https://picsum.photos/200/202",
      ],
    },
  ];

  const [searchKeyword, setSearchKeyword] = useState<string | string[]>([]);
  const [archiveFolderData, setArchiveFolderData] = useState<FolderData[]>(folderData);

  const handleCloseModal = () => {
    closeModal();
    setPostInfo((Prev) => {
      const updatedPostInfo = { ...Prev };
  
      if (typeof searchKeyword === 'string') {
        updatedPostInfo.folder = searchKeyword;
      } else {
        updatedPostInfo.folder = searchKeyword.join(' / ');
      }
      return updatedPostInfo;
    });
  }
  
  

  return (
    <>
      <SearchBar
        id={'folderSearch'}
        icon={IconFolder}
        placeholder={'폴더 검색...'}
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
      />

      <FolderList archiveFolderData={archiveFolderData} setArchiveFolderData={setArchiveFolderData} isAddButton={true} setSearchKeyword={setSearchKeyword} setModalIndex={setModalIndex && setModalIndex}/>

      {archiveFolderData.length === 0 &&
        <NonFolderContainer>
          <p className="alert-msg">폴더가 존재하지 않습니다</p>
          <Button type="button" text={"폴더생성하기"} width={'112px'} height={'41px'} fontSize={'12px'} fontFamily={'var(--font--Bold)'} borderRadius={'30px'} />
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
