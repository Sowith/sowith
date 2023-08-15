import { useState } from "react";
import styled from "styled-components";
import { useSignUpHook } from "../hooks/useSignUp";

export const SignUP = () => {
  const { error, isPending, signUpHook } = useSignUpHook();
  const [signUpFormData, setSignUpFormData] = useState({
    email: "",
    password: "",
    userName: "",
    accountID: "",
  });
  const [currentStep, setCurrentStep] = useState(1);

  const handleCurrentStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleData = (e) => {
    const { id, value } = e.target;
    setSignUpFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signUpHook(signUpFormData);
  };

  return (
    <>
      <h1 className="a11y-hidden">회원가입 페이지</h1>
      <h2 style={{ textAlign: "center" }}>sowith 로고 이미지</h2>
      <FormWrap onSubmit={handleSubmit}>
        {currentStep === 1 && (
          <fieldset>
            <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            value={signUpFormData.email}
            onChange={handleData}
            required
            placeholder="사용할 이메일 입력 (email)"
          ></input>
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            value={signUpFormData.password}
            onChange={handleData}
            required
            placeholder="사용할 비밀번호 입력 (password)"
          ></input>
          </fieldset>
        )}
        {currentStep === 2 && (
          <fieldset>
            <label htmlFor="userName">이름</label>
          <input
            type="text"
            id="userName"
            value={signUpFormData.userName}
            onChange={handleData}
            placeholder="이름을 입력해주세요"
          ></input>
          </fieldset>
        )}
        {currentStep === 3 && (
          <fieldset>
            <label htmlFor="accountID">계정ID</label>
          <input
            type="text"
            id="accountID"
            value={signUpFormData.accountID}
            onChange={handleData}
            placeholder="계정 ID (언제든지 변경 가능합니다)"
          ></input>
          </fieldset>
        )}
        <div>
          {currentStep > 1 && (
            <button type="button" onClick={() => setCurrentStep((prevStep) => prevStep - 1)}>
              이전
            </button>
          )}
          {currentStep < 3 && (
            <button type="button" onClick={handleCurrentStep}>다음</button>
          )}
          {currentStep === 3 && (
            <button type="submit">회원가입하기</button>
          )}
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
