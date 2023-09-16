import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// pages
import { SignUP } from './pages/SignUpTS';
import { Login } from './pages/LoginPage';
import { PostUpload } from './pages/PostUpload';
import { MyGlobalStyle } from './style/GlobalStyle';
import { SearchMain } from './pages/search/SearchMainPage';
import { SearchByCategory } from './pages/search/SearchByCategoryPage';
import { SearchTrendingGroup } from 'pages/search/SearchTrendingGroupPage';
import { SearchTrendingTag } from 'pages/search/SearchTrendingTagPage';
import { SearchTrendingFolder } from 'pages/search/SearchTrendingFolderPage';
import { ProfilePage } from './pages/profile/ProfilePage';
import { Test } from './pages/Test';

export function App(): JSX.Element {
  return (
    <BrowserRouter>
      <MyGlobalStyle />
      <Routes>
        <Route path="/" element={<Test />} />
        <Route path="/signup" element={<SignUP />} />
        <Route path="/login" element={<Login />} />
        <Route path="/postupload" element={<PostUpload />} />
        <Route path="/profilePage" element={<ProfilePage />} />
        <Route path="/searchmain" element={<SearchMain />} />
        <Route path="/searchbycategory" element={<SearchByCategory />} />
        <Route path="/trendinggroup" element={<SearchTrendingGroup />} />
        <Route path="/trendingtag" element={<SearchTrendingTag />} />
        <Route path="/trendingfolder" element={<SearchTrendingFolder />} />
      </Routes>
    </BrowserRouter>
  );
}
