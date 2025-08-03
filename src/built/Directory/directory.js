// Directory.jsx
import React, { useState, useEffect, useRef } from 'react';
import './directory.css';
import { motion, AnimatePresence } from 'framer-motion';

const contentList = [
  {
    image: require('./../../images/child.png'),
    icon: require('./../../images/icon1.png'),
    title: "The Seed: Planted in the Directory",
    price: "$50 (Limited Time) / Annum",
    text: `Your First Step Into the Ecosystem 
The Seed is  how you claim your place in the culture. 
Whether you’re a brand, creative, or supporter, this entry-level listing gives you visibility, access, 
and community. 

What You Get 
Verified spot in the ProjectBlack Directory (The Black Book)  
Exposure to a culture-driven audience 
Early supporter recognition (Digital badge for social media) 
Member-only updates, events and opportunities`
  },
  {
    image: require('./../../images/man.png'),
    icon: require('./../../images/icon2.png'),
    title: "Growth Phase",
    price: "$50 (Limited Time) / Annum",
    text: `Designed for business owners looking for a competitive edge and deeper engagement within Project Black.

Benefits:
All Trailblazer perks included
Early access to platform launches and events
Exclusive discounts with partner brands
Founders Circle recognition with permanent listing
Private networking with Black 100 members
Priority spotlights for your business on the platform

Welcome package: The Black Box Innovator Edition

Pay-in-Full Bonus:
One additional social media feature (extra promotion across Project Black’s platforms)
`
  },
  {
    image: require('./../../images/woman.png'),
    icon: require('./../../images/icon3.png'),
    title: "Established Root",
    price: "$50 (Limited Time) / Annum",
    text: `For entrepreneurs and business leaders ready to scale and position themselves as industry trailblazers.

Benefits:
All Innovator perks included
VIP platform feature with top-tier directory placement
Dedicated business highlight feature and media exposure
Speaking and interview opportunities within Project Black’s network
Priority introductions to potential partners and investors

Business Makeover Package:
Directory listing with feature write-up
Instagram highlight and social media boost
Custom promotional reel creation for business marketing

Welcome package: The Black Box Visionary Edition

Payment Plan Option:
2 Monthly Payments of $1,300 OR
3 Monthly Payments of $875

Pay-in-Full Bonus:
Exclusive interview feature on Project Black’s blog and social media platforms
`
  },
  {
    image: require('./../../images/crown.png'),
    icon: require('./../../images/icon4.png'),
    title: "Harvesting Change",
    price: "$50 (Limited Time) / Annum",
    text: `An exclusive tier for pioneers committed to shaping the future of Black business, media, and culture.

Benefits:
All Visionary perks included
Official recognition as a Project Black Legend
Personalized business strategy session with tailored growth recommendations
Featured on Project Black’s media platforms for increased visibility
Early access to international Black-owned business initiatives

The Ultimate Business Makeover Package:
Premium directory listing with front-page article and interview
Permanent social media feature across multiple platforms
One-on-one branding consultation
High-quality professional video production for business promotion

Welcome package: The Black Box  Legend Edition

Payment Plan Option:
3 Monthly Payments of $1,750 OR
6 Monthly Payments of $900

Pay-in-Full Bonus:
Feature in Project Black’s Exclusive Business Spotlight Video Series (professionally curated and shared across platforms)`
}
];

const Directory = () => {
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef(null);
  const carouselRef = useRef(null);
  const isScrollingRef = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    const carousel = carouselRef.current;
    if (!section || !carousel) return;

    const scrollStep = 455;

    const handleWheel = (e) => {
      const sectionBounds = section.getBoundingClientRect();
      const isInSection = sectionBounds.top <= 0 && sectionBounds.bottom >= window.innerHeight;

      // Only control scroll if we're in the section
      if (!isInSection) return;

      const direction = e.deltaY > 0 ? 1 : -1;

      // At first image and scrolling up → unlock global scroll
      if (current === 0 && direction === -1) {
        document.body.style.overflow = 'auto';
        return;
      }

      // At last image and scrolling down → unlock global scroll
      if (current === contentList.length - 1 && direction === 1) {
        document.body.style.overflow = 'auto';
        return;
      }

      // Inside Directory section: prevent global scroll
      e.preventDefault();
      document.body.style.overflow = 'hidden';

      if (isScrollingRef.current) return;

      const newIndex = current + direction;
      if (newIndex < 0 || newIndex >= contentList.length) return;

      isScrollingRef.current = true;

      carousel.scrollTo({
        top: newIndex * scrollStep,
        behavior: 'smooth'
      });

      setCurrent(newIndex);

      setTimeout(() => {
        isScrollingRef.current = false;
      }, 800);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      document.body.style.overflow = 'auto';
    };
  }, [current]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const scrollStep = 455;

    const handleCarouselScroll = () => {
      const newIndex = Math.round(carousel.scrollTop / scrollStep);
      if (newIndex !== current) {
        setCurrent(newIndex);
      }
    };

    carousel.addEventListener('scroll', handleCarouselScroll);
    return () => {
      carousel.removeEventListener('scroll', handleCarouselScroll);
    };
  }, [current]);

  return (
    <div className="directory-section" ref={sectionRef}>
      <div className="directory-heading">
        <h1>Join the movement</h1>
        <h3>Fueling the Future of Black Innovation</h3>
      </div>

      <div className="directory-left">
        <div className="side-icons">
          {contentList.map((item, index) => (
            <div
              key={index}
              className={`icon ${index === current ? 'active-icon' : ''}`}
              onClick={() => {
                const el = document.querySelector(`[data-index='${index}']`);
                el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
            >
              <img src={item.icon} alt={`icon-${index}`} className="icon-img" />
            </div>
          ))}
        </div>

        <div className="directory-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="directory-title-price-wrapper">
                <h2 className="directory-title">{contentList[current].title}</h2>
                {/* <div className="directory-price">{contentList[current].price}</div> */}
              </div>
              <p className="directory-text">
                {contentList[current].text.split('\n').map((line, i) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
              <button className="join-btn">Join Now</button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="directory-right">
        <div className="image-carousel-container">
          <div className="image-carousel" ref={carouselRef}>
            {contentList.map((item, index) => (
              <div
                key={index}
                className="carousel-image-wrapper"
                data-index={index}
              >
                <img src={item.image} alt="Visual" className="carousel-image" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Directory;
