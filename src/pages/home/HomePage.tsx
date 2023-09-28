import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import searchIcon from '../../assets/icon/icon-search.svg';
import currentLocation from '../../assets/icon/icon-current_location.svg';
import postView from '../../assets/icon/icon-post_view.svg';
import bottomPostSectionBar from '../../assets/icon/icon-bottom_post_section_bar.svg';

export const Home: FC = () => {
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate('/searchmain');
  };

  return (
    <Container>
      <h1 className="a11y-hidden">홈 화면</h1>
      <Search type="button" onClick={handleSearchClick}>
        <span>요즘 핫한 탕후루 맛집은?</span>
        <img src={searchIcon} alt="link to search page" />
      </Search>
      <HomeController>
        <CurrentLocationButton>
          <img src={currentLocation} alt="find current location" />
        </CurrentLocationButton>
        <PostViewButton>
          <img src={postView} alt="change to post view" />
        </PostViewButton>
      </HomeController>
      <BottomPostSection>
        <PostCardItem></PostCardItem>
        <PostCardItem></PostCardItem>
      </BottomPostSection>
      <BottomNavBar>하단 네브바 자리</BottomNavBar>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto;
  padding: 0 24px;
  box-sizing: border-box;
`;

const Search = styled.button`
  background-color: #ffffff;
  color: var(--gray200-color);
  cursor: pointer;
  width: 100%;
  height: 42px;
  padding: 0 15px;
  margin-top: 15px;
  box-sizing: border-box;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 0px 10px #00000040;

  span {
    display: inline-block;
  }
`;

const HomeController = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 15px;
  position: fixed;
  bottom: 100px;
  right: 24px;
  z-index: 1;
`;

const CurrentLocationButton = styled.button`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  box-shadow: 0px 0px 10px #00000040;
  background-color: #ffffff;
`;

const PostViewButton = styled.button`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  box-shadow: 0px 0px 10px #00000040;
  background-color: #ffffff;
`;

const BottomPostSection = styled.section`
  width: 100%;
  height: 90px;
  position: fixed;
  bottom: 0px;
  left: 0px;
  text-align: center;
  border-radius: 5px 5px 0 0;
  display: flex;
  gap: 10px;
  background: url(${bottomPostSectionBar}) no-repeat center 10%;
  background-color: #f3f3f3;
`;

const PostCardItem = styled.div``;

const BottomNavBar = styled.div`
  width: 100%;
  height: 49px;
  position: fixed;
  bottom: 0px;
  left: 0px;
  text-align: center;
  background-color: teal;
  border-radius: 5px 5px 0 0;
`;
