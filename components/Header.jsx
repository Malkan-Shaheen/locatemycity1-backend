'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';


const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const menuRef = useRef(null);
  const hamburgerRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    setMounted(true);

    const handleClickOutside = (e) => {
      if (menuOpen && headerRef.current && !headerRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    const handleScroll = () => {
      if (menuOpen) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [menuOpen]);

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  const handleNavigation = useCallback((e, path) => {
    e.preventDefault();
    setMenuOpen(false);
    // Smooth scroll to section if it's an internal link
    if (path.startsWith('#')) {
      const section = document.querySelector(path);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Regular navigation for other links
      window.location.href = path;
    }
  }, []);

  if (!mounted) return null;

  return (
    <>
     

      <nav aria-label="Skip navigation">
        <a href="#main-content" className="skip-link">Skip to main content</a>
      </nav>
      <header role="banner" ref={headerRef}>
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <img
                src="/Images/cityfav.png"
                alt="Locate My City logo"
                className="logo-image"
                width="32"
                height="32"
                loading="lazy"
              />
              <h2>LocateMyCity</h2>
            </div>

            <nav className="nav-links" aria-label="Main navigation">
              <a href="/" onClick={(e) => handleNavigation(e, '/')}>Home</a>
              <a href="/about" onClick={(e) => handleNavigation(e, '/about')}>About</a>
              <a href="/contact" onClick={(e) => handleNavigation(e, '/contact')}>Contact</a>
            </nav>

            <button
              ref={hamburgerRef}
              className={`hamburger ${menuOpen ? 'open' : ''}`}
              onClick={toggleMenu}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>

        <div
  ref={menuRef}
  className={`mobile-menu ${menuOpen ? 'open' : ''}`}
  aria-hidden={!menuOpen}
>
  <a
    href="/"
    tabIndex={menuOpen ? 0 : -1}
    onClick={(e) => handleNavigation(e, '/')}
  >
    Home
  </a>
  <a
    href="/about"
    tabIndex={menuOpen ? 0 : -1}
    onClick={(e) => handleNavigation(e, '/about')}
  >
    About
  </a>
  <a
    href="/contact"
    tabIndex={menuOpen ? 0 : -1}
    onClick={(e) => handleNavigation(e, '/contact')}
  >
    Contact
  </a>
</div>

      </header>
    </>
  );
};

export default Header;