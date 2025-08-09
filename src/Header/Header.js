
import React, { useState, useEffect, useRef } from 'react';
import './Header.css';
import logoImg from './../images/Logoo.png';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };


  useEffect(() => {
  const handleUserActivity = (event) => {
    // If click/touch is inside the menu or hamburger, do nothing
    if (menuRef.current && menuRef.current.contains(event.target)) {
      return;
    }
    closeMobileMenu();
  };

  if (isMobileMenuOpen) {
    document.addEventListener('mousedown', handleUserActivity);
    document.addEventListener('touchstart', handleUserActivity);
    window.addEventListener('scroll', closeMobileMenu);
    window.addEventListener('keydown', closeMobileMenu);
  }

  return () => {
    document.removeEventListener('mousedown', handleUserActivity);
    document.removeEventListener('touchstart', handleUserActivity);
    window.removeEventListener('scroll', closeMobileMenu);
    window.removeEventListener('keydown', closeMobileMenu);
  };
}, [isMobileMenuOpen]);



  return (
    <header className="custom-header">
      <div className="header-inner">
        <div className="header-left">
          <img src={logoImg} alt="Logo" className="logo-img" />
        </div>
        <div className="header-right" ref={menuRef}>
          {/* Desktop Navigation */}
          <nav className="nav desktop-nav">
            <button className="nav-link active" onClick={() => console.log('Home clicked')}>Home</button>
            <button className="nav-link" onClick={() => console.log('BlackPrint clicked')}>The BlackPrint</button>
            <button className="nav-link" onClick={() => console.log('Contact clicked')}>Contact Us</button>
          </nav>
          <button className="lineage-button desktop-lineage">
            Lineage 1865 <span className="cart-icon">🛒</span>
          </button>

          {/* Mobile Hamburger Icon */}
          <button 
            className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`} 
            onClick={(e) => {
              e.stopPropagation(); // Prevent the click from bubbling to document
              toggleMobileMenu();
            }}
            aria-label="Menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="mobile-menu">
              <nav className="nav mobile-nav">
                <button 
                  className="nav-link active" 
                  onClick={() => {
                    console.log('Home clicked');
                    closeMobileMenu();
                  }}
                >
                  Home
                </button>
                <button 
                  className="nav-link" 
                  onClick={() => {
                    console.log('BlackPrint clicked');
                    closeMobileMenu();
                  }}
                >
                  The BlackPrint
                </button>
                <button 
                  className="nav-link" 
                  onClick={() => {
                    console.log('Contact clicked');
                    closeMobileMenu();
                  }}
                >
                  Contact Us
                </button>
              </nav>
              <button 
                className="lineage-button mobile-lineage"
                onClick={() => {
                  console.log('Lineage clicked');
                  closeMobileMenu();
                }}
              >
                Lineage 1865 <span className="cart-icon">🛒</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;