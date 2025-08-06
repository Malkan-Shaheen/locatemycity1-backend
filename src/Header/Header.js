import React from 'react';
import './Header.css';
import logoImg from './../images/Logoo.png'; // Use your actual logo image path

const Header = () => {
  return (
    <header className="custom-header">
  <div className="header-inner">
    <div className="header-left">
      <img src={logoImg} alt="Logo" className="logo-img" />
    </div>
    <div className="header-right">
      <nav className="nav">
        <button className="nav-link active" onClick={() => console.log('Home clicked')}>Home</button>
        <button className="nav-link" onClick={() => console.log('BlackPrint clicked')}>The BlackPrint</button>
        <button className="nav-link" onClick={() => console.log('Contact clicked')}>Contact Us</button>
      </nav>
      <button className="lineage-button">
        Lineage 1865 <span className="cart-icon">🛒</span>
       
      </button>
    </div>
  </div>
</header>

  );
};

export default Header;
