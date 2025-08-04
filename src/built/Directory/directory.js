import React, { useState, useEffect, useRef } from 'react';
import './directory.css';
import { motion } from 'framer-motion';

const contentList = [
  {
    image: require('./../../images/child.png'),
    icon: require('./../../images/icon1.png'),
    title: "The Seed: Planted in the Directory",
    price: "$50 (Limited Time) / Annum",
    text: `The entry-level tier designed for businesses looking to establish their presence and gain early access to Project Black’s growing network.

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
One additional social media feature (extra promotion across Project Black’s platforms)

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
    text: `The entry-level tier designed for businesses looking to establish their presence and gain early access to Project Black’s growing network.

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
  const triggersRef = useRef([]);
  const [activePanel, setActivePanel] = useState('panel1');
  const [previousPanel, setPreviousPanel] = useState(null);
  const [scrollDirection, setScrollDirection] = useState('up');
  const prevScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentScrollY = window.scrollY;
          const direction = currentScrollY > prevScrollY.current ? 'down' : 'up';
          setScrollDirection(direction);
          prevScrollY.current = currentScrollY;
          
          setPreviousPanel(activePanel);
          setActivePanel(entry.target.dataset.panel);
        }
      });
    };

    const observer = new IntersectionObserver(handleScroll, {
      root: null,
      threshold: 0.5
    });

    triggersRef.current.forEach((trigger) => {
      if (trigger) observer.observe(trigger);
    });

    return () => {
      triggersRef.current.forEach((trigger) => {
        if (trigger) observer.unobserve(trigger);
      });
    };
  }, [activePanel]);

  const handleLogoClick = (panelId) => {
    setActivePanel(panelId);
    const trigger = triggersRef.current.find(el => el?.dataset.panel === panelId);
    if (trigger) {
      trigger.scrollIntoView({ behavior: 'smooth' });
    }
  };

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

      <div className="panel-section">
        <div className="logo-nav">
          {contentList.map((item, index) => (
            <div
              key={`panel${index + 1}`}
              className={`logo-item ${activePanel === `panel${index + 1}` ? 'active' : ''}`}
              data-panel={`panel${index + 1}`}
              onClick={() => handleLogoClick(`panel${index + 1}`)}
            >
              <img src={item.icon} alt={`Icon ${index + 1}`} />
            </div>
          ))}
        </div>

        <div className="content-area">
          <div className="panel-display">
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
    const wasActive = previousPanel === panelId;
    const currentIndex = parseInt(activePanel.replace('panel', '')) - 1;
    
    return (
      <motion.div
        key={`img-${panelId}`}
        className={`image-slide ${isActive ? 'active' : ''}`}
        data-panel={panelId}
        initial={false}
        animate={{
          y: isActive ? '0%' : 
             (index < currentIndex ? '-100%' : '100%'),
          opacity: isActive ? 1 : 0,
          transition: { 
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1] // Smooth easing
          }
        }}
        style={{
          zIndex: isActive ? contentList.length : contentList.length - index - 1,
          position: 'absolute'
        }}
      >
        <img src={item.image} alt={`Slide ${index + 1}`} 
          style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </motion.div>
    );
  })}
</div>
      </div>

          <div className="scroll-triggers">
            {contentList.map((_, index) => (
              <div
                key={`trigger-${index}`}
                className="scroll-trigger"
                data-panel={`panel${index + 1}`}
                ref={(el) => (triggersRef.current[index] = el)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Directory;