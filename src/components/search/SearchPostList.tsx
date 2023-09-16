import React, { useState } from 'react'; // React를 추가
import { styled } from 'styled-components';
import { PostItem } from './SearchPostItem';

const samplePosts = [
  {
    title: '게시글1',
    imageUrl: [
      'https://picsum.photos/200/191',
      'https://picsum.photos/200/192',
    ],
  },
  {
    title: '게시글2',
    imageUrl: ['https://picsum.photos/200/193'],
  },
  {
    title: '게시글3',
    imageUrl: [
      'https://picsum.photos/200/194',
      'https://picsum.photos/200/195',
      'https://picsum.photos/200/196',
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
  padding: 0 auto;
  gap: 5px;
  box-sizing: border-box;
  margin: 20px auto;
  overflow: hidden;
  width: 100%;
`;
