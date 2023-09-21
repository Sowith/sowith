import { useState, FC } from 'react';
import { styled } from 'styled-components';

import testImgFolder from '../../assets/testImg/testimg-folder.png';
import testImgCreator from '../../assets/testImg/testimg-folder_creator.png';
import heartFilled from '../../assets/icon/icon-heart_filled.svg';
import heartUnfilled from '../../assets/icon/icon-heart_unfilled.svg';

interface FolderDataItem {
  folderId: number;
  src: string[];
  name: string;
  totalpost: number;
  like: boolean;
}

interface FolderItemProps {
  data: FolderDataItem;
}

const folderData: FolderDataItem[] = [
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

export const SearchFolderItem: FC<FolderItemProps> = ({ data }) => {
  return (
    <Container>
      <BlackOverlay />
      <p>{data.name}</p> 빠니보틀의 로드맵 하이하이
      {/* data.name을 사용하여 이름을 동적으로 표시 */}
      <FolderTagList>
        {/* 여기에 태그 리스트를 렌더링 */}
        <FolderTagItem>여행</FolderTagItem>
        <FolderTagItem>유럽여행</FolderTagItem>
        <FolderTagItem>제주도</FolderTagItem>
        <FolderTagItem>브이로그</FolderTagItem>
      </FolderTagList>
      <FolderInfo>
        <FolderCreator>
          <img src={testImgCreator} alt="" />
          <span>nkella</span>
        </FolderCreator>
        <FolderLike>
          <img src={data.like ? heartFilled : heartUnfilled} alt="" />{' '}
          {/* like 상태에 따라 아이콘 변경 */}
          <span>{data.totalpost}M</span>{' '}
          {/* data.totalpost를 사용하여 게시물 수 표시 */}
        </FolderLike>
      </FolderInfo>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  justify-content: space-between;
  width: 144px;
  height: 144px;
  padding: 9px 7px;
  box-sizing: border-box;
  border-radius: 5px;
  > * {
    z-index: 1;
  }
  &::before {
    content: '';
    background-image: url(${testImgFolder});
    border-radius: 5px;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
  > p {
    font-family: var(--font--semibold);
    color: #ffffff;
    font-size: 12px;
    margin: 0;
    overflow-wrap: break-word;
  }
`;

const BlackOverlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #000000;
  border-radius: 5px;
  opacity: 0.7;
`;

const FolderTagList = styled.div`
  display: flex;
  gap: 2px;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const FolderTagItem = styled.p`
  border-radius: 3px;
  font-family: var(--font--Regular);
  background: #000000;
  font-size: 5.5px;
  color: #ffffff;
  padding: 2px 6px;
  text-align: center;
  margin: 0;
`;

const FolderInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FolderCreator = styled.div`
  display: flex;
  gap: 4px;
  img {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
  span {
    font-size: 8px;
    font-family: var(--font--Regular);
    color: #ffffff;
  }
`;

const FolderLike = styled.div`
  display: flex;
  gap: 4px;
  img {
    width: 10px;
    height: 10px;
  }
  span {
    font-size: 8px;
    font-family: var(--font--Thin);
    color: #ffffff;
  }
`;
