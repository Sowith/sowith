import { useState } from "react";
import { styled } from 'styled-components';

import { ReactComponent as IconBookmark } from '../../assets/icon/icon-bookmark-post-only.svg';

interface FolderDataItem {
  folderId: number;
  src: string[];
  name: string;
  totalpost: number;
  bookmark: boolean;
}

interface FolderListProps {
  archiveFolderData: FolderDataItem[];
  setArchiveFolderData: React.Dispatch<React.SetStateAction<FolderDataItem[]>>;
  isAddButton?: boolean;
  setSearchKeyword?: React.Dispatch<React.SetStateAction<string[] | string>>;
  setModalIndex?: React.Dispatch<React.SetStateAction<number>>;
}

export const FolderList: React.FC<FolderListProps> = ({ archiveFolderData, setArchiveFolderData, isAddButton = false, setSearchKeyword, setModalIndex }) => {

  const handleBookMark = (id: number) => {
    const updatedImageData = archiveFolderData.map((item) => {
      if (item.folderId === id) {
        return { ...item, bookmark: !item.bookmark };
      }
      return item;
    });
    setArchiveFolderData(updatedImageData);
  };

  const handleFolder = (foldName) => {
    setSearchKeyword && setSearchKeyword((Prev) => {
      if (Array.isArray(Prev)) {
        if (!Prev.includes(foldName)) { // Prev에 foldName이 없을 때만 추가
          return [...Prev, foldName];
        }
      } else if (Prev !== foldName) { // Prev가 문자열이면서 foldName과 다를 때만 배열로 변환
        return [Prev, foldName];
      }
      return Prev; // 중복된 값이 이미 있을 경우 변경 없음
    });
  }
  

  return (
    <Container>
      {archiveFolderData?.map((items, index) => (
        <FolderContainer key={index} onClick={() => handleFolder(items.name)}>
          <FolderCover>
            {items.src.map((item, itemIndex) => (
              <img key={itemIndex} src={item} alt="" />
            ))}
          </FolderCover>
          <FolderContent>
            <p className="folder-name">{items.name}</p>
            <span className="folder-totalpost">{`게시물 ${items.totalpost}개`}</span>
          </FolderContent>
          <BookmarkBtnPosition onClick={() => handleBookMark(items.folderId)}>
            <IconBookmark
              fill={items.bookmark ? '#FFDF44' : '#C4C4C4'}
              stroke={items.bookmark ? '#FFDF44' : 'rgba(0, 0, 0, 0)'}
            />
          </BookmarkBtnPosition>
        </FolderContainer>
      ))}

      {isAddButton &&
        <AddFolderBtn onClick={()=> setModalIndex && setModalIndex(5)}>
        </AddFolderBtn>
      }
        
    </Container>
  );
};

const Container = styled.div`
  max-height: calc(100% - 170px);
  padding: 16px 13px 20px;
  margin-right: -5px;
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

const FolderContainer = styled.a`
  position: relative;
  height: auto;
  padding: 10px;
  border-radius: 20px;

  &:hover {
    outline: 2px solid var(--main-color);
  }
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