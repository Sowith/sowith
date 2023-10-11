import React from "react";
import styled, { css } from "styled-components";

export const Button = ({ text, ...props }) => {
  return <ButtonDefault {...props}>{text}</ButtonDefault>;
}

const ButtonDefault = styled.button`
  background-color: var(--main-color);
  min-width: ${(props) => props.width || "141px"};
  min-height: ${(props) => props.height || ""};
  margin: ${(props) => props.margin || "20px 0 0"};
  padding: ${(props) => props.padding || "9px 0"};
  border-radius: ${(props) => props.borderRadius || "10px"};
  color: white;
  text-align: center;
  font-size: ${(props) => props.fontSize || "16px"};
  font-family: ${(props) => props.fontFamily || "var(--font--Medium)"};  
  box-sizing: border-box;
  box-shadow: ${({boxShadow = false}) => boxShadow ? "4px 4px 4px 0 rgba(0, 0, 0, 0.25)" : ""};

  &:hover {
    cursor: pointer;
  }

  ${(props) =>
    props.disabled &&
    css`
      background-color: var(--gray100-color);
      color: black;
    `}
`;