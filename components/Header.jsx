'use client';
import React, { useState } from 'react';

const Header = () => {
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
            .nav-links a {
                min-width: 120px;
                padding: 10px 15px;
                font-size: 0.9rem;
            }
            
            .logo {
                font-size: 1.5rem;
            }
        }

        @media (max-width: 768px) {
            .container {
                padding: 1rem;
            }

            .logo {
                font-size: 1.2rem;
                gap: 10px;
            }

            .logo-image {
                height: 30px;
                width: 30px;
            }
            
            .nav-links {
                gap: 10px;
            }
            
            .nav-links a {
                min-width: 100px;
                height: 40px;
                padding: 8px 12px;
                font-size: 0.8rem;
            }
        }

        @media (max-width: 480px) {
            header {
                height: 70px;
            }

            .logo {
                font-size: 1rem;
            }
            
            .nav-links a {
                min-width: 80px;
                height: 35px;
                padding: 5px 8px;
                font-size: 0.7rem;
            }
            
            .locate-city {
                display: none;
            }
        }
      `}</style>

      <header>
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <img src="/Images/logo.png" alt="Logo" className="logo-image" />
              <span>Your Logo</span>
            </div>

            <nav className="nav-links">
              <a href="/">Home</a>
              <a href="/about" className="locate-city">Locate My City</a>
              <a href="/contact">Contact</a>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;