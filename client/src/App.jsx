import React from 'react';
import { Routes, Route } from 'react-router-dom';

import DocumentImport from './components/DocumentImport';
import ImageImport from './components/ImageImport';
import PDFImport from './components/PDFImport';
import Index from './components/Index';
import Header from './components/Header';
import PdfView from './components/PdfView';
import ClientPage from './components/ClientPage';
import SupplierPage from './components/SupplierPage';
import ContactPage from './components/ContactPage';

const App = () => {
  return (
    <div className="App">
      <Header />
      <div className="AppContent">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/image" element={<ImageImport />} />
          <Route path="/document" element={<DocumentImport />} />
          <Route path="/pdf" element={<PDFImport />} />
          <Route path="/getpdf" element={<PdfView />} />
          <Route path="/client" element={<ClientPage />} />
          <Route path="/supplier" element={<SupplierPage />} />
          <Route path="/contact" element={<ContactPage />} />


        </Routes>
      </div>
    </div>
  );
};

export default App;
