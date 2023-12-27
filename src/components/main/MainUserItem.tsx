import { useState } from 'react';
import styled from 'styled-components';

import { useFirestoreUpdate } from 'hooks/useFirestoreUpdate';
import { useFirestoreDelete } from 'hooks/useFirestoreDelete';
import { useformatRelativeTime } from 'hooks/useformatRelativeTime';
import { useAlertControl } from 'hooks/useAlertControl';
import { AlertBox } from 'components/common/AlertBox';
import getUserInfo from 'utils/getUserInfo';

import { ReactComponent as IconDotMore } from '../../assets/icon/icon-dot-more.svg';
import { ReactComponent as IconSTrash } from '../../assets/icon/icon-s-trash-delete.svg';
import { ReactComponent as IconSReport } from '../../assets/icon/icon-s-report-message.svg';
import { ReactComponent as IconLike } from '../../assets/icon/icon-like-heart.svg';

interface MainUserItemProps {
  postData: any;
  savePostId?: () => void;
  selectedPostId?: string;
  setIsCommentModal?: React.Dispatch<React.SetStateAction<string>>;
  AllCommentData?: () => void;
}

export const MainUserItem: React.FC<MainUserItemProps> = ({ postData, savePostId, setIsCommentModal, selectedPostId, AllCommentData }) => {

  const uid = getUserInfo();

  const { UpdateFieldAttribute } = useFirestoreUpdate('posts')
  const { DeleteField } = useFirestoreDelete('posts')

  const [alertMsg, setAlertMsg] = useState<string>("");
  const isLiked = postData.likedUsers?.includes(uid);

  const { openAlert, AlertComponent } = useAlertControl(100);
  const { convertToAgoFormat } = useformatRelativeTime();

  const handleModal = () => {
    savePostId && savePostId();
    const time = new Date();
    setIsCommentModal && setIsCommentModal("false," + String(time.getTime()));
  }

  const handleAlert = () => {
    if (uid === postData.userId) {
      setAlertMsg("댓글을 삭제하시겠습니까?")
    } else {
      setAlertMsg(`${postData.data.accountId} 님을신고하시겠습니까?`)
    }
    openAlert();
  }

  const handleDeleteOrReport = async () => {
    if (alertMsg === "댓글을 삭제하시겠습니까?") {
      selectedPostId && await DeleteField(selectedPostId, 'comments', [postData.userId, postData.createdAt], ['userId', 'createdAt']);
    } else if (`${postData.data.accountId} 님을신고하시겠습니까?`) {
      // ...
    }
    AllCommentData && AllCommentData();
  }

  const handleHeart = async () => {
    let newLikedUsers;
    if (postData.likedUsers.includes(uid)) {
      newLikedUsers = postData.likedUsers.filter(userId => userId !== uid);
    } else {
      newLikedUsers = [...postData.likedUsers, uid];
    }
    await UpdateFieldAttribute(selectedPostId, 'comments', ['userId', 'createdAt'], [postData.userId, postData.createdAt], 'likedUsers', newLikedUsers);

    AllCommentData && AllCommentData();
  }


  return (
    <>
      <AlertComponent>
        <AlertBox alertMsg={alertMsg} choice={["취소", alertMsg.includes("댓글") ? "삭제" : "신고"]} handleFunc={handleDeleteOrReport} />
      </AlertComponent>
      <Container>
        <img className="icon-user" src={postData.data.profileImageURL} alt="" />
        <div className="user-info">
          <span className="user-id">
            {postData.data.accountId}
            {!postData.location && <span className="creat-post">{convertToAgoFormat(postData.createdAt.seconds)}</span>}
          </span>
          <span className="description">{postData.location || postData.content}</span>
          {!postData.location &&
            <button className="like-btn">
              <IconLike
                width={15}
                onClick={handleHeart}
                fill={isLiked ? "#FB004D" : "#FFF"}
                stroke={isLiked ? "#FB004D" : "#505050"}
              />
              <span className='heart-count'>{postData.likedUsers.length}</span>
            </button>
          }
        </div>
        {!postData.location ?
          <button className="report-delete-area" onClick={handleAlert}>
            {uid === postData.userId ?
              <IconSTrash /> :
              <IconSReport />
            }
          </button> :
          <button className="more-btn" onClick={handleModal}>
            <IconDotMore />
          </button>
        }
      </Container>
    </>
  );
}

const Container = styled.div`
  position: relative;
  width: 100%;
  /* margin-right: -5px; */
  margin-bottom: 5px;
  background-color: #FFF;
  display: flex;
  min-height: 50px;
  
  & + & {
    margin-top: 6px;
  }
  .icon-user {
    border-radius: 50%;
    border: 1px solid var(--gray200-color);
    margin-left: 10px;
    margin-top: 7px;
    width: 40px;
    height: 40px;
  }
  div.user-info {
    padding: 7px 10px 0;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  span.user-id {
    font-family: var(--font--Medium);
    font-size: 1rem;
  }
  span.creat-post {
    position: relative;
    padding-left: 17px;
    font-family: var(--font--Regular);
    font-size: 0.9rem;
    color: #767676;
    &::before {
      content: "";
      display: inline-block;
      position: absolute;
      left: 6px;
      top: 50%;
      transform: translateY(-50%);
      width: 3px;
      height: 3px;
      border-radius: 50%;
      background-color: #767676;
    }
  }
  span.description {
    display: flex;
    gap: 5px;
    width: 70vw;
    font-size: 0.8rem;
  }
  button.more-btn,
  button.report-delete-area {
    position: absolute;
    top: 15px;
    right: 20px;
  }
  button.like-btn{
    display: flex;
    align-items: center;
    .heart-count {
      color: #767676;
      padding-left: 5px;
      font-family: var(--font--Regular);
      font-size: 0.8rem;
    }
  }
`;