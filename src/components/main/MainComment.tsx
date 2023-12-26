import { useState, useRef, useEffect } from "react";
import styled from "styled-components";

import { useFirestoreRead } from "hooks/useFirestoreRead";
import { useFirestoreUpdate } from "hooks/useFirestoreUpdate";
import { MainUserItem } from "./MainUserItem"
import { arrayUnion } from "firebase/firestore";
import { Timestamp } from 'firebase/firestore';
import getUserInfo from "utils/getUserInfo";

interface MainCommentProps {
  selectedPostId: string;
}

export const MainComment: React.FC<MainCommentProps> = ({ selectedPostId }) => {

  const uid = getUserInfo();

  const { UpdateField } = useFirestoreUpdate('posts');
  const useFirestoreReadPosts = useFirestoreRead('posts');
  const useFirestoreReadUsers = useFirestoreRead('users');

  const [inptValue, setInptValue] = useState('');
  const [prevInpt, setPrevInpt] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [commentSectionHeight, setCommentSectionHeight] = useState<number>(0);
  const [comments, setComments] = useState<any>([]);

  const createdAt = Timestamp.fromDate(new Date());

  const handleTextareaChange = (event) => {
    setInptValue(event.target.value);
    setPrevInpt(inptValue)
  };

  useEffect(() => {
    const textareaRefCurrent = textareaRef.current
    if (textareaRefCurrent) {
      if (inptValue.length < prevInpt.length) {
        textareaRefCurrent.style.height = "auto";
      }
      const newHeight = textareaRefCurrent.scrollHeight;
      setCommentSectionHeight(newHeight)
      textareaRefCurrent.style.height = `${newHeight}px`;
      textareaRefCurrent.scrollTop = textareaRefCurrent.scrollHeight;
    }
  }, [inptValue])

  const AllCommentData = async () => {
    try {
      const allComments = await useFirestoreReadPosts.ReadDocument(selectedPostId)
      if (!allComments || !allComments.data.comments) {
        console.error('Invalid data:', allComments);
        return;
      }

      const commentsPromises = allComments.data.comments.map(comment => {
        return useFirestoreReadUsers.ReadDocument(comment.userId);
      });

      const users = await Promise.all(commentsPromises);
      const mergedData = allComments.data.comments.map((comment, index) => {
        return { ...comment, ...users[index] };
      });

      setComments(mergedData);

    } catch (error) {
      console.error('error', error);
    }
  }

  useEffect(() => {
    AllCommentData()
  }, [])

  const submitPost = async () => {
    await UpdateField({
      comments: arrayUnion({
        userId: userInfo.uid,
        likedUsers: [],
        content: inptValue,
        createdAt: createdAt,
      })
    }, selectedPostId)
    setInptValue('');
    AllCommentData();
  }


  return (
    <>
      <WraperStyle commentSectionHeight={commentSectionHeight}>
        <span className="modal-title">댓글</span>
        {comments.length > 0 && comments.map((item) => (
          <MainUserItem postData={item} selectedPostId={selectedPostId} AllCommentData={AllCommentData} />
        ))}
        <InputCommentContainer>
          <img src={userInfo.profileImageURL} className="profile-img" />
          <InputBox>
            <textarea
              rows={1}
              name="productInfo"
              id="product-detail"
              value={inptValue}
              onChange={handleTextareaChange}
              className="input-comment"
              placeholder="댓글달기"
              ref={textareaRef}
            ></textarea>
            <button className="submit-btn" onClick={submitPost}>게시</button>
          </InputBox>
        </InputCommentContainer>
      </WraperStyle>
    </>
  )
}

const WraperStyle = styled.div<{ commentSectionHeight: number }>`
  width: inherit;
  margin-top: 25px;
  overflow-y: scroll;
  padding-bottom: ${(props) => (props.commentSectionHeight - 40) + 72}px;
  
  &::-webkit-scrollbar {
    width: 0;
  }
  .modal-title {
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    width: 100%;
    height: 10px;
    display: block;
    font-family: var(--font--Medium);
    font-size: .9rem;
    padding-bottom: 15px;
    margin-bottom: 15px;
    box-shadow: 0 1px #C4C4C4;
  }
`;

const InputCommentContainer = styled.div`
  position: absolute;
  bottom: 0;
  padding: 15px 0;
  display: flex;
  align-items: end;
  justify-content: space-between;
  width: 100%;
  background-color: #FFF;

  .profile-img {
    border-radius: 50%;
    border: 1px solid var(--gray200-color);
    margin-left: 10px;
    width: 40px;
    aspect-ratio: 1 / 1;
  }
`;

const InputBox = styled.div`
  position: relative;
  margin-right: 15px;
  min-height: 40px;
  width: calc(100% - 75px);
  display: flex;
  align-content: center;
  
  
  .input-comment {
    width: 100%;
    padding: 11px 60px 11px 20px;
    max-height: 150px;
    box-sizing: border-box;
    min-height: 40px;
    border-radius: 30px;
    box-shadow: 0 0 5px rgba(0, 0, 0, .25);
    border: none;
    resize: none;
    overflow-y: scroll;
    font-size: 1rem;
    transition: .3s;
    &::-webkit-scrollbar {
      width: 0;
    }
    &::placeholder {
      color: var(--gray200-color);
      font-size: .9rem;
    }
    &:focus {
      border: none;
      outline: none;
    }

  }
.submit-btn {
  position: absolute;
  right: 20px;
  bottom: 6px;
  transform: translateY(-50%);
  color: #FC9763;
  font-size: .8rem;
  }
`;
