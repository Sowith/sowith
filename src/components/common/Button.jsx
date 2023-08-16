import React from "react";
import styled, { css } from "styled-components";

export const Button = ({ text, ...props }) => {
  return <ButtonDefault {...props}>{text}</ButtonDefault>;
}

const ButtonDefault = styled.button`
  background-color: #FC9763;
  width: ${(props) => props.width || "141px"};
  margin-top: 20px;
  padding: ${(props) => props.padding || "9px 0"};
  border-radius: 10px;
  color: black;
  font-size: ${(props) => props.fontSize || "16px"};
  font-family: var(--font--Medium);
  box-sizing: border-box;
  box-shadow: 4px 4px 4px 0 rgba(0, 0, 0, 0.25);

  &:hover {
    cursor: pointer;
  }

  ${(props) =>
    props.disabled &&
    css`
      background-color: var(--gray100-color);
    `}
`;