import { styled } from 'styled-components';

import multiplePhotosIcon from '../../assets/icon/icon-multiple_photos.svg';
import testImg from '../../assets/testImg/testimg-post.svg';

export const PostItem = ({ isMultiplePhotos }) => {
  // 해당 태그가 달린 게시물의 개수에 따라서 대략적인 개수를 정해주는 로직 추가 필요
  const handlePostClick = () => {
    console.log('게시물이 클릭되었습니다!');
  };

  return (
    <Container onClick={handlePostClick}>
      <img src={testImg} alt="post list item" className="post-item" />
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
