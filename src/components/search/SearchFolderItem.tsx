import { styled } from 'styled-components';

import testImg from '../../assets/testImg/testimg-folder.png';
import testImgCreator from '../../assets/testImg/testimg-folder_creator.png';
import heartFilled from '../../assets/icon/icon-heart_filled.svg';
import heartUnfilled from '../../assets/icon/icon-heart_unfilled.svg';

type RenderLocation = 'searchMain' | 'folderList' | 'other';

interface FolderItemProps {
  renderLocation: RenderLocation;
}

export const FolderItem: React.FC<FolderItemProps> = ({ renderLocation }) => {
  return (
    <Container renderLocation={renderLocation}>
      <BlackOverlay />
      <p>빠니보틀의 로드맵 하이하이</p>
      <FolderTagList>
        <FolderTagItem>여행</FolderTagItem>
        <FolderTagItem>유럽여행</FolderTagItem>
        <FolderTagItem>제주도</FolderTagItem>
        <FolderTagItem>브이로그</FolderTagItem>
      </FolderTagList>
      <FolderInfo>
        <FolderCreator>
          <img src={testImgCreator} alt="" />
          <span>nkella</span>
        </FolderCreator>
        <FolderLike>
          <img src={heartFilled} alt="" />
          <span>1.8M</span>
        </FolderLike>
      </FolderInfo>
    </Container>
  );
};

const Container = styled.div<{ renderLocation: RenderLocation }>`
  position: relative;
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  justify-content: space-between;
  width: 100px;
  height: ${(props) =>
    props.renderLocation === 'searchMain'
      ? '120px'
      : props.renderLocation === 'folderList'
      ? '100px'
      : '120px'};
  padding: 9px 7px;
  box-sizing: border-box;
  border-radius: 5px;

  > * {
    z-index: 1;
  }

  &::before {
    content: '';
    background-image: url(${testImg});
    border-radius: 5px;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  > p {
    font-family: var(--font--semibold);
    color: #ffffff;
    font-size: 12px;
    margin: 0;
    overflow-wrap: break-word;
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

const FolderTagList = styled.div`
  display: flex;
  gap: 2px;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const FolderTagItem = styled.p`
  border-radius: 3px;
  font-family: var(--font--Regular);
  background: #000000;
  font-size: 5.5px;
  color: #ffffff;
  padding: 2px 6px;
  text-align: center;
  margin: 0;
`;

const FolderInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FolderCreator = styled.div`
  display: flex;
  gap: 4px;

  img {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }

  span {
    font-size: 8px;
    font-family: var(--font--Regular);
    color: #ffffff;
  }
`;

const FolderLike = styled.div`
  display: flex;
  gap: 4px;

  img {
    width: 10px;
    height: 10px;
  }

  span {
    font-size: 8px;
    font-family: var(--font--Thin);
    color: #ffffff;
  }
`;
