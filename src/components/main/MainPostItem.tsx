import { useEffect, useState } from 'react';
import styled from 'styled-components';

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
  setIsCommentModal: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentComments: React.Dispatch<React.SetStateAction<any>>;
}

export const MainPostItem: React.FC<PostItemProps> = ({ item, index, openModal, setIsCommentModal, setCurrentComments }) => {

  const token = sessionStorage.getItem('token');
  const uid = token !== null ? JSON.parse(token).uid : null;

  const { ReadDocument } = useFirestoreRead('users');
  
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [postData, setPostData] = useState<any>({});
  const [isLike, setIsLike] = useState<boolean>(item.data?.likedUsers.includes(uid));
  const isLiked = item.data?.likedUsers.includes(uid)

  useEffect(() => {
    const fetchData = async () => {
      const response = await ReadDocument(item.data.uid);
      const updatedComments = { ...item.data, ...response };
      setPostData(updatedComments)
    };
    fetchData();
  }, []);

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
      // setIsCommentModal(true);
      // openModal();
  }

  return (
    <>
      {Object.keys(postData).length !== 0 &&
        <>
          <PostItem key={index}>
            <MainUserItem item={postData} openModal={openModal} setIsCommentModal={setIsCommentModal} />
            <SelectedFilter filterStorage={postData.images} />
            <InteractionContainer>
              <button className="interaction-btn">

                <IconLike
                  onClick={() => { setIsLike(Prev => !Prev) }}
                  fill={isLike ? "#FB004D" : "#FFF"}
                  stroke={isLike ? "#FB004D" : "#505050"}
                />
                {
                  isLiked ? (
                    <span className='heart-count'>{isLike ? postData.likedUsers.length : postData.likedUsers.length - 1}</span>
                  ) : (
                    <span className='heart-count'>{isLike ? postData.likedUsers.length + 1 : postData.likedUsers.length}</span>
                  )
                }
              </button>
              <button className="interaction-btn" onClick={handleModal}>
                <IconComment />
                <span className="comment-count">{postData.comments.length}</span>
              </button>
              <span className="date-info">{postData.createdAt.seconds + " 일전"}</span>
            </InteractionContainer>

            <ContentContainer isExpanded={isExpanded}>
              <span className="content">
                <span className="user-id">{postData.data.userId}</span>
                {postData.content}
              </span>
              <button className="more-btn" onClick={() => setIsExpanded(Prev => !Prev)}>더보기</button>
            </ContentContainer>
          </PostItem>

          <IconSwitchMapBtnPosition>
          </IconSwitchMapBtnPosition>
        </>
      }
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