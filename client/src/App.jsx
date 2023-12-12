
import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation, Navigate, useNavigate } from 'react-router-dom';


import DocumentImport from './components/DocumentImport';


const App = () => {



  return (
    <div className="App">
      <h1>React File Upload Example</h1>
      <Routes>
            <Route path="/" element={<DocumentImport />} />
      </Routes> 

    </div>
  );
}

export default App;