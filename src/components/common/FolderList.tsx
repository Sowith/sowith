import { useState } from "react";
import { styled } from 'styled-components';

import { ReactComponent as IconBookmark } from '../../assets/icon/icon-bookmark.svg';
import { ReactComponent as IconFolderPlus } from '../../assets/icon/icon-folder-plus.svg';

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
}

export const FolderList: React.FC<FolderListProps> = ({ archiveFolderData, setArchiveFolderData }) => {

  const handleBookMark = (id: number) => {
    const updatedImageData = archiveFolderData.map((item) => {
      if (item.folderId === id) {
        return { ...item, bookmark: !item.bookmark };
      }
      return item;
    });
    setArchiveFolderData(updatedImageData);
  };

  return (
    <Container>
      {archiveFolderData?.map((items, index) => (
        <FolderContainer key={index}>
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
              stroke={items.bookmark ? '#FFDF44' : 'none'}
            />
          </BookmarkBtnPosition>
        </FolderContainer>
      ))}
      <AddFolder>
        <IconFolderPlus />
      </AddFolder>
    </Container>
  );
};

const Container = styled.div`
  width: 90%;
  max-height: calc(100% - 170px);
  padding: 16px 13px 0;
  margin-right: -5px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  overflow-y: scroll;

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

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const AddFolder = styled.div`
  margin: 10px;
  height: calc(100% - 66px);
  border-radius: 20px;
  background-color: var(--gray200-color);
  display: flex;
  align-items: center;
  justify-content: center;
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