import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { useAlertControl } from 'hooks/useAlertControl';
import { AlertBox } from 'components/common/AlertBox';
import { ReactComponent as IconDotMore } from '../../assets/icon/icon-dot-more.svg';
import { ReactComponent as IconSTrash } from '../../assets/icon/icon-s-trash-delete.svg';
import { ReactComponent as IconSReport } from '../../assets/icon/icon-s-report-message.svg';
import { ReactComponent as IconLike } from '../../assets/icon/icon-like-heart.svg';

interface MainUserItemProps {
  item: any;
  openModal?: () => void;
  setIsCommentModal?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MainUserItem: React.FC<MainUserItemProps> = ({ item, openModal, setIsCommentModal }) => {

  const token = sessionStorage.getItem('token');
  const loginUid = token !== null ? JSON.parse(token).uid : null;

  const [alertMsg, setAlertMsg] = useState<string>("");
  const [isLike, setIsLike] = useState<boolean>(item.likedUsers.includes(loginUid));
  const isLiked = item.likedUsers?.includes(loginUid);

  const { openAlert, AlertComponent } = useAlertControl(100);

  const handleModal = () => {
    setIsCommentModal && setIsCommentModal(false)
    openModal && openModal()
  }

  const handleAlert = () => {

    if (loginUid === item.uid) {
      setAlertMsg("댓글을 삭제하시겠습니까?")
    } else {
      setAlertMsg(`${item.data.userId} 님을신고하시겠습니까?`)
    }
    openAlert();
  }

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (!!item.likedUsers) {
  //       setIsLike(item.likedUsers.includes(loginUid))
  //     }
  //   }
  //   fetchData();
  // }, [])

  return (
      <>
      <AlertComponent>
        <AlertBox alertMsg={alertMsg} choice={["취소", alertMsg.includes("댓글") ? "삭제" : "신고"]} />
      </AlertComponent>
      <Container>
        <img className="icon-user" src={item.data.profile} alt="" />
        <div className="user-info">
          <span className="user-id">
            {item.data.userId}
            {!!item.images && <span className="creat-post">{item.createdAt + " 일전"}</span>}
          </span>
          <span className="description">{!!item.images ? item.location : item.content}</span>
          {!item.images &&
            <button className="like-btn">
              <IconLike
                width={15}
                onClick={() => { setIsLike(Prev => !Prev) }}
                fill={isLike ? "#FB004D" : "#FFF"}
                stroke={isLike ? "#FB004D" : "#505050"}
              />
              {
                isLiked ? (
                  <span className='heart-count'>{isLike ? item.likedUsers.length : item.likedUsers.length - 1}</span>
                ) : (
                  <span className='heart-count'>{isLike ? item.likedUsers.length + 1 : item.likedUsers.length}</span>
                )
              }
            </button>
          }
        </div>
        {!item.images ?
          <button className="report-delete-area" onClick={handleAlert}>
            {loginUid === item.data.uid ?
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