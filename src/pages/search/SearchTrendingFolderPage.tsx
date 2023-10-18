import { FC, useState } from 'react';
import styled from 'styled-components';
import { BackButton } from 'components/common/BackButton';
import { SearchFolderItem } from 'components/search/SearchFolderItem';
import { FolderDataItem } from 'components/search/SearchFolderItem';

export const SearchTrendingFolder: FC = () => {
  const [archiveFolderData, setArchiveFolderData] = useState<FolderDataItem[]>(
    []
  );

  const handleLikeToggle = (folderId: string) => {
    const updatedFolderData = [...archiveFolderData];
    const folderIndex = updatedFolderData.findIndex(
      (folder) => folder.folderId === folderId
    );

    if (folderIndex !== -1) {
      const folder = updatedFolderData[folderIndex];
      folder.like = !folder.like;
      if (folder.like) {
        folder.likeCount += 1;
      } else {
        folder.likeCount -= 1;
      }
    }
    setArchiveFolderData(updatedFolderData);
  };

  const handleBookmarkToggle = (folderId: string) => {
    const updatedFolderData = [...archiveFolderData];
    const folderIndex = updatedFolderData.findIndex(
      (folder) => folder.folderId === folderId
    );

    if (folderIndex !== -1) {
      updatedFolderData[folderIndex].bookmark =
        !updatedFolderData[folderIndex].bookmark;
    }
    setArchiveFolderData(updatedFolderData);
  };

  return (
    <Container>
      <h1 className="a11y-hidden">인기 폴더 페이지</h1>
      <TopNav>
        <BackButton />
        <p>인기 폴더</p>
      </TopNav>
      <TrendingFolder>
        {archiveFolderData.map((folderItem) => (
          <SearchFolderItem
            key={folderItem.folderId}
            data={folderItem}
            onLikeToggle={handleLikeToggle}
            onBookmarkToggle={handleBookmarkToggle}
            folderImages={folderItem.folderImages[0]}
          />
        ))}
      </TrendingFolder>
    </Container>
  );
};

const Container = styled.div`
  width: 88%;
  background-color: #ffffff;
  margin: 0 auto;
  padding-bottom: 10px;

  section {
    padding-top: 18px;
  }
`;

const TopNav = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 40px;
  p {
    font-size: 1.5rem;
    font-family: var(--font--SemiBold);
  }
`;

const TrendingFolder = styled.section`
  width: 100%;
  padding: 0;
  gap: 5px;
  box-sizing: border-box;
  margin: 0 auto;
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
