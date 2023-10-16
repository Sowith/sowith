import { FC } from 'react';
import { styled } from 'styled-components';

import heartUnfilled from '../../assets/icon/icon-heart_unfilled.svg';
import heartFilled from '../../assets/icon/icon-heart_filled.svg';
import { ReactComponent as IconBookmark } from '../../assets/icon/icon-bookmark.svg';

interface FolderDataItem {
  folderId: number;
  src: string[];
  name: string;
  totalLike: number;
  like: boolean;
  bookmark: boolean;
  tags: string[];
}

interface FolderItemProps {
  data: FolderDataItem;
  onLikeToggle: (folderId: number) => void;
  onBookmarkToggle: (folderId: number) => void;
  src: string;
}

export const SearchFolderItem: FC<FolderItemProps> = ({
  data,
  onLikeToggle,
  onBookmarkToggle,
}) => {
  const maxTagCount = 3;

  const handleLikeClick = () => {
    onLikeToggle(data.folderId);
  };

  const handleBookmarkClick = () => {
    onBookmarkToggle(data.folderId);
  };

  return (
    <Container style={{ backgroundImage: `url(${data.src[0]})` }}>
      <BlackOverlay />
      <FolderDescription>
        <p>{data.name}</p>
        <FolderTagList>
          {data.tags.slice(0, maxTagCount).map((tag, index) => (
            <FolderTagItem key={index}>
              <HashTag># </HashTag>
              {tag}
            </FolderTagItem>
          ))}

          {data.tags.length > maxTagCount && (
            <NumberHiddenFolderTagItem>
              +{data.tags.length - maxTagCount}
            </NumberHiddenFolderTagItem>
          )}
        </FolderTagList>
      </FolderDescription>
      <FolderInfo>
        <FolderLike>
          {data.like ? (
            <img
              src={heartFilled}
              alt="Heart Filled"
              onClick={handleLikeClick}
            />
          ) : (
            <img
              src={heartUnfilled}
              alt="Heart Unfilled"
              onClick={handleLikeClick}
            />
          )}
          <span>{data.totalLike}</span>
        </FolderLike>
        <IconBookmark
          fill={data.bookmark ? '#FFDF44' : '#C4C4C4'}
          stroke={data.bookmark ? '#FFDF44' : 'none'}
          onClick={handleBookmarkClick}
        />
      </FolderInfo>
    </Container>
  );
};

const Container = styled.div`
  cursor: pointer;
  position: relative;
  width: calc((100% / 2) - 4px);
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  justify-content: space-between;
  aspect-ratio: 1 / 1;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 10px;
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

const NumberHiddenFolderTagItem = styled.p`
  border-radius: 5px;
  font-family: var(--font--Regular);
  font-size: 1rem;
  background-color: var(--main-color);
  color: #ffffff;
  padding: 0px 7px;
  text-align: start;
  margin: 0;

  @media (max-width: 576px) {
    font-size: 0.8rem;
  }
`;

const FolderInfo = styled.div`
  padding: 5px 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
