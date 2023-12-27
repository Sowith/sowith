import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

import { useFirestoreUpdate } from 'hooks/useFirestoreUpdate';
import { arrayUnion } from "firebase/firestore";
import { arrayRemove } from "firebase/firestore";
import { useformatRelativeTime } from 'hooks/useformatRelativeTime';
import { useFirestoreRead } from 'hooks/useFirestoreRead';
import { MainUserItem } from '../../components/main/MainUserItem';
import { SelectedFilter } from "../../components/post/PostSelectedFilter"
import getUserInfo from 'utils/getUserInfo';

import { ReactComponent as IconLike } from "../../assets/icon/icon-like-heart.svg"
import { ReactComponent as IconComment } from "../../assets/icon/icon-comment.svg"
import iconSwitchMap from "../../assets/icon/icon-switch-map.svg";

interface PostItemProps {
  item: any;
  setIsCommentModal: React.Dispatch<React.SetStateAction<string>>;
  setSelectedPostId: React.Dispatch<React.SetStateAction<any>>;
}

export const MainPostItem: React.FC<PostItemProps> = ({ item, setIsCommentModal, setSelectedPostId }) => {

  const uid = getUserInfo();

  const { ReadDocument } = useFirestoreRead('users');
  const { UpdateField } = useFirestoreUpdate('posts');
  const { convertToAgoFormat } = useformatRelativeTime();

  const contentAreaRef = useRef<HTMLDivElement>(null);

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [showMoreButton, setShowMoreButton] = useState<boolean>(false);
  const [postData, setPostData] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLike, setIsLike] = useState<boolean>(item.data.likedUsers.includes(uid));

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
      contentAreaRefCurrent.clientHeight > 25 ?
        setShowMoreButton(true) :
        setShowMoreButton(false)
    }
  }, [postData.content])

  const handleModal = () => {
    setSelectedPostId(item.id);
    const time = new Date();
    setIsCommentModal("true," + String(time.getTime()));
  }

  const savePostId = () => {
    setSelectedPostId(item.id);
  }

  const handleHeart = () => {
    UpdateField({
      likedUsers: postData.likedUsers.includes(uid) ? arrayRemove(uid) : arrayUnion(uid)
    }, item.id);
    setPostData(Prev => {
      let newLikedUsers;
      if (Prev.likedUsers.includes(uid)) {
        newLikedUsers = Prev.likedUsers.filter(userId => userId !== uid);
      } else {
        newLikedUsers = [...Prev.likedUsers, uid];
      }
      return { ...Prev, likedUsers: newLikedUsers };
    })
  }

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {Object.keys(postData).length !== 0 && (
            <PostItem key={item.id}>
              <MainUserItem postData={postData} savePostId={savePostId} setIsCommentModal={setIsCommentModal} />
              <SelectedFilter filterStorage={postData.images} />

              <InteractionContainer style={{ marginTop: `${postData.images.length > 1 ? 48 : 24}px` }}>
                <button className="interaction-btn">
                  <IconLike
                    onClick={() => {
                      setIsLike((prev) => !prev);
                      handleHeart();
                    }}
                    fill={isLike ? "#FB004D" : "#FFF"}
                    stroke={isLike ? "#FB004D" : "#505050"}
                  />
                  <span className="heart-count">
                    {postData.likedUsers.length}
                  </span>
                </button>
                <button className="interaction-btn" onClick={handleModal}>
                  <IconComment />
                  <span className="comment-count">{item.data.comments.length}</span>
                </button>
                <span className="date-info">
                  {convertToAgoFormat(postData.createdAt.seconds)}
                </span>
              </InteractionContainer>

              {
                postData.content &&
                <ContentContainer ref={contentAreaRef} isExpanded={isExpanded} showMoreButton={showMoreButton}>
                  <span className="content">
                    <span className="user-id">{postData.data.accountId}</span>
                    {postData.content}
                  </span>
                  {showMoreButton && (
                    <button className="more-btn" onClick={() => setIsExpanded((prev) => !prev)}>
                      더보기
                    </button>
                  )}
                </ContentContainer>
              }
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
    padding-right: 10px;

  .user-id {
    padding-right: 5px;
    font-family: var(--font--Medium);
  }
  .content {
    display: inline-block;
    overflow: hidden; 
    word-wrap: break-word;
    text-overflow: ellipsis; 
    white-space: ${(props) => props.showMoreButton ? props.isExpanded ? "normal" : "nowrap" : "normal"}; 
    width: ${(props) => props.showMoreButton ? props.isExpanded ? "100%" : "80%" : "100%"};
    margin-top: 5px;
  }
  .more-btn {
    display: ${(props) => props.isExpanded ? "none" : "block"};
    color: #767676;
    position: absolute;
    top: 5px;
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