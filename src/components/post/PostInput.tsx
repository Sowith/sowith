import { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";

import { useSetRecoilState } from "recoil";
import postFormState from "recoil/postFormState";

import { HashTag } from "components/common/HashTag";
import { UserTag } from "components/common/UserTag";

import { ReactComponent as IconMoveArrow } from "../../assets/icon/icon-move-arrow.svg";

interface InputProps {
  value?: any;
  id: string;
  label: string;
  icon: string;
  type: string;
  placeholder: string;
  height?: string;
  radius?: string;
  tagname?: string;
  selectTag?: string[];
  isUserTagSelected?: boolean;
  isHashTagSelected?: boolean;
  onClick?: () => void;
}

export const WritableTextarea: React.FC<InputProps> = (props) => {

  const [inputKeyword, setInputKeyword] = useState<string>("");

  const setPostForm = useSetRecoilState(postFormState)  

  const handleTextareaBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    const textarea = event.target;
    textarea.scrollTop = 0;

    setPostForm(Prev => {
      const updatedPostInfo = { ...Prev };
      updatedPostInfo.phrase = inputKeyword;
      return updatedPostInfo;
    })
  };

  const handleInput = (e) => {
    e.preventDefault();
    setInputKeyword(e.target.value)
  }

  return (
    <WrapStyle>
      <label htmlFor={props.id} className="a11y-hidden">
        {props.label}
      </label>
      <ImgPosition>
        <img src={props.icon} alt="Icon" />
      </ImgPosition>
      <WritableTextareaStyle {...props} value={inputKeyword} onChange={handleInput} onBlur={handleTextareaBlur}></WritableTextareaStyle>
    </WrapStyle>
  );
};

export const ReadonlyTextarea: React.FC<InputProps> = (props) => {

  const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
      const textareaRefCurrent = textareaRef.current;
      if (textareaRefCurrent) {
        textareaRefCurrent.style.height = "auto";
        const newHeight = textareaRefCurrent.scrollHeight;
        textareaRefCurrent.style.height = `${newHeight}px`;
        textareaRefCurrent.scrollTop = textareaRefCurrent.scrollHeight;
      }
    }, [props.value])

  return (
    <WrapStyle>
      <label htmlFor={props.id} className="a11y-hidden">
        {props.label}
      </label>
      <ImgPosition>
        <img src={props.icon} alt="Icon" />
      </ImgPosition>
      <ReadonlyTextareaStyle {...props} ref={textareaRef} rows={1}></ReadonlyTextareaStyle>
      <IconPosition>
        <IconMoveArrow />
      </IconPosition>
    </WrapStyle>
  );
};

export const ReadonlyInput: React.FC<InputProps> = (props) => {

  return (
    <WrapStyle>
      <label htmlFor={props.id} className="a11y-hidden">
        {props.label}
      </label>
      <ImgPosition>
        <img src={props.icon} alt="Icon" />
      </ImgPosition>
      {(!props.isHashTagSelected && !props.isUserTagSelected) &&
        <ReadonlyInputStyle {...props} autoComplete="off">
        </ReadonlyInputStyle>
      }
      {props.isHashTagSelected && (
        <TagStyle {...props}>
          {props.selectTag?.map((tag, index) => (
            <HashTag key={index} index={index} tag={tag} />
          ))}
        </TagStyle>
      )}
      {props.isUserTagSelected && (
        <TagStyle {...props}>
          {props.selectTag?.map((tag, index) => (
            <UserTag key={index} index={index} tag={tag} />
          ))}
        </TagStyle>
      )}
      <IconPosition>
        <IconMoveArrow />
      </IconPosition>
    </WrapStyle>
  );
};

const WrapStyle = styled.div`
  position: relative;
`;

const CommonStyle = css`
  width: 100%;
  padding: 16px 16px 16px 45px;
  box-sizing: border-box;
  border: 1px solid var(--gray300-color);
  border-radius: 5px;
  font-size: 16px;
  line-height: 1.4;

  &::placeholder {
    color: var(--gray200-color);
  }
  &:focus {
    border: solid 1px transparent;
    background-image: linear-gradient(white, white),
      linear-gradient(to right, #ff547c, #ffc76c);
    background-origin: border-box;
    background-clip: padding-box, border-box;
    outline: none;
  }
`;

const TagStyle = styled.div`
  ${CommonStyle}
  margin-top: -7px;
`;

const WritableTextareaStyle = styled.textarea<InputProps>`
  ${CommonStyle}
  height: ${(props) => props.height};
  display: block;
  resize: none;
  
  &::-webkit-scrollbar-corner {
    display: none;
  }
  &::-webkit-scrollbar {
    width: 0;
  }
`;

const ReadonlyTextareaStyle = styled.textarea<InputProps>`
${CommonStyle}
padding: 16px 30px 16px 45px;
height: ${(props) => props.height};
display: block;
resize: none;

&::-webkit-scrollbar-corner {
  display: none;
}
&::-webkit-scrollbar {
  width: 0;
}
`;

const ReadonlyInputStyle = styled.input<InputProps>`
  ${CommonStyle}
  display: block;
  height: auto;
  box-sizing: border-box;
  height: 54px;
`;

const ImgPosition = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
`;

const IconPosition = styled.div`
  position: absolute;
  top: 45%;
  transform: translateY(-50%);
  right: 15px;
`;
