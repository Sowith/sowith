import { useState } from 'react';
import { styled } from 'styled-components';
import { SearchFolderItem } from './SearchFolderItem';

interface FolderData {
  folderId: number;
  src: string[];
  name: string;
  totalpost: number;
  like: boolean;
  tags: string[];
}

export const SearchFolderList: React.FC = () => {
  const folderData: FolderData[] = [
    {
      folderId: 1,
      name: '빠니보틀의 로드맵',
      totalpost: 10,
      like: true,
      src: [
        'https://picsum.photos/200/191',
        'https://picsum.photos/200/192',
        'https://picsum.photos/200/193',
        'https://picsum.photos/200/194',
      ],
      tags: [
        '여행',
        '국내여행',
        '제주도',
        '브이로그',
        '어쩌구 저쩌구 짱 긴 태그',
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
      tags: ['여행', '유럽여행', '피렌체', '인생사진'],
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
      tags: ['여행', '미국여행', 'LA', 'NBA 직관'],
    },
  ];

  const [archiveFolderData, setArchiveFolderData] =
    useState<FolderData[]>(folderData);

  const handleLikeToggle = (folderId: number) => {
    const updatedFolderData = [...archiveFolderData];

    const folderIndex = updatedFolderData.findIndex(
      (folder) => folder.folderId === folderId
    );

    if (folderIndex !== -1) {
      updatedFolderData[folderIndex].like =
        !updatedFolderData[folderIndex].like;
    }

    setArchiveFolderData(updatedFolderData);
  };

  return (
    <Container>
      {archiveFolderData.map((folderItem) => (
        <SearchFolderItem
          key={folderItem.folderId}
          data={folderItem}
          onLikeToggle={handleLikeToggle}
          src={folderItem.src[0]}
        />
      ))}
    </Container>
  );
};

const Container = styled.section`
  width: 88%;
  padding: 0 auto;
  gap: 2px;
  box-sizing: border-box;
  margin: 0 auto;
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
`;
