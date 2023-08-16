import { createGlobalStyle } from "styled-components";
import "../assets/font.css";

export const MyGlobalStyle = createGlobalStyle`
  :root {
    --main-color: #FC9763;
    --gray100-color: #D9D9D9;
    --gray200-color: #C4C4C4;
  }

  :root {
    --font--Thin: 'Pretendard-Thin';
    --font--Regular: 'Pretendard-Regular';
    --font--Medium: 'Pretendard-Medium';
    --font--semibold: 'Pretendard-semiBold';
    --font--Bold: 'Pretendard-Bold';
  }

  body {
    font-family: var(--font--Regular);
  }

  img {
    vertical-align: top;
  }

  a {
    color: black;
    text-decoration: none;
  }

  .a11y-hidden {
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: inset(50%);
    width: 1px;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
  }
`;