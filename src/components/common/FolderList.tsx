import { useState } from "react";
import { styled } from 'styled-components';

import { useFirestoreUpdate } from "hooks/useFirestoreUpdate";

import { ReactComponent as IconBookmark } from '../../assets/icon/icon-bookmark-post-only.svg';

interface FolderDataItem {
  folderId: number;
  src: string[];
  name: string;
  totalpost: number;
  bookmark: boolean;
}

interface FolderListProps {
  fetchData?: () => void;
  archiveFolderData: any;
  setArchiveFolderData: React.Dispatch<React.SetStateAction<any>>;
  isAddButton?: boolean;
  searchKeyword?: any;
  setSearchKeyword?: React.Dispatch<React.SetStateAction<any>>;
  setModalIndex?: React.Dispatch<React.SetStateAction<number>>;
  closeModal?: () => void;
}

export const FolderList: React.FC<FolderListProps> = ({ fetchData, archiveFolderData, setArchiveFolderData, isAddButton = false, searchKeyword, setSearchKeyword, setModalIndex, closeModal }) => {

  const { UpdateField } = useFirestoreUpdate('folders')

  const handleBookMark = (id: string, isBookmark: boolean) => {
    UpdateField(id,
      {
        bookmark: !isBookmark
      });
    fetchData && fetchData();
  }

  const handleFolder = (foldName) => {
    setSearchKeyword && setSearchKeyword((Prev) => {
      if (Array.isArray(Prev)) {
        if (!Prev.includes(foldName)) {
          return [...Prev, foldName];
        } else if (Prev.includes(foldName)) {
          return Prev.filter(item => item !== foldName);
        }
      } else if (Prev !== foldName) {
        return [foldName];
      }
      return Prev;
    });
  }

  return (
    <Container>
      {archiveFolderData.length > 0 && archiveFolderData?.map((item, index) => (
        <FolderContainer
          key={index}
          onClick={() => handleFolder(item.data.folderName)}
          searchKeyword={searchKeyword?.includes(item.data.folderName)}
        >
          <FolderCover>
            {item.data.folderImages.map((i, index) => (
              <img key={index} src={i} alt="" />
            ))}
          </FolderCover>
          <FolderContent>
            <p className="folder-name">{item.data.folderName}</p>
            <span className="folder-totalpost">{`게시물 ${item.data.uidContainers.length}개`}</span>
          </FolderContent>
          <BookmarkBtnPosition onClick={(event) => {
            event.stopPropagation();
            handleBookMark(item.id, item.data.bookmark)
          }}>
            <IconBookmark
              fill={item.data.bookmark ? 'rgba(0, 0, 0, 0)' : '#FFDF44'}
              stroke={item.data.bookmark ? '#C4C4C4' : '#FFDF44'}
            />
          </BookmarkBtnPosition>
        </FolderContainer>
      ))}

      {isAddButton &&
        <AddFolderBtn onClick={() => {
          closeModal && closeModal();
          setTimeout(() => {
            setModalIndex && setModalIndex(5)
          }, 400)
        }}>
        </AddFolderBtn>
      }

    </Container>
  );
};

const Container = styled.div`
  max-height: calc(100% - 170px);
  padding: 16px 13px 20px;
  /* margin-right: -5px; */
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  overflow-y: scroll;
  margin: 0 auto;
  
  &::-webkit-scrollbar {
    width: 0;
  }
/* 
  &::-webkit-scrollbar-corner {
    display: none;
  }
  &::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 50px;
    background: var(--main-color);
  }
  @media (max-width: 768px) {
    width: 100%;
    &::-webkit-scrollbar {
      width: 0;
    }
  } */
`;

const FolderContainer = styled.a<{ searchKeyword: any }>`
  position: relative;
  height: auto;
  padding: 10px;
  border-radius: 20px;
  outline: ${(props) => props.searchKeyword ? "2px solid var(--main-color)" : ""};
`;

const FolderCover = styled.div`
  border-radius: 20px;
  overflow: hidden;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  aspect-ratio: 1 / 1;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const AddFolderBtn = styled.div`
  position: relative;
  margin: 10px;
  height: calc(100% - 66px);
  border-radius: 20px;
  background-color: var(--gray200-color);
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    position: absolute;
    content: "";
    background-color: #FFF;
    width: 5px;
    height: 100px;
    border-radius: 30px;
  }
  &::after {
    content: "";
    background-color: #FFF;
    width: 100px;
    height: 5px;
    border-radius: 30px;
  }
`;

const FolderContent = styled.div`
  padding: 10px 0 0;

  .folder-name {
    font-size: 14px;
  }
  .folder-totalpost {
    font-size: 12px;
    color: var(--gray300-color);
  }
`;

const BookmarkBtnPosition = styled.div`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.6);
`;