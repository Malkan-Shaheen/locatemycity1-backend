import { useState, useEffect } from 'react';
import './Header.css'; // We'll create this CSS file next

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 992);
      // Close menu when resizing to desktop if open
      if (window.innerWidth > 992 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    // Set initial state
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <img src="/logo.png" alt="Logo" className="logo-image" />
            <span>Your Logo</span>
          </div>
          
          {/* Desktop Navigation - visible on larger screens */}
          {!isMobile && (
            <nav className="nav-links">
              <a href="/">Home</a>
              <a href="/about">About Us</a>
              <a href="/contact">Contact Us</a>
            </nav>
          )}
          
          {/* Hamburger Menu - visible on mobile */}
          {isMobile && (
            <div 
              className={`hamburger ${isMenuOpen ? 'open' : ''}`} 
              onClick={toggleMenu}
              aria-label="Menu"
            >
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile Menu - slides down when hamburger is clicked */}
      {isMobile && (
        <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
          <a href="/" onClick={() => setIsMenuOpen(false)}>Home</a>
          <a href="/about" onClick={() => setIsMenuOpen(false)}>About Us</a>
          <a href="/contact" onClick={() => setIsMenuOpen(false)}>Contact Us</a>
        </div>
      )}
    </header>
  );
};

export default Header;