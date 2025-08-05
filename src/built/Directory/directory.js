import React, { useState, useEffect, useRef } from 'react';
import './directory.css';
import { motion } from 'framer-motion';

console.log('DEBUG: Component loading started - checking if motion is available:', motion ? 'YES' : 'NO');
console.log('DEBUG: Checking if window is defined:', typeof window !== 'undefined' ? 'YES' : 'NO');


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
  const prevScrollY = useRef(typeof window !== 'undefined' ? window.scrollY : 0);
  const scrollTimeout = useRef(null);

  console.log('DEBUG: Component mounted - initial state:', {
    activePanel,
    previousPanel,
    scrollDirection,
    isScrolling,
    prevScrollY: prevScrollY.current
  });

  useEffect(() => {
    console.log('DEBUG: useEffect triggered - setting up scroll observer');
    
    const handleScroll = (entries) => {
      console.log('DEBUG: IntersectionObserver callback triggered with entries:', entries);
      
      entries.forEach((entry) => {
        console.log('DEBUG: Processing entry:', {
          isIntersecting: entry.isIntersecting,
          target: entry.target.dataset.panel,
          isScrolling,
          ratio: entry.intersectionRatio
        });

        if (entry.isIntersecting && !isScrolling) {
          const currentScrollY = window.scrollY;
          const direction = currentScrollY > prevScrollY.current ? 'down' : 'up';
          console.log('DEBUG: Scroll direction detected:', direction);
          
          setScrollDirection(direction);
          prevScrollY.current = currentScrollY;
          
          const newPanel = entry.target.dataset.panel;
          console.log('DEBUG: New panel detected:', newPanel);
          
          // Prevent scrolling past panel1 when scrolling down
          if (direction === 'down' && newPanel === 'panel1') {
            console.log('DEBUG: Case 1 - Scrolling down to panel1');
            setPreviousPanel(activePanel);
            setActivePanel(newPanel);
          } 
          // Prevent scrolling past panel4 when scrolling up
          else if (direction === 'up' && newPanel === 'panel4') {
            console.log('DEBUG: Case 2 - Scrolling up to panel4');
            setPreviousPanel(activePanel);
            setActivePanel(newPanel);
          }
          // For other cases, only allow scroll if not at boundary
          else if ((direction === 'down' && activePanel !== 'panel1') || 
                   (direction === 'up' && activePanel !== 'panel4')) {
            console.log('DEBUG: Case 3 - Normal scroll transition');
            setIsScrolling(true);
            setPreviousPanel(activePanel);
            setActivePanel(newPanel);
            
            // Clear any existing timeout
            if (scrollTimeout.current) {
              console.log('DEBUG: Clearing existing scroll timeout');
              clearTimeout(scrollTimeout.current);
            }
            
            // Set timeout to allow next scroll after animation completes
            scrollTimeout.current = setTimeout(() => {
              console.log('DEBUG: Scroll timeout completed - allowing new scrolls');
              setIsScrolling(false);
            }, 1000); // Match this with your animation duration
          } else {
            console.log('DEBUG: Case 4 - Boundary reached, snapping back');
            // If trying to scroll past boundary, snap back
            const trigger = triggersRef.current.find(el => 
              el?.dataset.panel === activePanel
            );
            if (trigger) {
              console.log('DEBUG: Snapping back to panel:', activePanel);
              window.scrollTo({
                top: trigger.offsetTop,
                behavior: 'smooth'
              });
            }
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleScroll, {
  root: null,
  threshold: [0.2, 0.8] // More forgiving thresholds
});

    console.log('DEBUG: Observing triggers:', triggersRef.current);
    triggersRef.current.forEach((trigger) => {
      if (trigger) {
        console.log('DEBUG: Observing trigger:', trigger.dataset.panel);
        observer.observe(trigger);
      }
    });

    return () => {
      console.log('DEBUG: Cleanup - unobserve all triggers');
      triggersRef.current.forEach((trigger) => {
        if (trigger) observer.unobserve(trigger);
      });
      if (scrollTimeout.current) {
        console.log('DEBUG: Cleanup - clear scroll timeout');
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [activePanel, isScrolling]);

  const handleLogoClick = (panelId) => {
    console.log('DEBUG: Logo clicked - panel:', panelId);
    setActivePanel(panelId);
    const trigger = triggersRef.current.find(el => el?.dataset.panel === panelId);
    if (trigger) {
      console.log('DEBUG: Scrolling to trigger for panel:', panelId);
      trigger.scrollIntoView({ behavior: 'smooth' });
    }
  };

  console.log('DEBUG: Current render state:', {
    activePanel,
    previousPanel,
    scrollDirection,
    isScrolling
  });

  // Add this useEffect to handle scroll end detection
useEffect(() => {
  const handleScrollEnd = () => {
    setIsScrolling(false);
  };
  
  window.addEventListener('scrollend', handleScrollEnd);
  return () => window.removeEventListener('scrollend', handleScrollEnd);
}, []);

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
              console.log('DEBUG: Trigger ref set for panel:', `panel${index + 1}`, el);
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


                console.log('DEBUG: Rendering motion div for panel:', panelId, {
                  isActive,
                  currentIndex,
                  isScrollingDown,
                  isBeforeCurrent,
                  isAfterCurrent
                });

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