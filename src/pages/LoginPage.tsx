import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import styled from "styled-components";

import { useLoginHook } from "../hooks/useLogin";
import { Button } from "../components/common/Button";
import { Input } from "../components/common/Input"

import logoWide from "../assets/logo/logo1.png";

interface LoginFormData {
  email: string;
  password: string;
}

export const Login = () => {
  const { error, isPending, loginHook } = useLoginHook();
  const [loginFormData, setLoginFormData] = useState<LoginFormData>({
    email: "",
    password: ""
  });
  const [emailValid, setEmailValid] = useState<string | undefined>();
  const [passwordValid, setPasswordValid] = useState<string | undefined>();

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleData = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setLoginFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));

    if (value !== "" && id === "email" && !emailPattern.test(value)) {
      setEmailValid("유효한 이메일 주소 형식이 아닙니다");
    } else {
      setEmailValid("");
      setPasswordValid("");
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    loginHook(loginFormData);
  };

  useEffect(() => {
    console.log(error);
    if (error && typeof error === "string") { 
      if (error.includes("user-not-found")) setEmailValid("가입되어 있지 않은 이메일입니다");
      if (error.includes("wrong-password")) setPasswordValid("비밀번호가 일치하지 않습니다");
    }
  }, [error])

  return (
    <>
      <h1 className="a11y-hidden">로그인 페이지</h1>
      <h2 style={{ textAlign: "center", margin: "60px 0 20px 0" }}>
        {/* <img src={logoWide} alt="로고" /> */}
      </h2>
      <FormWrap onSubmit={handleSubmit} noValidate>
        <fieldset>
          <label htmlFor="email">이메일</label>
          <Input
            type="email"
            id="email"
            value={loginFormData.email}
            onChange={handleData}
            required
            placeholder="이메일 입력 (email)"
            msg={emailValid}
          ></Input>
          <label htmlFor="password">비밀번호</label>
          <Input
            type="password"
            id="password"
            value={loginFormData.password}
            onChange={handleData}
            required
            placeholder="비밀번호 입력 (password)"
            msg={passwordValid}
          ></Input>
        </fieldset>
        <div>
          <Button type="submit" text="로그인" />
        </div>
      </FormWrap>
    </>
  );
}

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




// import { useState, useEffect } from "react";
// import styled from "styled-components";

// import { useLoginHook } from "../hooks/useLogin";
// import { Button } from "../components/common/Button";
// import { Input } from "../components/common/Input"

// import logoWide from "../assets/logo/logo1.png";

// export const Login = () => {

//   const { error, isPending, loginHook } = useLoginHook();
//   const [loginFormData, setLoginFormData] = useState({
//     email: "",
//     password: ""
//   });
//   const [emailValid, setEmailValid] = useState();
//   const [passwordValid, setPasswordValid] = useState();

//   const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//   // const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

//   const handleData = (e) => {
//     const { id, value } = e.target;
//     setLoginFormData((prevData) => ({
//       ...prevData,
//       [id]: value,
//     }));

//     if (value !== "" && id === "email" && !emailPattern.test(value)) {
//       setEmailValid("유효한 이메일 주소 형식이 아닙니다");
//     } 
//     // else if (value !== "" && id === "password" && !passwordPattern.test(value)) {
//     //   setPasswordValid("영문 대소문자, 숫자, 특수문자를 포함한 비밀번호를 입력하세요");
//     // }
//     else {
//       setEmailValid("");
//       setPasswordValid("");
//     }
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     loginHook(loginFormData);
//   };

//   useEffect(() => {
//     console.log(error);
//     error && error.includes("user-not-found") && setEmailValid("가입되어 있지 않은 이메일입니다");
//     error && error.includes("wrong-password") && setPasswordValid("비밀번호가 일치하지 않습니다");
//   }, [error])

//   return (
//     <>
//       <h1 className="a11y-hidden">로그인 페이지</h1>
//       <h2 style={{ textAlign: "center", margin: "60px 0 20px 0" }}>
//         <img src={logoWide} />
//       </h2>
//       <FormWrap onSubmit={handleSubmit} noValidate>
//         <fieldset>
//           <label htmlFor="email">이메일</label>
//           <Input
//             type="email"
//             id="email"
//             value={loginFormData.email}
//             onChange={handleData}
//             required
//             placeholder="이메일 입력 (email)"
//             msg={emailValid}
//           ></Input>
//           <label htmlFor="password">비밀번호</label>
//           <Input
//             type="password"
//             id="password"
//             value={loginFormData.password}
//             onChange={handleData}
//             required
//             placeholder="비밀번호 입력 (password)"
//             msg={passwordValid}
//           ></Input>
//         </fieldset>
//         <div>
//           <Button type="submit" text="로그인" />
//         </div>
//       </FormWrap>
//     </>
//   );
// };

// const FormWrap = styled.form`
//   width: 80%;
//   margin: 0 auto;

//   & fieldset {
//     display: flex;
//     flex-direction: column;
//     border: none;
//     padding: 0;
//     &:nth-child(2) {
//       flex-direction: row;
//     }
//     & label {
//       font-size: 0.9rem;
//       font-family: var(--font--Medium);
//       margin-bottom: 7px;
//       margin-top: 20px;
//     }
//     & label:first-child {
//       margin-top: 0px;
//     }
//     & textarea {
//       margin: 10px 0;
//       resize: none;
//     }
//   }

//   & > div {
//     text-align: center;
//     display: flex;
//     justify-content: center;
//     gap: 10px;
//   }
// `;
