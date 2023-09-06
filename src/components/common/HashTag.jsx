import React from 'react'
import { styled } from "styled-components"

import { ReactComponent as IconCancelHashTag } from "../../assets/icon/icon-cancel-hashtag.svg";

export const HashTag = ({ index, tag, handleDeleteTag }) => {

  return (
    <TagStyle key={index}>
    <span>{tag}</span>
    <IconCancelPosition>
      <IconCancelHashTag onClick={()=>handleDeleteTag(index)}/>
    </IconCancelPosition>
    </TagStyle>
  )
}

const TagStyle = styled.div`
  position: relative;
  display: inline-block;
  margin: 4px;
  padding: 1px 20px 1px 7px;
  box-sizing: border-box;
  border-radius: 5px;
  height: 25px;
  background-image: linear-gradient(to right, #ff547c, #ffc76c);

  span {
    font-size: 12px;
    font-family: var(--font--Regular);
    color: #FFF;
    text-align: center;
  }
`;

const IconCancelPosition = styled.div`
  position: absolute;
  cursor: pointer;
  width: 0;
  top: 1px;
  right: 14px;
`;