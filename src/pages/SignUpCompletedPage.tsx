import styled from "styled-components";

import logoHeart from "../assets/logo/logo-heart.svg";
import logoGround from "../assets/logo/logo-ground.svg";
import logoSowithText from "../assets/logo/logo-sowith-only-text.svg";

export const SignUpCompletedPage = () => {
  return (
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
    animation: heartAnimation 3s ease-in-out 0.5s infinite;
  }

  & img:nth-child(2) {
    margin-bottom: 20px;
    animation: groundAnimation 3s ease-in-out 0.5s infinite;
  }

  & img:nth-child(3) {
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
      transform: translate(0, -30px) ;
    }
    100% {
      transform: translate(0, 0) ;
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
