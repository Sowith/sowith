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
    postContent: '오늘은 맛집에 놀러갔습니다 맛집 어쩌구.',
    postTag: ['맛집', '또간집', '내일갈집', '성동구핫플'],
  },
  {
    title: '게시글2',
    imageUrl: ['https://picsum.photos/200/193'],
    postContent: '오늘은 맛집에 놀러갔습니다 맛집 어쩌구.',
    postTag: ['맛집', '또간집', '내일갈집', '성동구핫플'],
  },
  {
    title: '게시글3',
    imageUrl: [
      'https://picsum.photos/200/194',
      'https://picsum.photos/200/195',
      'https://picsum.photos/200/196',
    ],
    postContent: '오늘은 맛집에 놀러갔습니다 맛집 어쩌구.',
    postTag: ['맛집', '또간집', '내일갈집', '성동구핫플'],
  },
  {
    title: '게시글4',
    imageUrl: [
      'https://picsum.photos/200/197',
      'https://picsum.photos/200/198',
      'https://picsum.photos/200/199',
    ],
    postContent: '오늘은 맛집에 놀러갔습니다 맛집 어쩌구.',
    postTag: ['맛집', '또간집', '내일갈집', '성동구핫플'],
  },
  {
    title: '게시글5',
    imageUrl: [
      'https://picsum.photos/200/200',
      'https://picsum.photos/200/180',
      'https://picsum.photos/200/181',
    ],
    postContent: '오늘은 맛집에 놀러갔습니다 맛집 어쩌구.',
    postTag: ['맛집', '또간집', '내일갈집', '성동구핫플'],
  },
  {
    title: '게시글6',
    imageUrl: [
      'https://picsum.photos/200/191',
      'https://picsum.photos/200/192',
      'https://picsum.photos/200/193',
    ],
  },
  {
    title: '게시글7',
    imageUrl: [
      'https://picsum.photos/200/190',
      'https://picsum.photos/200/190',
      'https://picsum.photos/200/190',
    ],
    postContent: '오늘은 맛집에 놀러갔습니다 맛집 어쩌구.',
    postTag: ['맛집', '또간집', '내일갈집', '성동구핫플'],
  },
];

interface SearchPostListProps {
  searchKeyword: string;
}

export const PostList: React.FC<SearchPostListProps> = ({ searchKeyword }) => {
  // 저장할 상태들

  // 로직 구현
  // firestore에서 게시글 데이터를 불러올 때 SearchBar의 placeholder에 입력된 문자열을 기반으로 filter된 게시글 데이터를 불러오도록 수정

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
  margin-top: 30px;
  margin-left: 1.5px;
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
`;
