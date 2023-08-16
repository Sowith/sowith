import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// pages
import { SignUP } from "./pages/SignUpPage";
import { Login } from "./pages/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Link to="/signup">
          <button>회원가입 페이지</button>
        </Link>
        <Link to="/login">
          <button>로그인 페이지</button>
        </Link>

        <Routes>
          <Route path="/signup" element={<SignUP />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
