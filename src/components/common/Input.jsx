import styled from "styled-components";

import warning from "../../assets/icon/icon-warning.svg"

export const Input = ({ type, id, msg = "", ...props }) => {
  return (
    <>
      <InputDefault type={type} id={id} {...props} />
      {msg && <ValidMsg>{msg}</ValidMsg>}
    </>
  );
};

const InputDefault = styled.input`
  max-width: ${(props) => props.width || "100%"};
  padding: 15px;
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

const ValidMsg = styled.span`
    display: flex;
    align-items: center;
    padding-top: 10px;
    color: #FF0000;
    font-size: 10px;

    &:before { 
      content: "";
      display: inline-block;
      width: 14px;
      height: 14px;
      padding-right: 5px;
      background: url(${warning}) no-repeat; 
    }
`;