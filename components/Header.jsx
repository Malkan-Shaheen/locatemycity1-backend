'use client';
import React, { useState, useEffect, useCallback } from 'react';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Close menu when clicking outside
    const handleClickOutside = (e) => {
      if (menuOpen && !e.target.closest('.hamburger') && !e.target.closest('.mobile-menu')) {
        setMenuOpen(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [menuOpen]);

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
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
            min-height: 80px;
            display: flex;
            align-items: center;
        }

        .container {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0.5rem 1rem;
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
        }

        .logo-image {
            border-radius: 50%;
            filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
            height: clamp(30px, 8vw, 40px);
            width: clamp(30px, 8vw, 40px);
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
            width: 24px;
            height: 18px;
            position: relative;
            right: 0;
            z-index: 15;
            background: transparent;
            border: none;
            padding: 0;
        }

        .hamburger span {
            display: block;
            position: absolute;
            height: 2px;
            width: 100%;
            background: white;
            border-radius: 3px;
            opacity: 1;
            left: 0;
            transform: rotate(0deg);
            transition: .25s ease-in-out;
        }

        .hamburger span:nth-child(1) {
            top: 0px;
        }

        .hamburger span:nth-child(2), .hamburger span:nth-child(3) {
            top: 50%;
            transform: translateY(-50%);
        }

        .hamburger span:nth-child(4) {
            bottom: 0px;
        }

        .hamburger.open span:nth-child(1) {
            top: 50%;
            width: 0%;
            left: 50%;
        }

        .hamburger.open span:nth-child(2) {
            transform: translateY(-50%) rotate(45deg);
        }

        .hamburger.open span:nth-child(3) {
            transform: translateY(-50%) rotate(-45deg);
        }

        .hamburger.open span:nth-child(4) {
            bottom: 50%;
            width: 0%;
            left: 50%;
        }

        .mobile-menu {
            position: fixed;
            top: 80px;
            right: 0;
            width: auto;
            min-width: 150px;
            background: rgba(59, 181, 253, 0.98);
            padding: 1rem;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
            border-radius: 0 0 0 15px;
            opacity: 0;
            pointer-events: none;
            transform: translateX(100%);
            transition: transform 0.3s ease, opacity 0.3s ease;
            z-index: 9999;
            display: flex;
            flex-direction: column;
            gap: 10px;
            font-weight: 600;
            align-items: center;
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
            padding: 10px 20px;
            border-radius: 6px;
            text-align: center;
            transition: background 0.3s ease;
            white-space: nowrap;
            width: 100%;
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
                padding: 0.5rem;
            }
            .logo {
                font-size: 1rem;
            }
        }

        @media (max-width: 480px) {
            header {
                min-height: 70px;
            }
            .mobile-menu {
                top: 70px;
                padding: 1rem;
                font-size: 0.9rem;
                border-radius: 0 0 0 12px;
            }
            .logo {
                gap: 8px;
                margin-left: 8px;
            }
            .logo h2 {
                display: none;
            }
            .logo-image {
                height: 36px;
                width: 36px;
            }
            .hamburger {
                margin-right: 8px;
            }
        }
      `}</style>

      <header role="banner">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <img
                src="/Images/cityfav.png"
                alt="Locate My City logo"
                className="logo-image"
                width="40"
                height="40"
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
              <span></span>
            </button>
          </div>
        </div>

        <div
          id="mobile-menu"
          className={`mobile-menu ${menuOpen ? 'open' : ''}`}
          role="navigation"
          aria-label="Mobile navigation"
        >
          <a href="/" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="/about" onClick={() => setMenuOpen(false)}>About Us</a>
          <a href="/contact" onClick={() => setMenuOpen(false)}>Contact Us</a>
        </div>
      </header>
    </>
  );
};

export default Header;