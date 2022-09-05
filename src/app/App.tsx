import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Home } from "src/app/pages/Home";
import { Search } from "src/app/pages/Search";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
