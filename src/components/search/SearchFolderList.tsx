import { useState } from 'react';
import { styled } from 'styled-components';
import { SearchFolderItem } from './SearchFolderItem';

interface FolderData {
  folderId: number;
  src: string[];
  name: string;
  totalpost: number;
  like: boolean;
}

export const SearchFolderList: React.FC = () => {
  const folderData: FolderData[] = [
    {
      folderId: 1,
      name: '빠니보틀의 로드맵',
      totalpost: 10,
      like: false,
      src: [
        'https://picsum.photos/200/191',
        'https://picsum.photos/200/192',
        'https://picsum.photos/200/193',
        'https://picsum.photos/200/194',
      ],
    },
    {
      folderId: 2,
      name: '용리단길 맛집 모음',
      totalpost: 78,
      like: true,
      src: [
        'https://picsum.photos/200/195',
        'https://picsum.photos/200/196',
        'https://picsum.photos/200/197',
        'https://picsum.photos/200/198',
      ],
    },
    {
      folderId: 3,
      name: '내 2023년 여름',
      totalpost: 10,
      like: false,
      src: [
        'https://picsum.photos/200/199',
        'https://picsum.photos/200/200',
        'https://picsum.photos/200/201',
        'https://picsum.photos/200/202',
      ],
    },
  ];

  const [archiveFolderData, setArchiveFolderData] =
    useState<FolderData[]>(folderData);

  return (
    <Container>
      {archiveFolderData.map((folderItem) => (
        <SearchFolderItem key={folderItem.folderId} data={folderItem} />
      ))}
    </Container>
  );
};

const Container = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(144px, 144px));
  justify-content: center;
  padding: 0 auto;
  gap: 5px;
  box-sizing: border-box;
  margin: 0 auto;
  border-radius: 10px;
  overflow: hidden;
`;
