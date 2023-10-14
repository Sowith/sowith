import { FC, useState } from 'react';
import styled from 'styled-components';
import { BackButton } from 'components/common/BackButton';
import { SearchFolderItem } from 'components/search/SearchFolderItem';

interface FolderData {
  folderId: number;
  src: string[];
  name: string;
  totalLike: number;
  like: boolean;
  bookmark: boolean;
  tags: string[];
}

export const SearchTrendingFolder: FC = () => {
  const folderData: FolderData[] = [
    {
      folderId: 1,
      name: '빠니보틀의 로드맵',
      totalLike: 10,
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
        '테스트 태그1',
        '테스트 태그1',
        '테스트 태그1',
        '테스트 태그1',
        '테스트 태그1',
      ],
      like: true,
      bookmark: false,
    },
    {
      folderId: 2,
      name: '용리단길 맛집모음',
      totalLike: 78,
      src: [
        'https://picsum.photos/200/195',
        'https://picsum.photos/200/196',
        'https://picsum.photos/200/197',
        'https://picsum.photos/200/198',
      ],
      tags: ['여행', '유럽여행', '피렌체', '인생사진'],
      like: true,
      bookmark: false,
    },
    {
      folderId: 3,
      name: '내 2023년 여름',
      totalLike: 10,
      src: [
        'https://picsum.photos/200/199',
        'https://picsum.photos/200/200',
        'https://picsum.photos/200/201',
        'https://picsum.photos/200/202',
      ],
      tags: ['여행', '미국여행', 'LA', 'NBA 직관'],
      like: false,
      bookmark: true,
    },
    {
      folderId: 4,
      name: '농덕의 NBA 직관',
      totalLike: 10,
      src: [
        'https://picsum.photos/200/199',
        'https://picsum.photos/200/200',
        'https://picsum.photos/200/201',
        'https://picsum.photos/200/202',
      ],
      tags: ['여행', '미국여행', 'LA', 'NBA 직관'],
      like: false,
      bookmark: true,
    },
    {
      folderId: 5,
      name: '축덕의 EPL 직관',
      totalLike: 10,
      src: [
        'https://picsum.photos/200/300',
        'https://picsum.photos/200/301',
        'https://picsum.photos/200/301',
        'https://picsum.photos/200/202',
      ],
      tags: ['여행', '영국여행', '런던', 'EPL 직관'],
      like: false,
      bookmark: true,
    },
    {
      folderId: 6,
      name: '팝덕의 콘서트 직관',
      totalLike: 10,
      src: [
        'https://picsum.photos/200/199',
        'https://picsum.photos/200/200',
        'https://picsum.photos/200/201',
        'https://picsum.photos/200/202',
      ],
      tags: ['테일러 스위프트', '콘서트 직관', 'LA', '라이브 맛집'],
      like: false,
      bookmark: true,
    },
    {
      folderId: 7,
      name: '내 2023년 여름',
      totalLike: 10,
      src: [
        'https://picsum.photos/200/199',
        'https://picsum.photos/200/200',
        'https://picsum.photos/200/201',
        'https://picsum.photos/200/202',
      ],
      tags: ['여행', '미국여행', 'LA', 'NBA 직관'],
      like: false,
      bookmark: true,
    },
    {
      folderId: 8,
      name: '내 2023년 여름',
      totalLike: 10,
      src: [
        'https://picsum.photos/200/199',
        'https://picsum.photos/200/200',
        'https://picsum.photos/200/201',
        'https://picsum.photos/200/202',
      ],
      tags: ['여행', '미국여행', 'LA', 'NBA 직관'],
      like: false,
      bookmark: true,
    },
    {
      folderId: 9,
      name: '내 2023년 여름',
      totalLike: 10,
      src: [
        'https://picsum.photos/200/199',
        'https://picsum.photos/200/200',
        'https://picsum.photos/200/201',
        'https://picsum.photos/200/202',
      ],
      tags: ['여행', '미국여행', 'LA', 'NBA 직관'],
      like: false,
      bookmark: true,
    },
    {
      folderId: 10,
      name: '내 2023년 여름',
      totalLike: 10,
      src: [
        'https://picsum.photos/200/199',
        'https://picsum.photos/200/200',
        'https://picsum.photos/200/201',
        'https://picsum.photos/200/202',
      ],
      tags: ['여행', '미국여행', 'LA', 'NBA 직관'],
      like: false,
      bookmark: true,
    },
    {
      folderId: 11,
      name: '내 2023년 여름',
      totalLike: 10,
      src: [
        'https://picsum.photos/200/199',
        'https://picsum.photos/200/200',
        'https://picsum.photos/200/201',
        'https://picsum.photos/200/202',
      ],
      tags: ['여행', '미국여행', 'LA', 'NBA 직관'],
      like: false,
      bookmark: true,
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
      const folder = updatedFolderData[folderIndex];
      folder.like = !folder.like;
      if (folder.like) {
        folder.totalLike += 1;
      } else {
        folder.totalLike -= 1;
      }
    }
    setArchiveFolderData(updatedFolderData);
  };

  const handleBookmarkToggle = (folderId: number) => {
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
            src={folderItem.src[0]}
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
