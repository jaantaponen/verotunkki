import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Dropzone } from './components/Dropzone'
import FrontPage from './components/Frontpage'
import { Securities } from './components/Securities'
import { BrowserRouter, Route, Routes } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<FrontPage />} />
      <Route path="maol" element={<Dropzone handleFiles={() => console.log("hyvä elämä")}zoneHeight={400}/>} />
      <Route path="securities" element={<Securities />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
