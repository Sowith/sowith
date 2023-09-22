import { useState, FC } from 'react';
import { styled } from 'styled-components';

import testImg from '../../assets/testImg/testimg-folder.png';
import heartFilled from '../../assets/icon/icon-heart_filled.svg';
import heartUnfilled from '../../assets/icon/icon-heart_unfilled.svg';

interface FolderDataItem {
  folderId: number;
  src: string[];
  name: string;
  totalpost: number;
  like: boolean;
  tags: string[];
}

interface FolderItemProps {
  data: FolderDataItem;
  onLikeToggle: (folderId: number) => void;
  src: string;
}

export const SearchFolderItem: FC<FolderItemProps> = ({
  data,
  onLikeToggle,
}) => {
  const handleLikeClick = () => {
    onLikeToggle(data.folderId);
  };

  return (
    <Container style={{ backgroundImage: `url(${data.src[0]})` }}>
      <BlackOverlay />
      <FolderDescription>
        <p>{data.name}</p>
        {/* data.name을 사용하여 이름을 동적으로 표시 */}
        <FolderTagList>
          {/* 여기에 태그 리스트를 렌더링 */}
          {data.tags.map((tag, index) => (
            <FolderTagItem key={index}>
              <HashTag># </HashTag>
              {tag}
            </FolderTagItem>
          ))}
        </FolderTagList>
      </FolderDescription>
      <FolderInfo>
        <FolderLike onClick={handleLikeClick}>
          <img src={data.like ? heartFilled : heartUnfilled} alt="like" />{' '}
          <span>{data.totalpost}M</span>{' '}
          {/* data.totalpost를 사용하여 게시물 수 표시 */}
        </FolderLike>
      </FolderInfo>
    </Container>
  );
};

const Container = styled.div`
  cursor: pointer;
  position: relative;
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  justify-content: space-between;
  width: calc((100% / 2) - 4px);
  aspect-ratio: 1 / 1;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 2% 2%;
  background-size: cover;

  > img {
    z-index: 0;
  }

  > * {
    z-index: 1;
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

const FolderDescription = styled.div`
  > p {
    font-family: var(--font--Bold);
    color: #ffffff;
    font-size: 2rem;
    margin-bottom: 5px;
    padding: 5px 7px;
    overflow-wrap: break-word;
    letter-spacing: 1px;
  }

  @media (max-width: 576px) {
    > p {
      font-size: 1rem;
    }
  }
`;

const FolderTagList = styled.div`
  display: flex;
  gap: 2px;
  flex-wrap: wrap;
  flex: 1;
  padding: 5px 5px;
`;

const HashTag = styled.span`
  color: var(--main-color);
`;

const FolderTagItem = styled.p`
  border-radius: 3px;
  font-family: var(--font--Regular);
  font-size: 1rem;
  color: #ffffff;
  padding: 0px 3px;
  text-align: start;
  margin: 0;

  @media (max-width: 576px) {
    font-size: 0.8rem;
  }
`;

const FolderInfo = styled.div`
  padding: 5px 5px;
`;

const FolderLike = styled.div`
  display: flex;
  gap: 4px;
  img {
    width: 30px;
    height: 30px;
  }

  span {
    align-self: center;
    font-size: 1rem;
    font-family: var(--font--Regular);
    color: #ffffff;
  }
`;
