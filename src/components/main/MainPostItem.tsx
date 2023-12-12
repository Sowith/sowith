import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

import { useformatRelativeTime } from 'hooks/useformatRelativeTime';
import { useFirestoreRead } from 'hooks/useFirestoreRead';
import { MainUserItem } from '../../components/main/MainUserItem';
import { SelectedFilter } from "../../components/post/PostSelectedFilter"

import { ReactComponent as IconLike } from "../../assets/icon/icon-like-heart.svg"
import { ReactComponent as IconComment } from "../../assets/icon/icon-comment.svg"
import iconSwitchMap from "../../assets/icon/icon-switch-map.svg";

interface PostItemProps {
  item: any;
  index: number
  openModal: () => void;
  setIsCommentModal: React.Dispatch<React.SetStateAction<string>>;
  setCurrentComments: React.Dispatch<React.SetStateAction<any>>;
}

export const MainPostItem: React.FC<PostItemProps> = ({ item, index, openModal, setIsCommentModal, setCurrentComments }) => {

  const token = sessionStorage.getItem('token');
  const uid = token !== null ? JSON.parse(token).uid : null;

  const { ReadDocument } = useFirestoreRead('users');
  const { convertToAgoFormat } = useformatRelativeTime();

  const contentAreaRef = useRef<HTMLDivElement>(null);

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [postData, setPostData] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showMoreButton, setShowMoreButton] = useState<boolean>(false);
  const [isLike, setIsLike] = useState<boolean>(item.data?.likedUsers.includes(uid));
  const isLiked = item.data?.likedUsers.includes(uid)

  useEffect(() => {
    const fetchData = async () => {
      const response = await ReadDocument(item.data.userId);
      const updatedComments = { ...item.data, ...response };
      setPostData(updatedComments)
    };
    fetchData();
    setIsLoading(false)
  }, []);

  useEffect(() => {
    const contentAreaRefCurrent = contentAreaRef.current;
    if (contentAreaRefCurrent) {      
      contentAreaRefCurrent.clientHeight > 19 && 
      contentAreaRefCurrent.clientHeight > 20 ?
      setShowMoreButton(true) : 
      setShowMoreButton(false) 
    }
  }, [postData.content])

  const handleModal = () => {
    if (postData) {
      // setCurrentComments(postData.comments);
      const fetchData = async () => {
          const updatedComments = await Promise.all(
            postData.comments.map(async comment => {
              const response = await ReadDocument(comment.uid);
              return { ...comment, ...response };
            })
          );
          setCurrentComments(updatedComments);
        }
        fetchData();
      };
  }

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {Object.keys(postData).length !== 0 && (
            <PostItem key={index}>
              <MainUserItem item={postData} openModal={openModal} setIsCommentModal={setIsCommentModal} />
              <SelectedFilter filterStorage={postData.images} />
              <InteractionContainer>
                <button className="interaction-btn">
                  <IconLike
                    onClick={() => {
                      setIsLike((prev) => !prev);
                    }}
                    fill={isLike ? "#FB004D" : "#FFF"}
                    stroke={isLike ? "#FB004D" : "#505050"}
                  />
                  {isLiked ? (
                    <span className="heart-count">
                      {isLike ? postData.likedUsers.length : postData.likedUsers.length - 1}
                    </span>
                  ) : (
                    <span className="heart-count">
                      {isLike ? postData.likedUsers.length + 1 : postData.likedUsers.length}
                    </span>
                  )}
                </button>
                <button className="interaction-btn" onClick={handleModal}>
                  <IconComment />
                  <span className="comment-count">{postData.comments.length}</span>
                </button>
                <span className="date-info">
                  {convertToAgoFormat(postData.createdAt.seconds)}
                </span>
              </InteractionContainer>
  
              <ContentContainer ref={contentAreaRef} isExpanded={isExpanded} showMoreButton={showMoreButton}>
                <span className="content">
                  <span className="user-id">{postData.data.userId}</span>
                  {postData.content}
                </span>
                {showMoreButton && (
                  <button className="more-btn" onClick={() => setIsExpanded((prev) => !prev)}>
                    더보기
                  </button>
                )}
              </ContentContainer>
            </PostItem>
          )}
        </>
      )}
    </>
  );
  
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

const ContentContainer = styled.div<{ isExpanded: boolean, showMoreButton: boolean }>`
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
    word-wrap: break-word;
    text-overflow: ellipsis; 
    /* white-space: ${(props) => props.isExpanded ? "normal" : "nowrap"}; 
    width: ${(props) => props.isExpanded ? "100%" : "60%"}; */
    white-space: ${(props) => props.showMoreButton ? props.isExpanded ? "normal" : "nowrap" : "normal"}; 
    width: ${(props) => props.showMoreButton ? props.isExpanded ? "100%" : "60%" : "100%"};
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