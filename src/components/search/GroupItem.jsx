import { styled } from 'styled-components';

import testImg from '../../assets/testImg/testimg-group.png';
import groupIcon from '../../assets/icon/icon-users_group-white.svg';

export const GroupItem = () => {
  return (
    <Container>
      <GroupInfo>
        <h3>[10대] 너 왜 눈을 세모나게 떠?</h3>
        <GroupIntroduction>
          저 맘에 안 들죠? 하후하Square eyes저 맘에 안 들죠? 하...
        </GroupIntroduction>
        <GroupTagContainer>
          <GroupTag>우정</GroupTag>
          <GroupTag>패션</GroupTag>
          <GroupTag>수험생활</GroupTag>
        </GroupTagContainer>
      </GroupInfo>
      <GroupImageContainer>
        <GroupFollower>5.6k</GroupFollower>
        <GroupImg src={testImg} />
      </GroupImageContainer>
    </Container>
  );
};

const Container = styled.div`
  background-color: #ffffff;
  display: flex;
  margin-bottom: 5px;
`;

const GroupInfo = styled.div`
  flex-grow: 1;

  > h3 {
    margin: 0;
    font-family: var(--font--Medium);
    font-size: 14px;
  }
`;

const GroupIntroduction = styled.p`
  font-size: 8px;
  margin: 3px 0 6px 0;
  color: #555555;
`;

const GroupTagContainer = styled.div`
  display: flex;
  gap: 6px;
`;

const GroupTag = styled.p`
  background-color: var(--gray100-color);
  font-size: 10px;
  color: #666666;
  border-radius: 2px;
  padding: 2px 7px;
  text-align: center;
  margin: 0;
`;

const GroupImageContainer = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 5px;
  position: relative;
`;

const GroupFollower = styled.p`
  position: absolute;
  margin: 0;
  bottom: 3px;
  right: 3px;
  font-size: 6px;
  background-color: rgba(38, 38, 38, 0.4);
  color: #ffffff;
  background-image: url(${groupIcon});
  background-repeat: no-repeat;
  background-position: 1px center;
  padding: 2px 3px 2px 12px;
  border-radius: 2px;
`;

const GroupImg = styled.img`
  background-color: yellow;
`;
