import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { styled } from 'styled-components';

import { SignUP } from './SignUpTS';
import { Login } from './LoginPage';
import { MyGlobalStyle } from '../style/GlobalStyle';
import { SearchMain } from './search/SearchMainPage';
import { SearchByCategory } from './search/SearchByCategoryPage';
import { ProfilePage } from 'pages/profile/ProfilePage';
import { ProfileUpdatePage } from 'pages/profile/ProfileUpdatePage';

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
      <Link to="/profileUpdatePage">
          <TestButton>(프로필 수정 페이지)</TestButton>
      </Link>
      <Link to="/mainpostview">
          <TestButton>(메인 게시글 뷰)</TestButton>
      </Link>
      <Link to="/createdata">
          <TestButton>데이터 생성</TestButton>
      </Link>
      <Link to="/readdata">
          <TestButton>데이터 조회</TestButton>
      </Link>
      <Link to="/updatedata">
          <TestButton>데이터 수정</TestButton>
      </Link>
      <Link to="/deletedata">
          <TestButton>데이터 삭제</TestButton>
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
