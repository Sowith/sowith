import React, { useState } from 'react'; // React를 추가
import { styled } from 'styled-components';
import { PostItem } from './PostItem';

const samplePosts = [
  {
    title: '게시글1',
    imageUrl: ['path/to/image1_1.jpg', 'path/to/image1_2.jpg'],
  },
  {
    title: '게시글2',
    imageUrl: ['path/to/image2_1.jpg'],
  },
  {
    title: '게시글3',
    imageUrl: [
      'path/to/image3_1.jpg',
      'path/to/image3_2.jpg',
      'path/to/image3_3.jpg',
    ],
  },
];

export const PostList: React.FC = () => {
  // 저장할 상태들

  // 로직 구현

  // 컴포넌트
  return (
    <Container>
      {samplePosts.map((post, index) => (
        <PostItem
          key={index}
          isMultiplePhotos={post.imageUrl.length > 1}
          imageUrl={post.imageUrl[0]}
        />
      ))}
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
