import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// pages
import { SignUP } from './pages/SignUpTS';
import { Login } from './pages/LoginPage';
import { MyGlobalStyle } from './style/GlobalStyle';
import { SearchMain } from './pages/search/SearchMainPage';
import { SearchByCategory } from './pages/search/SearchByCategoryPage';
import { SearchTrendingGroup } from 'pages/search/SearchTrendingGroupPage';
import { SearchTrendingFolder } from 'pages/search/SearchTrendingFolderPage';
import { ProfilePage } from './pages/profile/ProfilePage';
import { ProfileUpdatePage } from "pages/profile/ProfileUpdatePage";
import { ProfileGroupDetailPage } from "./pages/profile/ProfileGroupDetailPage"
import { PostTS } from 'pages/PostTS';
import { SignUpCompletedPage } from 'pages/SignUpCompletedPage';
import { Test } from './pages/Test';

export function App(): JSX.Element {
  return (
    <BrowserRouter>
      <MyGlobalStyle />
      <Routes>
        <Route path="/" element={<Test />} />
        <Route path="/signup" element={<SignUP />} />
        <Route path="/login" element={<Login />} />
        <Route path="/postupload" element={<PostTS/>} />
        <Route path="/profilePage" element={<ProfilePage />} />
        <Route path="/searchmain" element={<SearchMain />} />
        <Route path="/searchbycategory" element={<SearchByCategory />} />
        <Route path="/trendinggroup" element={<SearchTrendingGroup />} />
        <Route path="/trendingfolder" element={<SearchTrendingFolder />} />
        <Route path="/profileUpdatePage" element={<ProfileUpdatePage />} />
        <Route path="/profiledetailPage/:currentStep" element={<ProfileGroupDetailPage />} />
        <Route path="/com" element={<SignUpCompletedPage />} />
      </Routes>
    </BrowserRouter>
  );
}
