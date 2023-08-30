import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// pages
import { SignUP } from './pages/SignUpPage';
import { Login } from './pages/LoginPage';
import { PostUpload } from './pages/PostUpload';
import { MyGlobalStyle } from './style/GlobalStyle';
import { SearchMain } from './pages/search/SearchMainPage';
import { SearchHistory } from './pages/search/SearchHistoryPage';
import { SearchByCategory } from './pages/search/SearchByCategoryPage';

function App() {
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
        <Link to="/searchmain">
          <button>(메인 검색 페이지)</button>
        </Link>
        <Link to="/searchhistory">
          <button>(검색 결과 기록 페이지)</button>
        </Link>
        <Link to="/searchbycategory">
          <button>(상세 검색 페이지)</button>
        </Link>

        <Routes>
          <Route path="/signup" element={<SignUP />} />
          <Route path="/login" element={<Login />} />
          <Route path="/postupload" element={<PostUpload />} />
          <Route path="/searchmain" element={<SearchMain />} />
          <Route path="/searchhistory" element={<SearchHistory />} />
          <Route path="/searchbycategory" element={<SearchByCategory />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
