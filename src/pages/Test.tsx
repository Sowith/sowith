import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import { SignUP } from './SignUpTS';
import { Login } from './LoginPage';
import { PostUpload } from './PostUpload';
import { MyGlobalStyle } from '../style/GlobalStyle';
import { SearchMain } from './search/SearchMainPage';
import { SearchByCategory } from './search/SearchByCategoryPage';
import { ProfilePage } from 'pages/profile/ProfilePage';
import { styled } from 'styled-components';

export const Test = () => {
  return (
    <div>
      <Link to="/signup">
        <TestButton>회원가입 페이지</TestButton>
      </Link>
      <Link to="/login">
        <TestButton>로그인 페이지</TestButton>
      </Link>
      <Link to="/postupload">
        <TestButton>게시물 작성 페이지</TestButton>
      </Link>
      <Link to="/searchmain">
        <TestButton>(메인 검색 페이지)</TestButton>
      </Link>
      <Link to="/profilePage">
        <TestButton>(프로필) </TestButton>
      </Link>
      <Link to="/searchbycategory">
        <TestButton>(상세 검색 페이지)</TestButton>
      </Link>
    </div>
  );
};
const TestButton = styled.button`
  background-color: var(--main-color);
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  border: 1px solid #dbdbdb;
`;
