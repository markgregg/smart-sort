import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import './index.less';
import { SmartFilter } from './components/SmartSort';
import { SmartFilterAgGrid } from './components/SmartSortAgGrid';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<SmartFilter />} />
        <Route path="/smartfilter" element={<SmartFilter />} />
        <Route path="/smartfilteraggrid" element={<SmartFilterAgGrid />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
