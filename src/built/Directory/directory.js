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
    text: `The entry-level tier designed for businesses looking to establish their presence and gain early access to Project Black’s growing network.

Benefits:
• Business listing in the Directory on GoProjectBlack.com
• Exposure to an engaged audience and exclusive early access opportunities
• Social media highlights to drive traffic to your business
• Recognition in the Founders Circle as an early supporter

Welcome package: The Trailblazer Innovator Edition

Early Bird Rate: $50 (50% off, will increase to $100 after launch)`
  },
  {
    image: require('./../../images/man.png'),
    icon: require('./../../images/icon2.png'),
    title: "Growth Phase",
    price: "$50 (Limited Time) / Annum",
    text: `The entry-level tier designed for businesses looking to establish their presence and gain early access to Project Black’s growing network.

Benefits:
• Business listing in the Directory on GoProjectBlack.com
• Exposure to an engaged audience and exclusive early access opportunities
• Social media highlights to drive traffic to your business
• Recognition in the Founders Circle as an early supporter

Welcome package: The Trailblazer Innovator Edition

Early Bird Rate: $50 (50% off, will increase to $100 after launch)`
  },
  {
    image: require('./../../images/woman.png'),
    icon: require('./../../images/icon3.png'),
    title: "Established Root",
    price: "$50 (Limited Time) / Annum",
    text: `The entry-level tier designed for businesses looking to establish their presence and gain early access to Project Black’s growing network.

Benefits:
• Business listing in the Directory on GoProjectBlack.com
• Exposure to an engaged audience and exclusive early access opportunities
• Social media highlights to drive traffic to your business
• Recognition in the Founders Circle as an early supporter

Welcome package: The Trailblazer Innovator Edition

Early Bird Rate: $50 (50% off, will increase to $100 after launch)`
  },
  {
    image: require('./../../images/crown.png'),
    icon: require('./../../images/icon4.png'),
    title: "Harvesting Change",
    price: "$50 (Limited Time) / Annum",
    text: `The entry-level tier designed for businesses looking to establish their presence and gain early access to Project Black’s growing network.

Benefits:
• Business listing in the Directory on GoProjectBlack.com
• Exposure to an engaged audience and exclusive early access opportunities
• Social media highlights to drive traffic to your business
• Recognition in the Founders Circle as an early supporter

Welcome package: The Trailblazer Innovator Edition

Early Bird Rate: $50 (50% off, will increase to $100 after launch)`
  }
];


const Directory = () => {
  const [current, setCurrent] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!isInView) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % contentList.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [isInView, contentList.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
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
              onClick={() => setCurrent(index)}
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
          <motion.div 
            className="image-carousel"
            animate={{
              y: [0, -435], // Moves up by one image height
            }}
            transition={{
              duration: 4,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {[...contentList, contentList[0]].map((item, index) => (
              <motion.div 
                key={index} 
                className="carousel-image-wrapper"
                style={{ opacity: index === current ? 1 : 0.7 }}
              >
                <img 
                  src={item.image} 
                  alt="Visual" 
                  className="carousel-image" 
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Directory;