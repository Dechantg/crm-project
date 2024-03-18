

import React from 'react';
import { Link } from 'react-router-dom';

const routes = [
  // { path: '/document', label: 'CSV and Excel Upload' },
  { path: '/image', label: 'Image Upload' },
  // { path: '/pdf', label: 'PDF Upload' },
  { path: '/client', label: 'Client List' },
  { path: '/supplier', label: 'Supplier List' },
  { path: '/contact', label: 'Contact List' },



];

const IndexPage = () => {
  return (
    <div>
      <h1>Index Page</h1>
      {routes.map((route, index) => (
        <div key={index}>
          <Link to={route.path}>
          <br></br>

            <button>{route.label}</button>
          </Link>

        </div>
      ))}
    </div>
  );
};

export default IndexPage;