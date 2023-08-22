import { useState } from 'react';
import styled from 'styled-components';
import { useSignUpHook } from '../hooks/useSignUp';

import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';

import logoWide from '../assets/logo/logo1.png';

import { Button } from "../components/common/Button";
import { Input } from "../components/common/Input"

import logoWide from "../assets/logo/logo1.png";

export const SignUP = () => {
  const { error, isPending, signUpHook } = useSignUpHook();
  const [signUpFormData, setSignUpFormData] = useState({
    email: '',
    password: '',
    userName: '',
    accountID: '',
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
    console.log(signUpFormData);
    signUpHook(signUpFormData);
  };

  return (
    <>
      <h1 className="a11y-hidden">회원가입 페이지</h1>
      <h2 style={{ textAlign: 'center', margin: '60px 0 20px 0' }}>
        <img src={logoWide} />
      </h2>
      <FormWrap onSubmit={handleSubmit}>
        {currentStep === 1 && (
          <fieldset>
            <label htmlFor="email">이메일</label>
            <Input
              type="email"
              id="email"
              value={signUpFormData.email}
              onChange={handleData}
              required
              placeholder="사용할 이메일 입력 (email)"
            ></Input>
            <label htmlFor="password">비밀번호</label>
            <Input
              type="password"
              id="password"
              value={signUpFormData.password}
              onChange={handleData}
              required
              placeholder="사용할 비밀번호 입력 (password)"
            ></Input>
          </fieldset>
        )}
        {currentStep === 2 && (
          <fieldset>
            <label htmlFor="userName">이름</label>
            <Input
              type="text"
              id="userName"
              value={signUpFormData.userName}
              onChange={handleData}
              placeholder="이름을 입력해주세요"
            ></Input>
          </fieldset>
        )}
        {currentStep === 3 && (
          <fieldset>
            <label htmlFor="accountID">계정ID</label>
            <Input
              type="text"
              id="accountID"
              value={signUpFormData.accountID}
              onChange={handleData}
              placeholder="계정 ID (언제든지 변경 가능합니다)"
            ></Input>
          </fieldset>
        )}
        <div>
          {currentStep > 1 && (
            <Button
              type="button"
              text="이전"
              onClick={() => setCurrentStep((prevStep) => prevStep - 1)}
            />
          )}
          {currentStep < 3 && (
            <Button type="button" text="다음" onClick={handleCurrentStep} />
          )}
          {currentStep === 3 && <Button type="submit" text="회원가입" />}
        </div>
      </FormWrap>
    </>
  );
};

const FormWrap = styled.form`
  width: 80%;
  margin: 0 auto;

  & fieldset {
    display: flex;
    flex-direction: column;
    border: none;
    padding: 0;
    &:nth-child(2) {
      flex-direction: row;
    }
    & label {
      font-size: 0.9rem;
      font-family: var(--font--Medium);
      margin-bottom: 7px;
      margin-top: 20px;
    }
    & label:first-child {
      margin-top: 0px;
    }
    & textarea {
      margin: 10px 0;
      resize: none;
    }
  }

  & > div {
    text-align: center;
    display: flex;
    justify-content: center;
    gap: 10px;
  }
`;
