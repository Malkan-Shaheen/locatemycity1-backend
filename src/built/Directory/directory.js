import React, { useState, useEffect, useRef } from 'react';
import './directory.css';
import { motion } from 'framer-motion';

// Utility function to safely access window
const isBrowser = () => typeof window !== 'undefined';

// Utility function to get scroll position safely
const getScrollY = () => {
  if (!isBrowser()) return 0;
  return window.scrollY || document.documentElement.scrollTop || 0;
};


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
];


const Directory = () => {
  const sectionRef = useRef(null);
  // Initialize with stable ref array
  const triggersRef = useRef(new Array(contentList.length).fill(null));
  const [activePanel, setActivePanel] = useState('panel1');
  const [previousPanel, setPreviousPanel] = useState(null);
  const [scrollDirection, setScrollDirection] = useState('up');
  const [isScrolling, setIsScrolling] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const prevScrollY = useRef(0);
  const scrollTimeout = useRef(null);

  // Client-side detection effect
  useEffect(() => {
    setIsClient(true);
    if (isBrowser()) {
      prevScrollY.current = getScrollY();
    }
  }, []);

  useEffect(() => {
    if (!isClient) return; // Don't run on server-side
    
    const handleScroll = (entries) => {
      console.log('Scroll entries:', entries.length);
      
      // Find the entry with the highest intersection ratio
      let bestEntry = null;
      let maxRatio = 0;
      
      entries.forEach((entry) => {
        console.log('Entry:', entry.target.dataset.panel, 'intersecting:', entry.isIntersecting, 'ratio:', entry.intersectionRatio);
        
        if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio;
          bestEntry = entry;
        }
      });
      
      if (bestEntry && maxRatio > 0.3) { // Only switch with significant intersection
        if (!isBrowser()) return; // Safety check
        
        const currentScrollY = getScrollY();
        const direction = currentScrollY > prevScrollY.current ? 'down' : 'up';
        
        setScrollDirection(direction);
        prevScrollY.current = currentScrollY;
        
        const newPanel = bestEntry.target.dataset.panel;
        console.log('Best panel candidate:', newPanel, 'with ratio:', maxRatio, 'direction:', direction);
        
        // Allow panel switching based on scroll direction and intersection ratio
        if (newPanel && newPanel !== activePanel) {
          console.log('Switching to panel:', newPanel);
          setIsScrolling(true);
          setPreviousPanel(activePanel);
          setActivePanel(newPanel);
          
          // Clear any existing timeout
          if (scrollTimeout.current) {
            clearTimeout(scrollTimeout.current);
          }
          
          // Set timeout to allow next scroll after animation completes
          scrollTimeout.current = setTimeout(() => {
            console.log('Reset scrolling state');
            setIsScrolling(false);
          }, 600); // Reduced timeout for better responsiveness
        }
      }
    };

    const observer = new IntersectionObserver(handleScroll, {
      root: null,
      threshold: [0.1, 0.3, 0.5, 0.7, 0.9], // Multiple thresholds for better detection
      rootMargin: '0px 0px 0px 0px' // No margin to get exact intersections
    });

    // Copy the current triggers to avoid stale closure
    const currentTriggers = [...triggersRef.current];
    
    currentTriggers.forEach((trigger) => {
      if (trigger) {
        observer.observe(trigger);
      }
    });

    return () => {
      currentTriggers.forEach((trigger) => {
        if (trigger) observer.unobserve(trigger);
      });
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [activePanel, isScrolling, isClient]);

  const handleLogoClick = (panelId) => {
    if (!isClient) return; // Don't run on server-side
    
    setActivePanel(panelId);
    const trigger = triggersRef.current.find(el => el?.dataset.panel === panelId);
    if (trigger && isBrowser()) {
      trigger.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Add this useEffect to handle scroll end detection
  useEffect(() => {
    if (!isClient) return; // Don't run on server-side
    
    const handleScrollEnd = () => {
      setIsScrolling(false);
    };
    
    // Use both scrollend (modern) and timeout fallback
    let scrollTimer;
    const handleScroll = () => {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(handleScrollEnd, 150);
    };
    
    if (isBrowser()) {
      // Try modern scrollend event first
      if ('onscrollend' in window) {
        window.addEventListener('scrollend', handleScrollEnd);
      } else {
        // Fallback for browsers without scrollend
        window.addEventListener('scroll', handleScroll, { passive: true });
      }
    }
    
    return () => {
      if (isBrowser()) {
        if ('onscrollend' in window) {
          window.removeEventListener('scrollend', handleScrollEnd);
        } else {
          window.removeEventListener('scroll', handleScroll);
        }
      }
      clearTimeout(scrollTimer);
    };
  }, [isClient]);

  // Don't render scroll-dependent features on server-side
  if (!isClient) {
    return (
      <div className="directory-section" ref={sectionRef}>
        <div className="panel-section">
          <div className="content-area">
            <div className="panel-display">
              <div className="directory-heading">
                <h1>Join the movement</h1>
                <h3>Fueling the Future of Black Innovation</h3>
              </div>
              <div className="text-content-container">
                <div className="text-slide active">
                  <h2>{contentList[0].title}</h2>
                  <p>
                    {contentList[0].text.split('\n').map((line, i) => (
                      <span key={i}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </p>
                  <button className="join-btn">Join Now</button>
                </div>
              </div>
              <div className="image-container">
                <div className="image-slide active">
                  <img
                    src={contentList[0].image}
                    alt="Slide 1"
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="directory-section" ref={sectionRef}>
      <div className="scroll-triggers">
        {contentList.map((_, index) => (
          <div
            key={`trigger-${index}`}
            className="scroll-trigger"
            data-panel={`panel${index + 1}`}
            ref={(el) => {
              triggersRef.current[index] = el;
            }}
          />
        ))}
      </div>

      <div className="panel-section">
        <div className="logo-nav">
          {contentList.map((item, index) => (
            <div
              key={`panel${index + 1}`}
              className={`logo-item1 ${activePanel === `panel${index + 1}` ? 'active' : ''}`}
              data-panel={`panel${index + 1}`}
              onClick={() => handleLogoClick(`panel${index + 1}`)}
            >
              <img src={item.icon} alt={`Icon ${index + 1}`} />
            </div>
          ))}
        </div>

        <div className="content-area">
          <div className="panel-display">
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
            <div className="text-content-container">
              {contentList.map((item, index) => (
                <div
                  key={`text-panel${index + 1}`}
                  className={`text-slide ${activePanel === `panel${index + 1}` ? 'active' : ''}`}
                  data-panel={`panel${index + 1}`}
                >
                  <h2>{item.title}</h2>
                  <p>
                    {item.text.split('\n').map((line, i) => (
                      <span key={i}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </p>
                  <button className="join-btn">Join Now</button>
                </div>
              ))}
            </div>

            <div className="image-container">
              {contentList.map((item, index) => {
                const panelId = `panel${index + 1}`;
                const isActive = activePanel === panelId;
                const currentIndex = parseInt(activePanel.replace('panel', '')) - 1;
                const isScrollingDown = scrollDirection === 'down';
                const isBeforeCurrent = index < currentIndex;
                const isAfterCurrent = index > currentIndex;

                return (
                  <motion.div
                    key={`img-${panelId}`}
                    className={`image-slide ${isActive ? 'active' : ''}`}
                    data-panel={panelId}
                    initial={false}
                    animate={{
                      y: isActive ? '0%' : 
                         (isScrollingDown 
                           ? (isBeforeCurrent ? '-100%' : '100%')
                           : (isAfterCurrent ? '100%' : '-100%')),
                      opacity: isActive ? 1 : 0,
                    }}
                    transition={{
                      y: { 
                        duration: 0.7,
                        ease: [0.22, 1, 0.36, 1]
                      },
                      opacity: { duration: 0.3 }
                    }}
                    style={{
                      zIndex: isActive ? contentList.length : contentList.length - index - 1,
                      position: 'absolute',
                    }}
                  >
                    <motion.img
                      src={item.image}
                      alt={`Slide ${index + 1}`}
                      initial={{ y: isScrollingDown ? -50 : 50 }}
                      animate={{ y: 0 }}
                      transition={{ 
                        duration: 0.7,
                        ease: [0.22, 1, 0.36, 1]
                      }}
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Directory;