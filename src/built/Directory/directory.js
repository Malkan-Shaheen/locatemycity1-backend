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
    text: `The entry-level tier designed for businesses looking to establish their presence and gain early access to Project Black's growing network.\n\nBenefits:\n• Business listing in the Directory on GoProjectBlack.com\n• Exposure to an engaged audience and exclusive early access opportunities\n• Social media highlights to drive traffic to your business\n• Recognition in the Founders Circle as an early supporter\n\nWelcome package: The Trailblazer Innovator Edition\n\nEarly Bird Rate: $50 (50% off, will increase to $100 after launch)`
  },
  {
    image: require('./../../images/man.png'),
    icon: require('./../../images/icon2.png'),
    title: "Growth Phase",
    price: "$50 (Limited Time) / Annum",
    text: `Designed for business owners looking for a competitive edge and deeper engagement within Project Black.\n\nBenefits:\nAll Trailblazer perks included\nEarly access to platform launches and events\nExclusive discounts with partner brands\nFounders Circle recognition with permanent listing\nPrivate networking with Black 100 members\nPriority spotlights for your business on the platform\n\nWelcome package: The Black Box Innovator Edition\n\nPay-in-Full Bonus:\nOne additional social media feature (extra promotion across Project Black's platforms)`
  },
  {
    image: require('./../../images/woman.png'),
    icon: require('./../../images/icon3.png'),
    title: "Established Root",
    price: "$50 (Limited Time) / Annum",
    text: `For entrepreneurs and business leaders ready to scale and position themselves as industry trailblazers.\n\nBenefits:\nAll Innovator perks included\nVIP platform feature with top-tier directory placement\nDedicated business highlight feature and media exposure\nSpeaking and interview opportunities within Project Black's network\nPriority introductions to potential partners and investors\n\nBusiness Makeover Package:\nDirectory listing with feature write-up\nInstagram highlight and social media boost\nCustom promotional reel creation for business marketing\n\nWelcome package: The Black Box Visionary Edition\n\nPayment Plan Option:\n2 Monthly Payments of $1,300 OR\n3 Monthly Payments of $875\n\nPay-in-Full Bonus:\nExclusive interview feature on Project Black's blog and social media platforms`
  },
  {
    image: require('./../../images/crown.png'),
    icon: require('./../../images/icon4.png'),
    title: "Harvesting Change",
    price: "$50 (Limited Time) / Annum",
    text: `An exclusive tier for pioneers committed to shaping the future of Black business, media, and culture.\n\nBenefits:\nAll Visionary perks included\nOfficial recognition as a Project Black Legend\nPersonalized business strategy session with tailored growth recommendations\nFeatured on Project Black's media platforms for increased visibility\nEarly access to international Black-owned business initiatives\n\nThe Ultimate Business Makeover Package:\nPremium directory listing with front-page article and interview\nPermanent social media feature across multiple platforms\nOne-on-one branding consultation\nHigh-quality professional video production for business promotion\n\nWelcome package: The Black Box Legend Edition\n\nPayment Plan Option:\n3 Monthly Payments of $1,750 OR\n6 Monthly Payments of $900\n\nPay-in-Full Bonus:\nFeature in Project Black's Exclusive Business Spotlight Video Series (professionally curated and shared across platforms)`
  }
];


const Directory = () => {
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef(null);
  const carouselRef = useRef(null);

  // Scroll sync: whenever mouse wheel in section → scroll image
useEffect(() => {
  const section = sectionRef.current;
  const carousel = carouselRef.current;

  if (!section || !carousel) return;

  let isScrolling = false;
  let lastScrollTime = 0;
  let isHovering = false;

  const handleMouseEnter = () => {
    isHovering = true;
  };

  const handleMouseLeave = () => {
    isHovering = false;
  };

  const handleWheel = (e) => {
    if (!isHovering) return; // ignore scrolls outside the section

    const now = Date.now();
    const timeDiff = now - lastScrollTime;

    e.preventDefault(); // stop global scroll

    if (isScrolling && timeDiff < 400) return;
    isScrolling = true;
    lastScrollTime = now;

    const scrollStep = 435 + 20;
    const direction = e.deltaY > 0 ? 1 : -1;

    const newScrollTop = carousel.scrollTop + direction * scrollStep;
    carousel.scrollTo({
      top: newScrollTop,
      behavior: 'smooth'
    });

    setTimeout(() => {
      isScrolling = false;
    }, 400);
  };

  section.addEventListener('mouseenter', handleMouseEnter);
  section.addEventListener('mouseleave', handleMouseLeave);
  window.addEventListener('wheel', handleWheel, { passive: false });

  return () => {
    section.removeEventListener('mouseenter', handleMouseEnter);
    section.removeEventListener('mouseleave', handleMouseLeave);
    window.removeEventListener('wheel', handleWheel);
  };
}, []);


  // Current image highlight observer
  useEffect(() => {
    const options = {
      root: document.querySelector('.image-carousel-container'),
      threshold: 0.6,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.dataset.index);
          setCurrent(index);
        }
      });
    }, options);

    const imageElements = document.querySelectorAll('.carousel-image-wrapper');
    imageElements.forEach((el) => observer.observe(el));

    return () => {
      imageElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

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
                <div className="directory-price">{contentList[current].price}</div>
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
            {/* Clone last for infinite scroll loop */}
            <div 
              className="carousel-image-wrapper" 
              data-index={contentList.length - 1}
            >
              <img src={contentList[contentList.length - 1].image} alt="Visual" className="carousel-image" />
            </div>

            {contentList.map((item, index) => (
              <div
                key={index}
                className="carousel-image-wrapper"
                data-index={index}
              >
                <img src={item.image} alt="Visual" className="carousel-image" />
              </div>
            ))}

            {/* Clone first */}
            <div 
              className="carousel-image-wrapper" 
              data-index={0}
            >
              <img src={contentList[0].image} alt="Visual" className="carousel-image" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Directory;
