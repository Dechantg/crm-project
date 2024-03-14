

import React from 'react';
import { Link } from 'react-router-dom';

const routes = [
  { path: '/document', text: 'CSV and Excel Upload' },
  { path: '/image', text: 'Image Upload' },
  { path: '/pdf', text: 'PDF Upload' },
  { path: '/clientimport', text: 'Client Upload' },




];

const IndexPage = () => {
  return (
    <div>
      <h1>Index Page</h1>
      {routes.map((route, index) => (
        <div key={index}>
          <Link to={route.path}>
            <button>{route.text}</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default IndexPage;