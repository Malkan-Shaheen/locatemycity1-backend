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
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  const navigateAndCloseMenu = useCallback((url) => {
    setMenuOpen(false);
    window.location.href = url;
  }, []);

  if (!mounted) return null;

  return (
    <>
      <style>{`
        header {
            width: 100%;
            background: #3bb5fd;
            position: relative;
            overflow: hidden;
            z-index: 1;
            padding: 0;
            min-height: 70px;
            display: flex;
            align-items: center;
        }

        .container {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 16px;
            position: relative;
        }

        .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            position: relative;
            z-index: 2;
        }

        .logo {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: clamp(1.2rem, 4vw, 1.8rem);
            font-weight: 700;
            background: linear-gradient(90deg, #ffffff, #e0e0e0);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            padding: 0.5rem 0;
        }

        .logo-image {
            border-radius: 50%;
            filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
            height: 32px;
            width: 32px;
            object-fit: contain;
        }

        .nav-links {
            display: flex;
            gap: 10px;
        }

        .nav-links a {
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            color: white;
            text-decoration: none;
            font-weight: 600;
            padding: 0.5rem 1rem;
            border-radius: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            min-width: 100px;
            height: 40px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            border: 1px solid rgba(255, 255, 255, 0.2);
            position: relative;
            overflow: hidden;
            font-size: 0.9rem;
        }

        .nav-links a::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, #3bb5fd, transparent);
            transition: 0.5s;
        }

        .nav-links a:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
            background: rgba(255, 255, 255, 0.25);
        }

        .nav-links a:hover::before {
            left: 100%;
        }

        .hamburger {
            display: none;
            cursor: pointer;
            width: 32px;
            height: 32px;
            position: relative;
            background: transparent;
            border: none;
            padding: 0;
            z-index: 10;
            margin: 0 16px 0 0;
        }

        .hamburger span {
            display: block;
            position: absolute;
            height: 2px;
            width: 24px;
            background: white;
            border-radius: 3px;
            opacity: 1;
            left: 4px;
            transform: rotate(0deg);
            transition: .25s ease-in-out;
        }

        .hamburger span:nth-child(1) {
            top: 10px;
        }

        .hamburger span:nth-child(2) {
            top: 16px;
        }

        .hamburger span:nth-child(3) {
            top: 22px;
        }

        .hamburger.open span:nth-child(1) {
            top: 16px;
            transform: rotate(45deg);
        }

        .hamburger.open span:nth-child(2) {
            opacity: 0;
        }

        .hamburger.open span:nth-child(3) {
            top: 16px;
            transform: rotate(-45deg);
        }

        .mobile-menu {
            position: fixed;
            top: 70px;
            right: 0;
            width: auto;
            min-width: 180px;
            background: rgba(59, 181, 253, 0.98);
            padding: 0.5rem;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
            border-radius: 0 0 0 15px;
            opacity: 0;
            pointer-events: none;
            transform: translateX(100%);
            transition: transform 0.3s ease, opacity 0.3s ease;
            z-index: 9999;
            display: flex;
            flex-direction: column;
            gap: 8px;
            font-weight: 600;
        }

        .mobile-menu.open {
            opacity: 1;
            pointer-events: auto;
            transform: translateX(0);
        }

        .mobile-menu a {
            color: white;
            text-decoration: none;
            background: rgba(255, 255, 255, 0.1);
            padding: 10px 16px;
            border-radius: 6px;
            transition: background 0.3s ease;
            white-space: nowrap;
            width: 100%;
            box-sizing: border-box;
        }

        .mobile-menu a:hover {
            background: rgba(255, 255, 255, 0.3);
        }

        @media (max-width: 992px) {
            .nav-links {
                display: none;
            }
            .hamburger {
                display: block;
            }
        }

        @media (max-width: 768px) {
            .container {
                padding: 0 16px;
            }
            .logo {
                margin-left: 0;
            }
            .logo h2 {
                display: none;
            }
            .logo-image {
                height: 32px;
                width: 32px;
            }
            .hamburger {
                margin-right: 0;
            }
        }

        @media (max-width: 480px) {
            .mobile-menu {
                min-width: 160px;
                padding: 0.5rem;
                font-size: 0.9rem;
            }
        }
      `}</style>

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
                decoding="async"
              />
              <h2>LocateMyCity</h2>
            </div>

            <nav className="nav-links" aria-label="Main navigation">
              <a href="/">Home</a>
              <a href="/about">About Us</a>
              <a href="/contact">Contact Us</a>
            </nav>

            <button
              ref={hamburgerRef}
              className={`hamburger ${menuOpen ? 'open' : ''}`}
              onClick={toggleMenu}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              type="button"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>

        <div
          ref={menuRef}
          id="mobile-menu"
          className={`mobile-menu ${menuOpen ? 'open' : ''}`}
          role="navigation"
          aria-label="Mobile navigation"
        >
          <a href="/" onClick={() => navigateAndCloseMenu('/')}>Home</a>
          <a href="/about" onClick={() => navigateAndCloseMenu('/about')}>About Us</a>
          <a href="/contact" onClick={() => navigateAndCloseMenu('/contact')}>Contact Us</a>
        </div>
      </header>
    </>
  );
};

export default Header;