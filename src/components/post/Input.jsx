import styled, { css } from "styled-components";

import { ReactComponent as IconMoveArrow } from "../../../assets/icon/icon-move-arrow.svg";

export const Input = (props) => {

  const handleTextareaBlur = (event) => {
    const textarea = event.target;
    textarea.scrollTop = 0;
  };

  return (
    <WrapStyle >
      <label htmlFor={props.id} className="a11y-hidden">{props.label}</label>
      <ImgPosition>
        <img src={props.icon} alt="Icon" />
      </ImgPosition>
      {props.isTextarea ?
        <TextareaStyle {...props} onBlur={handleTextareaBlur}></TextareaStyle> :
        <InputStyle {...props}></InputStyle>
      }
      {!props.isTextarea &&
        <IconPosition>
          <IconMoveArrow />
        </IconPosition>
      }
    </WrapStyle>
  )
}

const WrapStyle = styled.div`
  position: relative;
`;

const CommonStyle = css`
  width: 100%;
  box-sizing: border-box;
  padding: 16px 16px 16px 45px;
  border: 1px solid var(--gray300-color);
  height: ${(props) => props.height || "50px"};
  border-radius: ${(props) => props.radius || "5px"};
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

const InputStyle = styled.input`
  ${CommonStyle}
  box-sizing: border-box;
  vertical-align: top;
`;

const TextareaStyle = styled.textarea`
  ${CommonStyle} 
  display:block;
  resize: none;
  &::-webkit-scrollbar-corner{
    display: none;
  }
  &::-webkit-scrollbar {
    width: 0;
  }
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
