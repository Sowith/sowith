import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//pages
import { SignUP } from "./pages/SignUpPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUP />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
