import { useState } from 'react';
import styled from 'styled-components';

import { MainUserItem } from '../../components/main/MainUserItem';
import { SelectedFilter } from "../../components/post/PostSelectedFilter"

import { ReactComponent as IconLike } from "../../assets/icon/icon-like-heart.svg"
import { ReactComponent as IconComment } from "../../assets/icon/icon-comment.svg"
import iconSwitchMap from "../../assets/icon/icon-switch-map.svg";

interface PostItem {
  profile: string,
  userId: string,
  location: string,
  heartCount: string,
  commentCount: string,
  dateInfo: string,
  content: string
  images: Array<{ src: string, filter: string }>
}

interface PostItemProps {
  item: PostItem
  index: number
} 

export const MainPostItem:React.FC<PostItemProps> = ({ item, index }) => {

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  return (
    <>
      <PostItem key={index}>
        <MainUserItem profile={item.profile} userId={item.userId} location={item.location} />
        <SelectedFilter filterStorage={item.images} />
        <InteractionContainer>
          <div className="interaction-btn">
            <IconLike
              onClick={() => { setIsLiked(Prev => !Prev) }}
              fill={isLiked ? "#FB004D" : "#505050"}
              stroke={isLiked ? "#FB004D" : "#FFF"}
            />
            <span className="heart-count">{item.heartCount}</span>
          </div>
          <div className="interaction-btn">
            <IconComment />
            <span className="comment-count">{item.commentCount}</span>
          </div>
          <span className="date-info">{item.dateInfo}</span>
        </InteractionContainer>

        <ContentContainer isExpanded={isExpanded}>
          <span className="content">
            <span className="user-id">{item.userId}</span>
            {item.content}
          </span>
          <button className="more-btn" onClick={() => setIsExpanded(Prev => !Prev)}>더보기</button>
        </ContentContainer>
      </PostItem>

      <IconSwitchMapBtnPosition>
      </IconSwitchMapBtnPosition>
    </>
  )
}

const PostItem = styled.div`
  box-shadow: 0 10px #EEE;
  padding-bottom: 10px;
  margin-bottom: 10px;
`;

const InteractionContainer = styled.div`
  margin-top: 48px;
  padding-left: 10px;
  display: flex;
  align-items: center;
  position: relative;

  .interaction-btn {
    display: flex;
    align-items: center;
    span {
      padding-left: 5px;
    }
  }
  .heart-count {
    margin-right: 10px;
  }
  .date-info {
    color: #767676;
    position: absolute;
    right: 10px;
  }
`;

const ContentContainer = styled.div<{ isExpanded: boolean }>`
    position: relative;
    margin-top: 6px;
    display: flex;
    font-size: 1rem;
    padding-left: 10px;

  .user-id {
    padding-right: 10px;
    font-family: var(--font--Medium);
  }
  .content {
    display: inline-block;
    overflow: hidden; 
    text-overflow: ellipsis; 
    white-space: ${(props) => props.isExpanded ? "normal" : "nowrap"}; 
    width: ${(props) => props.isExpanded ? "100%" : "60%"};
  }
  .more-btn {
    display: ${(props) => props.isExpanded ? "none" : "block"};
    color: #767676;
    position: absolute;
    right: 10px;
  }
`;

const IconSwitchMapBtnPosition = styled.div`
  position: fixed;
  bottom: 12px;
  right: 12px;
  width: 42px;
  height: 42px;
  background: #FC9763 url(${iconSwitchMap}) no-repeat center;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
`;