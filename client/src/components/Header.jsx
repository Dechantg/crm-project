import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={{ backgroundColor: '#f8f9fa', padding: '10px 0', textAlign: 'center' }}>
      <Link to="/">
        <button>Return to Index</button>
      </Link>
    </header>
  );
};

export default Header;