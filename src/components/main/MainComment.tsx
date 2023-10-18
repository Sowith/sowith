import { useState, useRef, useEffect } from "react";
import styled from "styled-components";

import { MainUserItem } from "./MainUserItem"

import profile from "../../assets/testImg/profile_2.jpg"

interface MainCommentProps {
  currentComments: any;
}

export const MainComment: React.FC<MainCommentProps> = ({ currentComments }) => {

  const [inptValue, setInptValue] = useState('');
  const [prevInpt, setPrevInpt] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTextareaChange = (event) => {
    setInptValue(event.target.value);
    setPrevInpt(inptValue)
  };

  useEffect(() => {
    if (textareaRef.current) {
      if (inptValue.length < prevInpt.length) {
        textareaRef.current.style.height = "auto";
      }
      const newHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${newHeight}px`;
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
    }
  }, [inptValue])

  return (
    <>
      <WraperStyle>
        <span className="modal-title">댓글</span>
        {currentComments.map((item) => (
          <MainUserItem item={item} />
        ))}
        <InputCommentContainer>
          <img src={profile} className="profile-img" />
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
            <button className="submit-btn">게시</button>
          </InputBox>
        </InputCommentContainer>
      </WraperStyle>
    </>
  )
}

const WraperStyle = styled.div`
  width: inherit;
  margin-top: 25px;
  padding-bottom: 70px;
  overflow-y: scroll;

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
    min-width: 40px;
    height: 40px;
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
    font-size: .9rem;
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
