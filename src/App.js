import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MyGlobalStyle } from "../src/style/GlobalStyle";

//pages
import { SignUP } from "./pages/SignUpPage";

function App() {
  return (
    <BrowserRouter>
      <MyGlobalStyle />
        <Routes>
          <Route path="/" element={<SignUP />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
