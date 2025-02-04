import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold">
          E-Shop
        </Link>
        <div>
          <Link to="/login" className="text-white px-4">Login</Link>
          <Link to="/register" className="text-white px-4">Register</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
