import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { MyGlobalStyle } from '../src/style/GlobalStyle';

//pages
import { SignUP } from './pages/SignUpPage';
import { Search } from './pages/search/SearchPage';
import { Search2 } from './pages/search/SearchPage2';
import { SearchWithFolder } from './pages/search/SearchWithFolderPage';
import { SearchWithPost } from './pages/search/SearchWithPostPage';
import { SearchWithAccount } from './pages/search/SearchWithAccountPage';
import { SearchWithTag } from './pages/search/SearchWithTagPage';
import { SearchWithGroup } from './pages/search/SearchWithGroupPage';

function App() {
  return (
    <BrowserRouter>
      <MyGlobalStyle />

      <div>
        <Link to="/signup">
          <button>회원가입 페이지</button>
        </Link>
        <Link to="/search1">
          <button>검색 페이지1</button>
        </Link>
        <Link to="/search2">
          <button>검색 페이지2</button>
        </Link>
        <Link to="/searchwithpost">
          <button>검색 페이지/게시글</button>
        </Link>
        <Link to="/searchwithfolder">
          <button>검색 페이지/폴더</button>
        </Link>
        <Link to="/searchwithaccount">
          <button>검색페이지/계정</button>
        </Link>
        <Link to="/searchwithgroup">
          <button>검색페이지/그룹</button>
        </Link>
        <Link to="/searchwithtag">
          <button>검색페이지/태그</button>
        </Link>
      </div>
      <Routes>
        <Route path="/" element={<SignUP />} />
        <Route path="/signup" element={<SignUP />} />
        <Route path="/search1" element={<Search />}></Route>
        <Route path="/search2" element={<Search2 />}></Route>
        <Route path="/searchwithpost" element={<SearchWithPost />}></Route>
        <Route path="/searchwithfolder" element={<SearchWithFolder />}></Route>
        <Route
          path="/searchwithaccount"
          element={<SearchWithAccount />}
        ></Route>
        <Route path="/searchwithgroup" element={<SearchWithGroup />}></Route>
        <Route path="/searchwithtag" element={<SearchWithTag />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
