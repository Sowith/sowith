import { styled } from "styled-components";

import IconCancelHumanTag from "../../assets/icon/icon-cancel-humantag.svg";

interface UserTagProps {
  index: number;
  tag: string;
  handleDeleteTag?: (index: number) => void;
}

export const UserTag: React.FC<UserTagProps> = ({ index, tag, handleDeleteTag }) => {
  return (
    <TagStyle key={index}>
      <span>{`@ ${tag}`}</span>
      <IconCancelPosition onClick={() => handleDeleteTag && handleDeleteTag(index)}>
      </IconCancelPosition>
    </TagStyle>
  );
};

const TagStyle = styled.div`
  position: relative;
  display: inline-block;
  margin: 4px;
  padding: 1px 28px 1px 7px;
  box-sizing: border-box;
  border-radius: 30px;
  height: 25px;
  background-color: var(--main-color);

  span {
    font-size: 12px;
    font-family: var(--font--Bold);
    color: #FFF;
    text-align: center;
  }
`;

const IconCancelPosition = styled.div`
  position: absolute;
  cursor: pointer;
  width: 14px;
  height: 14px;
  background: no-repeat url(${IconCancelHumanTag}) center #FFF;
  border-radius: 50%;
  top: 50%;
  transform: translateY(-50%);
  right: 6px;
`;