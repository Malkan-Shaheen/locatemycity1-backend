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
    text: `The entry-level tier designed for businesses looking to establish their presence and gain early access to Project Black's growing network.

Benefits:
Business listing in the Directory on GoProjectBlack.com
Exposure to an engaged audience and exclusive early access opportunities
Social media highlights to drive traffic to your business
Recognition in the Founders Circle as an early supporter

Welcome package: The Trailblazer Innovator Edition

Early Bird Rate: $50 (50% off, will increase to $100 after launch)
`
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
One additional social media feature (extra promotion across Project Black's platforms)

`
  },
  {
    image: require('./../../images/woman.png'),
    icon: require('./../../images/icon3.png'),
    title: "Established Root",
    price: "$50 (Limited Time) / Annum",
    text: `For entrepreneurs scaling up and ready to lead the culture.

Benefits:
	•	All Pillar perks included
	•	VIP platform + directory feature
	•	Business spotlight & media exposure
	•	Speaking/interview opportunities
	•	Priority brand/investor intros
…and more

Extras:
Business Makeover Package
	•	Feature write-up & promo reel
	•	IG highlight & social media boost

Welcome Package:
The Black Box — Flame Edition

`
  },
  {
    image: require('./../../images/crown.png'),
    icon: require('./../../images/icon4.png'),
    title: "Harvesting Change",
    price: "$50 (Limited Time) / Annum",
    text: `For pioneers shaping the future of Black business & media.

Benefits:
	•	All Flame perks included
	•	Official "Legend" recognition
	•	Strategy session + growth plan
	•	Global initiative access
	•	Featured across Project Black media
…and more

Extras:
Ultimate Business Makeover Package
	•	Premium front-page listing + interview
	•	Permanent social spotlight
	•	Pro video shoot + brand consult

Welcome Package:
The Black Box — Crown Edition`
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
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Join the movement
        </motion.h1>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Fueling the Future of Black Innovation
        </motion.h3>
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