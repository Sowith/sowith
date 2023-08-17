import React from "react";
import styled from "styled-components";

export const Input = ({ type, id, ...props }) => {
  return <InputDefault type={type} id={id} {...props} />;
};

const InputDefault = styled.input`
  max-width: ${(props) => props.width || "100%"};
  padding: 15px;
  margin-bottom: 10px;
  border: 2px solid var(--gray300-color);
  border-radius: ${(props) => props.radius || "10px"};
  &::placeholder {
    color: var(--gray200-color);
  }
  &:focus {
    padding: 15px;
    border: solid 2px transparent;
    border-radius: 10px;
    background-image: linear-gradient(white, white),
      linear-gradient(to right, #ff547c, #ffc76c);
    background-origin: border-box;
    background-clip: padding-box, border-box;
    outline: none;
  }
`;
