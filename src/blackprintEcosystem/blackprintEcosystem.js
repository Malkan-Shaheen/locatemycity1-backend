import React from 'react';
import './blackprintEcosystem.css';

const cards = [
  {
    title: 'The Directory',
    img: '/images/card1.png',
    hoverImg: '/images/hc1.png',
    text: 'A curated digital guide connecting the next wave of Black-owned brands across beauty, business, wellness, tech + more. Search by category, location, or identity and discover The Culture\'s Best.',
  },
  {
    title: 'The Black Card',
    img: '/images/card2.png',
    hoverImg: '/images/hc2.png',
    text: 'A premium membership unlocking exclusive access to partner discounts, events, & networking tools, as well as a first-of-its-kind cultural impact rewards program. All for The Culture. Elevate it.',
  },
  {
    title: 'The Black 100',
    img: '/images/card3.png',
    hoverImg: '/images/hc3.png',
    text: 'Our inaugural list of 100 Creators, Makers, Healers, and Builders changing the game across industries. Stay tuned for your chance to nominate leaders in your life doing the work and making it count.',
  },
  {
    title: 'Events Calendar',
    img: '/images/card4.png',
    hoverImg: '/images/hc4.png',
    text: 'A live, shoppable calendar spotlighting curated Black-owned experiences happening around the country. Don’t miss what’s happening, near or far.',
  },
  {
    title: 'Media Hub',
    img: '/images/card5.png',
    hoverImg: '/images/hc5.png',
    text: 'Highlighting stories, wins, and culture from across our ecosystem. Your go-to destination to see how others are building and making it work for us, by us.',
  },
  {
    title: 'Education & Empowerment',
    img: '/images/card6.png',
    hoverImg: '/images/hc6.png',
    text: 'Virtual and in-person classes + resources to help you launch and scale your ideas. Whether you’re looking to invest, hire, build or grow — we’re here to get you from point A to point Brilliant.',
  },
  {
    title: 'Black Marketplace',
    img: '/images/card7.png',
    hoverImg: '/images/hc7.png',
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