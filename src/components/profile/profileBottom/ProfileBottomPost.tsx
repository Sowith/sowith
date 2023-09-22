import { styled } from "styled-components";

import testImg from "../../../assets/testImg/testimg-post.svg"

export const ProfileBottomPost = () => {
  return(
    <ProfileBottomPostWrap>
    <PostItemList>
      <PostItem>
        <img src={testImg}></img>
      </PostItem>
      <PostItem>
        <img src={testImg}></img>
      </PostItem>
      <PostItem>
        <img src={testImg}></img>
      </PostItem>
      <PostItem>
        <img src={testImg}></img>
      </PostItem>
      <PostItem>
        <img src={testImg}></img>
      </PostItem>
      <PostItem>
        <img src={testImg}></img>
      </PostItem>
      <PostItem>
        <img src={testImg}></img>
      </PostItem>
      <PostItem>
        <img src={testImg}></img>
      </PostItem>
      <PostItem>
        <img src={testImg}></img>
      </PostItem>
      <PostItem>
        <img src={testImg}></img>
      </PostItem>
    </PostItemList>
    </ProfileBottomPostWrap>
  )
}

const ProfileBottomPostWrap = styled.section`
  margin-top: 4%;
  `
const PostItemList = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  margin-left: -3px;
  `
const PostItem = styled.li`
  width: calc(100% / 3);
  
  & img {
    width: 100%;
    aspect-ratio: 1 / 1;
    
  }
`

