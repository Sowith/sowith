import React from "react";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// pages
import { SignUP } from "./pages/SignUpTS";
import { Login } from "./pages/LoginPage";
import { PostUpload } from "./pages/PostUpload";
import { MyGlobalStyle } from "./style/GlobalStyle";
import { Search } from './pages/search/SearchPage';
import { Search2 } from './pages/search/SearchPage2';
import { SearchWithAccount } from './pages/search/SearchWithAccountPage';
import { SearchWithFolder } from './pages/search/SearchWithFolderPage';
import { SearchWithGroup } from './pages/search/SearchWithGroupPage';
import { SearchWithPost } from './pages/search/SearchWithPostPage';
import { SearchWithTag } from './pages/search/SearchWithTagPage';

export function App(): JSX.Element {
  return (
    <BrowserRouter>
      <MyGlobalStyle />
      <div>
        <Link to="/signup">
          <button>회원가입 페이지</button>
        </Link>
        <Link to="/login">
          <button>로그인 페이지</button>
        </Link>
        <Link to="/postupload">
          <button>게시물 작성 페이지</button>
        </Link>
        <Link to="/search">
          <button>(검색페이지)</button>
        </Link>
        <Link to="/search2">
          <button>(검색페이지2)</button>
        </Link>
        <Link to="/searchwithaccount">
          <button>(검색 / 계정)</button>
        </Link>
        <Link to="/searchwithfolder">
          <button>(검색 / 폴더)</button>
        </Link>
        <Link to="/searchwithgroup">
          <button>(검색 / 그룹)</button>
        </Link>
        <Link to="/searchwithpost">
          <button>(검색 / 게시물)</button>
        </Link>
        <Link to="/searchwithgroup">
          <button>검색페이지/그룹</button>
        </Link>
        <Link to="/searchwithtag">
          <button>(검색 / 태그)</button>
        </Link>

        <Routes>
          <Route path="/signup" element={<SignUP />} />
          <Route path="/login" element={<Login />} />
          <Route path="/postupload" element={<PostUpload />} />
          <Route path="/search" element={<Search />} />
          <Route path="/search2" element={<Search2 />} />
          <Route path="/searchwithaccount" element={<SearchWithAccount />} />
          <Route path="/searchwithfolder" element={<SearchWithFolder />} />
          <Route path="/searchwithgroup" element={<SearchWithGroup />} />
          <Route path="/searchwithpost" element={<SearchWithPost />} />
          <Route path="/searchwithtag" element={<SearchWithTag />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

