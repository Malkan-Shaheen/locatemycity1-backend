// MerchSection.jsx
import React, { useState, useEffect } from 'react';
import './mission.css'; // Default desktop styles
import './mission1.css'; // Mobile styles
import hoodie from './../images/hoodie.png';
import hoodieHover from './../images/Hhoodie.png';
import journal from './../images/book.png';
import journalHover from './../images/Hbook.png';
import tshirt from './../images/shirt.png';
import tshirtHover from './../images/Hshirt.png';
import { FaArrowRight } from 'react-icons/fa';

const products = [
  {
    id: 1,
    name: 'Heritage Drip',
    descr: 'Shop Now!',
    img: hoodie,
    hoverImg: hoodieHover,
  },
  {
    id: 2,
    name: 'Heritage Drip',
    descr: 'Shop Now!',
    img: journal,
    hoverImg: journalHover,
  },
  {
    id: 3,
    name: 'Heritage Drip',
    descr: 'Shop Now!',
    img: tshirt,
    hoverImg: tshirtHover,
  },
];

export default function Mission() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 1023);
    };

    // Initial check
    checkScreenSize();

    // Add event listener
    window.addEventListener('resize', checkScreenSize);

    // Clean up
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <section className={`merch-section ${isMobile ? 'mobile-layout' : 'desktop-layout'}`}>
      <div className="merch-heading">
        <div className="merch-text-wrapper">
          <h2>Wear The Mission. Fuel The Movement</h2>
          <p>
            This isn't just merch — it's a message. Every hoodie, journal, and tee
            supports the legacy we're building together.<br />
            The Leniage8185 brand is where culture meets purpose.
          </p>
          <span><em>Shop With Meaning. Invest In The Movement</em></span>
        </div>
      </div>

      <div className="merch-grid">
        {products.map((product, index) => (
          <div
            key={product.id}
            className={`merch-card ${hoveredIndex === index ? 'hovered' : ''}`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <img
              src={hoveredIndex === index ? product.hoverImg : product.img}
              alt={product.name}
              className="merch-image"
            />
            <div className="merch-info">
              <h3>{product.name}</h3>
              <div className="merch-descr">
                <p>{product.descr}</p>
                <FaArrowRight className="arrow-icon" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}