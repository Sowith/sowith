import { useState } from 'react';
import { styled } from 'styled-components';
import { FolderItem } from './FolderItem';

type RenderLocation = 'searchMain' | 'folderList' | 'other';

interface FolderListProps {
  items: RenderLocation[];
}

export const FolderList: React.FC<FolderListProps> = ({ items }) => {
  return (
    <Container>
      {items.map((item, index) => (
        <FolderItem key={index} renderLocation={item} />
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
