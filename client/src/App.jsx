import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home, Login, NotFoundPage } from "./components";

const App = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
