import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

// pages
import { Home } from 'pages/home/HomePage';
import { SignUP } from './pages/SignUpTS';
import { Login } from './pages/LoginPage';
import { MyGlobalStyle } from './style/GlobalStyle';
import { SearchMain } from './pages/search/SearchMainPage';
import { SearchHistory } from 'pages/search/SearchHistoryPage';
import { SearchByCategory } from './pages/search/SearchByCategoryPage';
import { SearchTrendingGroup } from 'pages/search/SearchTrendingGroupPage';
import { SearchTrendingFolder } from 'pages/search/SearchTrendingFolderPage';
import { ProfilePage } from './pages/profile/ProfilePage';
import { ProfileUpdatePage } from 'pages/profile/ProfileUpdatePage';
import { ProfileGroupDetailPage } from './pages/profile/ProfileGroupDetailPage';
import { PostTS } from 'pages/PostTS';
import { SignUpCompletedPage } from 'pages/SignUpCompletedPage';
import { MainPostViewPage } from './pages/main/MainPostViewPage';
import { Test } from './pages/Test';
import { CreateData } from 'components/crud/CreateData';
import { ReadData } from 'components/crud/ReadData';
import { UpdateData } from 'components/crud/UpdateData';
import { DeleteData } from 'components/crud/DeleteData';

export function App(): JSX.Element {
  return (
    // <TestDb/>
    <RecoilRoot>
      <BrowserRouter>
        <MyGlobalStyle />
        <Routes>
          <Route path="/" element={<Test />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<SignUP />} />
          <Route path="/login" element={<Login />} />
          <Route path="/postupload" element={<PostTS />} />
          <Route path="/profilePage" element={<ProfilePage />} />
          <Route path="/searchmain" element={<SearchMain />} />
          <Route
            path="/searchmain/trendingfolder"
            element={<SearchTrendingFolder />}
          />
          <Route
            path="/searchmain/trendinggroup"
            element={<SearchTrendingGroup />}
          />
          <Route path="/searchhistory" element={<SearchHistory />} />
          <Route path="/searchbycategory" element={<SearchByCategory />} />
          <Route path="/profileUpdatePage" element={<ProfileUpdatePage />} />
          <Route
            path="/profiledetailPage/:currentStep"
            element={<ProfileGroupDetailPage />}
          />
          <Route path="/com" element={<SignUpCompletedPage />} />
          <Route path="/mainpostview" element={<MainPostViewPage />} />
          <Route path="/createdata" element={<CreateData />} />
          <Route path="/readdata" element={<ReadData />} />
          <Route path="/updatedata" element={<UpdateData />} />
          <Route path="/deletedata" element={<DeleteData />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}
