
import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation, Navigate, useNavigate } from 'react-router-dom';


import DocumentImport from './components/DocumentImport';
import ImageImport from './components/ImageImport';
import PdfImport from './components/PDFImport'
import Index from './components/Index'
import Header from './components/Header';

const App = () => {
  return (
    <div className="App">
      <Header />
      <h1>React File Upload Example</h1>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/document" element={<DocumentImport />} />
        <Route path="/image" element={<ImageImport />} />
        <Route path="/pdf" element={<PdfImport />} />
      </Routes>
    </div>
  );
};

export default App;