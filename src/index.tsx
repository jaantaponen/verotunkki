import React from 'react';
import ReactDOM from 'react-dom';
import { Frontpage } from './components/Frontpage'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PreviewData } from './components/PreviewData'
ReactDOM.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Routes>
      <Route path="/" element={<Frontpage />} />
      <Route path="securities" element={<PreviewData mode="SECURITY" />} />
      <Route path="crypto" element={<PreviewData mode="CRYPTO" />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
