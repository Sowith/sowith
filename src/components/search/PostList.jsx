import { useState } from 'react';
import { styled } from 'styled-components';
import { PostItem } from './PostItem';

export const PostList = () => {
  // 저장할 상태들
  // 불러온 게시글 중 사진이 1장보다 많은 게시글을 위한 상태
  let [isMultiplePhotos, setIsMultiplePhotos] = useState(true);

  // 로직 구현

  // 컴포넌트
  return (
    <Container>
      <PostItem isMultiplePhotos={isMultiplePhotos} />
      <PostItem isMultiplePhotos={isMultiplePhotos} />
      <PostItem isMultiplePhotos={isMultiplePhotos} />
      <PostItem isMultiplePhotos={isMultiplePhotos} />
      <PostItem isMultiplePhotos={isMultiplePhotos} />
      <PostItem isMultiplePhotos={isMultiplePhotos} />
    </Container>
  );
};

const Container = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 100px));
  justify-content: center;
  padding: 0 auto;
  gap: 5px;
  box-sizing: border-box;
  margin: 0 auto;
  border-radius: 10px;
  overflow: hidden;
`;
