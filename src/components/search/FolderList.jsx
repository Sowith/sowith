import { useState } from 'react';
import { styled } from 'styled-components';
import { FolderItem } from './FolderItem';

export const FolderList = () => {
  // 저장할 상태들
  let renderLocation = 'folderList';

  // 로직 구현

  // 컴포넌트
  return (
    <Container>
      <FolderItem renderLocation={renderLocation} />
      <FolderItem renderLocation={renderLocation} />
      <FolderItem renderLocation={renderLocation} />
      <FolderItem renderLocation={renderLocation} />
      <FolderItem renderLocation={renderLocation} />
      <FolderItem renderLocation={renderLocation} />
      <FolderItem renderLocation={renderLocation} />
      <FolderItem renderLocation={renderLocation} />
      <FolderItem renderLocation={renderLocation} />
      <FolderItem renderLocation={renderLocation} />
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
  width: 90%;
  margin: 0 auto;
  border-radius: 10px;
  overflow: hidden;
`;
