import { useState } from 'react';
import { styled } from 'styled-components';

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

export const FolderItem: React.FC<FolderItemProps> = ({ data }) => {
  const [liked, setLiked] = useState(data.like);

  return (
    <Container>
      {/* <BlackOverlay />
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
      </FolderContainer> */}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  justify-content: space-between;
  width: 120px;
  height: 120px;
  padding: 9px 7px;
  box-sizing: border-box;
  border-radius: 5px;

  > * {
    z-index: 1;
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

const FolderInfo = styled.div`
  display: flex;
  justify-content: space-between;
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
