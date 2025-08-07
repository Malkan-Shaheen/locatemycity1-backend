'use client';
import React, { useState } from 'react';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

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
            z-index: 10;
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

        .mobile-menu {
            position: fixed;
            top: 90px;
            left: 0;
            width: 100%;
            background: #3bb5fd;
            padding: 2rem;
            box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
            transform: translateY(-150%);
            transition: transform 0.3s ease-in-out;
            z-index: 5;
        }

        .mobile-menu.open {
            transform: translateY(0);
        }

        .mobile-menu a {
            display: block;
            background: rgba(255, 255, 255, 0.15);
            color: white;
            text-decoration: none;
            font-weight: 600;
            padding: 15px;
            margin-bottom: 10px;
            border-radius: 50px;
            text-align: center;
            transition: all 0.3s ease;
        }

        .mobile-menu a:hover {
            background: rgba(255, 255, 255, 0.25);
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
            }

            .logo {
                font-size: 1.2rem;
            }
        }
      `}</style>

      <header>
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <img src="logo.png" alt="Logo" className="logo-image" />
              <span>Your Logo</span>
            </div>

            <nav className="nav-links">
              <a href="/">Home</a>
              <a href="/about">About Us</a>
              <a href="/contact">Contact Us</a>
            </nav>

            <div
              className={`hamburger ${menuOpen ? 'open' : ''}`}
              onClick={toggleMenu}
            >
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>

        <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
          <a href="/">Home</a>
          <a href="/about">About Us</a>
          <a href="/contact">Contact Us</a>
        </div>
      </header>
    </>
  );
};

export default Header;
