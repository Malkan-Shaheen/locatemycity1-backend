import React from 'react';
import './blackprintEcosystem.css';

// Import images like in vision.js
import card1 from './../images/card1.png';
import card2 from './../images/card2.png';
import card3 from './../images/card3.png';
import card4 from './../images/card4.png';
import card5 from './../images/card5.png';
import card6 from './../images/card6.png';
import card7 from './../images/card7.png';
import hc1 from './../images/hc1.png';
import hc2 from './../images/hc2.png';
import hc3 from './../images/hc3.png';
import hc4 from './../images/hc4.png';
import hc5 from './../images/hc5.png';
import hc6 from './../images/hc6.png';
import hc7 from './../images/hc7.png';

const cards = [
  {
    title: 'The Directory',
    img: card1,
    hoverImg: hc1,
    text: 'A curated digital guide connecting the next wave of Black-owned brands across beauty, business, wellness, tech + more. Search by category, location, or identity and discover The Culture\'s Best.',
  },
  {
    title: 'The Black Card',
    img: card2,
    hoverImg: hc2,
    text: 'A premium membership unlocking exclusive access to partner discounts, events, & networking tools, as well as a first-of-its-kind cultural impact rewards program. All for The Culture. Elevate it.',
  },
  {
    title: 'The Black 100',
    img: card3,
    hoverImg: hc3,
    text: 'Our inaugural list of 100 Creators, Makers, Healers, and Builders changing the game across industries. Stay tuned for your chance to nominate leaders in your life doing the work and making it count.',
  },
  {
    title: 'Events Calendar',
    img: card4,
    hoverImg: hc4,
    text: 'A live, shoppable calendar spotlighting curated Black-owned experiences happening around the country. Don’t miss what’s happening, near or far.',
  },
  {
    title: 'Media Hub',
    img: card5,
    hoverImg: hc5,
    text: 'Highlighting stories, wins, and culture from across our ecosystem. Your go-to destination to see how others are building and making it work for us, by us.',
  },
  {
    title: 'Education & Empowerment',
    img: card6,
    hoverImg: hc6,
    text: 'Virtual and in-person classes + resources to help you launch and scale your ideas. Whether you’re looking to invest, hire, build or grow — we’re here to get you from point A to point Brilliant.',
  },
  {
    title: 'Black Marketplace',
    img: card7,
    hoverImg: hc7,
    text: 'Your one-stop-shop for discovering and shopping Black-owned brands — from beauty to books to food to fashion. This is where Culture spends with intention.',
  },
];

export default function BlackprintEcosystem() {
  return (
    <div className="bp-wrapper">
      <div className="bp-header">
        <h1 className="bp-header-line">
          <span className="bp-coming">What’s Coming:  </span>
          <span className="bp-blackprint">The Blackprint™</span>
        </h1>
        <p className="bp-subtitle">Our Ecosystem</p>
      </div>
      <div className="bp-grid">
        {cards.map((card, index) => (
          <div key={index} className="bp-card">
            <div className="bp-coming-soon-tag">
              <span>Coming Soon</span>
            </div>
            <div className="bp-card-inner">
              {/* Fixed image container structure */}
              <div className="bp-card-img-container">
                <img 
                  src={card.img} 
                  alt={card.title} 
                  className="bp-card-img-default"
                />
                <img 
                  src={card.hoverImg} 
                  alt={`Hover - ${card.title}`} 
                  className="bp-card-img-hover"
                />
              </div>
              <h2>{card.title}</h2>
              <p>{card.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}