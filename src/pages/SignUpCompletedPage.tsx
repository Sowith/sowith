import { useState } from "react";
import styled from "styled-components";

import logoHeart from "../assets/logo/logo-heart.svg";
import logoGround from "../assets/logo/logo-ground.svg";
import logoSowithText from "../assets/logo/logo-sowith-only-text.svg";

//후에 page 상태는 프롭스로 받을 예정입니다

export const SignUpCompletedPage = () => {
  const [page, setPage] = useState(2);

  return (
    <>
      {page === 1 ? (
        <>
          <LogoWrap>
            <img src={logoHeart} />
            <img src={logoGround} />
            <img src={logoSowithText} />
            <p>SOWITH에 오신 걸 환영해요!</p>
          </LogoWrap>
          <ButtonWrap>
            <button>SOWITH 시작하기</button>
          </ButtonWrap>
        </>
      ) : (
        <SplashWrap>
          <p>공간을 넘어 감성을 나누다</p>
          <LogoWrap>
            <img src={logoHeart} />
            <img src={logoGround} />
            <img src={logoSowithText} />
          </LogoWrap>
        </SplashWrap>
      )}
    </>
  );
};

const LogoWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, 0);

  & img:first-child {
    margin-bottom: -15px;
    z-index: 1;
    animation: heartAnimation 2.5s ease-in-out 0.5s infinite;
  }

  & img:nth-child(2) {
    margin-bottom: 20px;
    animation: groundAnimation 2.5s ease-in-out 0.5s infinite;
  }

  & p {
    margin-top: 50px;
    color: var(--gray300-color);
    letter-spacing: 1px;
  }

  @keyframes heartAnimation {
    0% {
      transform: translate(0, 0);
    }

    20% {
      transform: translate(0, 5px);
    }
    50% {
      transform: translate(0, -25px);
    }
    100% {
      transform: translate(0, 0);
    }
  }

  @keyframes groundAnimation {
    0% {
      transform: translate(0, 0);
    }

    20% {
      transform: translate(0, 5px);
    }
    35% {
      transform: translate(0, -10px);
    }
    100% {
      transform: translate(0, 0);
    }
  }
`;

const ButtonWrap = styled.div`
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translate(-50%, 0);

  & button {
    color: white;
    width: 180px;
    background-color: var(--main-color);
    padding: 10px 30px;
    border-radius: 10px;
    font-family: var(--font--Bold);
    letter-spacing: 2px;
  }
`;

const SplashWrap = styled.div`
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, 0);

  & p {
    color: var(--gray300-color);
    letter-spacing: 1px;
    margin-top: -50px;
  }
`