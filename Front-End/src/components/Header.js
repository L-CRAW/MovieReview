import React, { useState } from 'react';
import { Link } from 'react-router-dom';


function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <img src="/logo.png" alt="Movie Review Logo" width="80" height="auto" />
        </Link>
        <button className="navbar-toggler" type="button" onClick={handleMenuToggle}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/movies" className="nav-link" onClick={() => setIsMenuOpen(false)}>Movies</Link>
            </li>
            <li className="nav-item">
              <Link to="/reviews" className="nav-link" onClick={() => setIsMenuOpen(false)}>Reviews</Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link" onClick={() => setIsMenuOpen(false)}>Log In</Link>
              
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;