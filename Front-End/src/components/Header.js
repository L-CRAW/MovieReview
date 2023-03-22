import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, logout, userVersion } = useAuth();

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const dropdownRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [dropdownRef]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [currentUser, userVersion]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light" key={currentUser ? currentUser.username : 'anonymous'}>
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
            {currentUser ? (
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle text-decoration-none text-dark"
                  to="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {currentUser.username}
                </Link>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                  <li>
                    <Link to="/profile" className="dropdown-item">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/upload-review" className="dropdown-item">
                      Upload Review
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={() => logout()}>
                      Log Out
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <li className="nav-item">
                <Link to="/login" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                  Log In
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;