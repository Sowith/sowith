import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { SearchTrendingFolderItem } from './SearchTrendingFolderItem';
import { FolderDataItem } from './SearchTrendingFolderItem';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { appFireStore } from '../../firebase/config.js';

export const SearchTrendingFolderList: React.FC = () => {
  // 좋아요 순으로 orderby해서 가져올 것

  const [archiveFolderData, setArchiveFolderData] = useState<FolderDataItem[]>(
    []
  );

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const folderData: FolderDataItem[] = [];
        const q = query(collection(appFireStore, 'folders'));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          const data = doc.data() as FolderDataItem;
          console.log(data);
          const folder = {
            folderId: doc.id,
            name: data.name,
            likeCount: data.likeCount,
            folderImages: data.folderImages,
            tags: data.tags,
            like: data.like,
            bookmark: data.bookmark,
          };
          folderData.push(folder);
        });

        console.log(folderData);

        setArchiveFolderData(folderData);
      } catch (error) {
        console.error('Firestore에서 폴더를 가져오는 중 오류 발생:', error);
      }
    };

    fetchFolders();
  }, []);

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
      {archiveFolderData.map((folderItem) => (
        <SearchTrendingFolderItem
          key={folderItem.folderId}
          data={folderItem}
          onLikeToggle={handleLikeToggle}
          onBookmarkToggle={handleBookmarkToggle}
          src={folderItem.folderImages[0]}
        />
      ))}
    </Container>
  );
};

const Container = styled.section`
  width: 88%;
  padding: 0;
  gap: 10px;
  box-sizing: border-box;
  margin: 0 auto;
  display: flex;
  overflow: auto;
`;
