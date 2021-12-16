import React from 'react';
import ReactDOM from 'react-dom';
import { Dropzone } from './components/Dropzone'
import { Frontpage } from './components/Frontpage'
import { Securities } from './components/Securities'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Crypto } from './components/Crypto'

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Frontpage />} />
      <Route path="maol" element={<Dropzone handleFiles={() => console.log("hyvä elämä")} zoneHeight={400} />} />
      <Route path="securities" element={<Securities />} />
      <Route path="crypto" element={<Crypto />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
