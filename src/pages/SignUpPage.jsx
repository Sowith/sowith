import { useState } from "react";
import styled from "styled-components";

export const SignUP = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountID, setAccountID] = useState("");

  //회원가입 단에서 들어갈 데이터가 많아서 추후 type 말고 다른 방법으로 수정할 예정
  const handleData = (e) => {
    if (e.target.type === "email") {
      setEmail(e.target.value);
    } else if (e.target.type === "password") {
      setPassword(e.target.value);
    } else if (e.target.type === "text") {
      setAccountID(e.target.value);
    }
  };
  return (
    <>
      <h1>회원가입 페이지 hidden처리</h1>
      <h2 style={{ textAlign: "center" }}>sowith 로고 이미지</h2>
      <FormWrap>
        <fieldset>
          <input type="email" placeholder="사용할 이메일 입력 (email)"></input>
          <input
            type="password"
            placeholder="사용할 비밀번호 입력 (password)"
          ></input>
          <input
            type="password"
            placeholder="비밀번호 확인 (check password)"
          ></input>
        </fieldset>
        <fieldset>
          <input type="text" placeholder="이름 (First name)"></input>
          <input type="text" placeholder="성 (Last name)"></input>
        </fieldset>
        <fieldset>
          <input
            type="text"
            placeholder="계정 ID (언제든지 변경 가능합니다)"
          ></input>
          <textarea placeholder="소개 메세지"></textarea>
        </fieldset>
        <div>
          <button type="submit">회원가입하기</button>
        </div>
      </FormWrap>
    </>
  );
};

const FormWrap = styled.form`
  width: 80%;
  background-color: #756e6e;
  margin: 0 auto;

  & fieldset {
    display: flex;
    flex-direction: column;
    border: none;
    padding: 0;

    &:nth-child(2) {
      flex-direction: row;
    }

    & input {
      margin-top: 10px;
      padding: 5px;
    }
    & textarea {
      margin: 10px 0;
      resize: none;
    }
  }
  & > div {
    text-align: center;
    & button {
      display: inline-block;
      background-color: white;
      border: none;
      margin-bottom: 10px;
      cursor: pointer;
    }
  }
`;
