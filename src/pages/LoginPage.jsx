import { useState } from "react";
import styled from "styled-components";

import { useLoginHook } from "../hooks/useLogin";

export const Login = () => {

  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: ""
  });
  const { error, isPending, loginHook } = useLoginHook();

  const handleData = (e) => {
    const { id, value } = e.target;
    setLoginFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(isPending);
    console.log(loginFormData);
    loginHook(loginFormData);
  };

  return (
    <>
      <h1>로그인 페이지 hidden처리</h1>
      <h2 style={{ textAlign: "center" }}>sowith 로고 이미지</h2>
      <FormWrap onSubmit={handleSubmit}>
        <fieldset>
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            value={loginFormData.email}
            onChange={handleData}
            required
            placeholder="이메일 입력 (email)"
          ></input>
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            value={loginFormData.password}
            onChange={handleData}
            required
            placeholder="비밀번호 입력 (password)"
          ></input>
        </fieldset>
        <div>
          <button type="submit">로그인</button>
          {error && <strong>{error}</strong>}
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
      margin-bottom: 10px;
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
