'use client';
import React, { useState, useEffect } from 'react';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

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
            height: 90px;
        }

        .container {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 1rem 2rem;
            position: relative;
            height: 100%;
        }

        .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            position: relative;
            z-index: 2;
            height: 100%;
        }

        .logo {
            display: flex;
            align-items: center;
            gap: 15px;
            font-size: 1.8rem;
            font-weight: 700;
            background: linear-gradient(90deg, #ffffff, #e0e0e0);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            height: 100%;
        }

        .logo-image {
            border-radius: 50%;
            filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
            height: 40px;
            width: 40px;
        }

        .nav-links {
            display: flex;
            gap: 20px;
        }

        .nav-links a {
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            color: white;
            text-decoration: none;
            font-weight: 600;
            padding: 12px 25px;
            border-radius: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            min-width: 150px;
            height: 50px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            border: 1px solid rgba(255, 255, 255, 0.2);
            position: relative;
            overflow: hidden;
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
            width: 30px;
            height: 20px;
            position: relative;
            z-index: 15;
        }

        .hamburger span {
            display: block;
            position: absolute;
            height: 3px;
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
            top: 10px;
        }

        .hamburger span:nth-child(4) {
            top: 20px;
        }

        .hamburger.open span:nth-child(1) {
            top: 10px;
            width: 0%;
            left: 50%;
        }

        .hamburger.open span:nth-child(2) {
            transform: rotate(45deg);
        }

        .hamburger.open span:nth-child(3) {
            transform: rotate(-45deg);
        }

        .hamburger.open span:nth-child(4) {
            top: 10px;
            width: 0%;
            left: 50%;
        }

        /* --- New vertical sidebar menu --- */
        .mobile-menu {
          position: fixed;
          top: 0;
          right: 0;
          width: 120px; /* slim vertical bar */
          height: 90px; /* same as header */
          background: rgba(59, 181, 253, 0.95);
          padding: 10px 0;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
          border-radius: 0 0 0 15px;
          opacity: 0;
          pointer-events: none;
          transform: translateX(100%);
          transition: transform 0.3s ease, opacity 0.3s ease;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-evenly;
          font-weight: 600;
          font-size: 0.85rem;
        }

        .mobile-menu.open {
          opacity: 1;
          pointer-events: auto;
          transform: translateX(0);
        }

        .mobile-menu a {
          color: white;
          text-decoration: none;
          background: transparent;
          padding: 0;
          margin: 0;
          white-space: nowrap;
          line-height: 1.2;
          width: 100%;
          text-align: center;
          border-radius: 0; /* no boxes */
          transition: background 0.3s ease;
        }

        .mobile-menu a:hover {
          background: rgba(255, 255, 255, 0.2);
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
            padding: 1rem;
          }

          .logo {
            font-size: 1.5rem;
          }

          .logo-image {
            height: 30px;
            width: 30px;
          }
        }

        @media (max-width: 480px) {
          header {
            height: 80px;
          }

          .mobile-menu {
            top: 80px;
            width: 110px;
            height: 80px;
            font-size: 0.8rem;
            padding: 8px 0;
          }

          .logo {
            font-size: 10px;
          }
        }

        header::before {
          content: "";
          position: absolute;
          top: -50px;
          left: -50px;
          width: 150px;
          height: 150px;
          background: #3bb5fd;
          border-radius: 50%;
          z-index: -1;
        }

        header::after {
          content: "";
          position: absolute;
          bottom: -80px;
          right: -60px;
          width: 200px;
          height: 200px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 50%;
          z-index: -1;
        }

        .floating-circle {
          position: absolute;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 50%;
          z-index: -1;
          animation: float 15s infinite linear;
        }

        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
          100% {
            transform: translateY(0) rotate(360deg);
          }
        }
      `}</style>

      <header>
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <img src="/Images/cityfav.png" alt="Logo" className="logo-image" />
              <span>Locate My City</span>
            </div>

            <nav className="nav-links">
              <a href="/">Home</a>
              <a href="/about">About Us</a>
              <a href="/contact">Contact Us</a>
            </nav>

            <div
              className={`hamburger ${menuOpen ? 'open' : ''}`}
              onClick={toggleMenu}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') toggleMenu();
              }}
            >
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>

        <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
          <a href="/" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="/about" onClick={() => setMenuOpen(false)}>About Us</a>
          <a href="/contact" onClick={() => setMenuOpen(false)}>Contact Us</a>
        </div>
      </header>
    </>
  );
};

export default Header;
