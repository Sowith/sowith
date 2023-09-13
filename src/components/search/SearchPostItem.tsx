import React from 'react';
import { styled } from 'styled-components';

import multiplePhotosIcon from '../../assets/icon/icon-multiple_photos.svg';

interface PostItemProps {
  isMultiplePhotos?: boolean;
  imageUrl: string; // 이미지 URL을 받을 prop
}

export const PostItem: React.FC<PostItemProps> = ({
  isMultiplePhotos = false,
  imageUrl, // imageUrl prop을 구조 분해 할당으로 가져옵니다.
}) => {
  const handlePostClick = () => {
    console.log('게시물이 클릭되었습니다!');
  };

  return (
    <Container onClick={handlePostClick}>
      <img src={imageUrl} alt="post list item" className="post-item" />
      {isMultiplePhotos && (
        <img
          src={multiplePhotosIcon}
          alt="multiple photos icon"
          className="icon-multiple_photos"
        />
      )}
    </Container>
  );
};
const Container = styled.div`
  width: 100px;
  height: 100px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  object-fit: cover;
  border-radius: 5px;

  img.post-item {
    border-radius: 5px;
  }

  img.icon-multiple_photos {
    position: absolute;
    margin: 0;
    bottom: 5px;
    right: 5px;
    width: 20px;
    height: 20px;
  }
`;
