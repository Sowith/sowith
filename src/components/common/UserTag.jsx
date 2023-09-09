import { styled } from "styled-components"

import IconCancelHumanTag from "../../assets/icon/icon-cancel-humantag.svg";

export const UserTag = ({ index, tag, handleDeleteTag }) => {

  return (
    <TagStyle key={index}>
    <span>{`@${tag}`}</span>
    <IconCancelPosition IconCancelHumanTag={IconCancelHumanTag} onClick={()=>handleDeleteTag(index)}>
    </IconCancelPosition>
    </TagStyle>
  )
}

const TagStyle = styled.div`
  position: relative;
  display: inline-block;
  margin: 4px;
  padding: 1px 25px 1px 7px;
  box-sizing: border-box;
  border-radius: 30px;
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
  width: 10px;
  height: 10px;
  background: no-repeat url(${IconCancelHumanTag}) center #FFF;
  border-radius: 50%;
  top: 50%;
  transform: translateY(-50%);
  right: 9px;
`;