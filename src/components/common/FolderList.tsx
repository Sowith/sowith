import { useState, useEffect } from "react";
import { styled } from 'styled-components';

import { useFirestoreUpdate } from "hooks/useFirestoreUpdate";
import { arrayUnion } from "firebase/firestore";
import { arrayRemove } from "firebase/firestore";

import { ReactComponent as IconBookmark } from '../../assets/icon/icon-bookmark-post-only.svg';
import logo from "../../assets/logo/logo-heart.svg"

interface FolderDataItem {
  folderId: number;
  src: string[];
  name: string;
  totalpost: number;
  bookmark: boolean;
}

interface FolderListProps {
  AllFolderData?: () => void;
  archiveFolderData: any;
  setArchiveFolderData: React.Dispatch<React.SetStateAction<any>>;
  isAddButton?: boolean;
  seletedFolder?: any;
  setSeletedFolder?: React.Dispatch<React.SetStateAction<any>>;
  searchKeyword?: any;
  setSearchKeyword?: React.Dispatch<React.SetStateAction<any>>;
  setModalIndex?: React.Dispatch<React.SetStateAction<number>>;
  closeModal?: () => void;
}


export const FolderList: React.FC<FolderListProps> = ({ AllFolderData, archiveFolderData, setArchiveFolderData, isAddButton = false, seletedFolder, setSeletedFolder, setModalIndex, closeModal }) => {

  const token = sessionStorage.getItem('token');
  const uid = token !== null ? JSON.parse(token).uid : null;

  const { UpdateField } = useFirestoreUpdate('folders')

  const handleBookMark = (id: string, data: any) => {
    UpdateField(id,
      {
        bookmarkedUsers: data.bookmarkedUsers.includes(uid) ? arrayRemove(uid) : arrayUnion(uid)
      });
    AllFolderData && AllFolderData();
  }

  const handleFolder = (foldItem) => {
    setSeletedFolder && setSeletedFolder((Prev) => {
      const isDuplicate = Prev.some(item => item.id === foldItem.id);

      if (!isDuplicate) {
        return [...Prev, foldItem];
      }
      return Prev.filter(item => item.id !== foldItem.id);
    })
  }

  return (
    <Container>
      {archiveFolderData.length > 0 && archiveFolderData.map((item, index) => {
        return (
          <FolderContainer
            key={index}
            onClick={() => handleFolder(item)}
            seletedFolder={seletedFolder.some(i => i.id === item.id)}
          >
            <FolderCover>
              {
                item.data.folderImages.concat(Array(4).fill(logo)).slice(0, 4).map((src, index) => (
                  <img key={index} src={src} alt="" />
                ))
              }
            </FolderCover>
            <FolderContent>
              <p className="folder-name">{item.data.folderName}</p>
              <span className="folder-totalpost">{`게시물 ${item.data.postUids.length}개`}</span>
            </FolderContent>
            <BookmarkBtnPosition onClick={(event) => {
              event.stopPropagation();
              handleBookMark(item.id, item.data)
            }}>
              <IconBookmark
                fill={item.data.bookmarkedUsers.includes(uid) ? '#FFDF44' : 'rgba(0, 0, 0, 0)'}
                stroke={item.data.bookmarkedUsers.includes(uid) ? '#FFDF44' : '#C4C4C4'}
              />
            </BookmarkBtnPosition>
          </FolderContainer>
        );
      })}

      {archiveFolderData.length > 0 && isAddButton &&
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
}

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

const FolderContainer = styled.a<{ seletedFolder: any }>`
  position: relative;
  height: auto;
  padding: 10px;
  border-radius: 20px;
  outline: ${(props) => props.seletedFolder ? "2px solid var(--main-color)" : ""};
`;

const FolderCover = styled.div`
  border-radius: 20px;
  overflow: hidden;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  min-width: calc(100vw / 2 - 43px);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    aspect-ratio: 1 / 1;
  }
`;

const AddFolderBtn = styled.div`
  position: relative;
  margin: 10px;
  /* height: calc(100% - 66px); */
  aspect-ratio: 1 / 1;
  border-radius: 20px;
  background-color: var(--gray200-color);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

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