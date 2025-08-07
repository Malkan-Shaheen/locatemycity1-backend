import React, { useRef, useEffect, useState } from 'react';
import Header from './Header/Header';
import HeroSection from './Hero/Hero';
import Built from './built/built';
import NextSection from './blackprintEcosystem/blackprintEcosystem';
import Vision from './vision/vision';       // Desktop version
import Vision2 from './vision/vision2';     // Mobile version
import Directory from './built/Directory/directory'; // Desktop version
import Tabdirectory from './built/Directory/tabdirectory';
import Mission from './mission/mission';
import Footer from './Footer/footer';
import FAQs from './faqs/faqs';
import CountdownClock from './Clockmain';
import './App.css';

function App() {
  const nextSectionRef = useRef();
  const builtRef = useRef();
  const clockRef = useRef();
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  // Check device type on mount and resize
  useEffect(() => {
    const checkDevice = () => {
      // You can adjust this threshold as needed (768px is common for tablets)
      setIsMobileDevice(window.innerWidth < 1024);
    };

    // Initial check
    checkDevice();

    // Add event listener for window resize
    window.addEventListener('resize', checkDevice);

    // Cleanup
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const handleScrollComplete = () => {
    nextSectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  useEffect(() => {
    const hero = document.querySelector('.hero-container');
    const clock = clockRef.current;

    if (!hero || !clock) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.target === hero) {
            clock.style.display = entry.isIntersecting ? 'none' : 'flex';
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(hero);

    return () => {
      observer.unobserve(hero);
    };
  }, []);

  return (
    <div className="app-container">
      <Header />
      <HeroSection />
      
      <div ref={builtRef}>
        <Built onScrollComplete={handleScrollComplete} />
      </div>
      
      <div ref={nextSectionRef} className="next-section-wrapper">
        <NextSection />
      </div>

      {isMobileDevice ? <Vision2 /> : <Vision />}
      
      {/* Render appropriate directory based on device */}
      {isMobileDevice ? <Tabdirectory /> : <Directory />}
      
      <Mission />
      <FAQs />
      <Footer />

      {/* Fixed position clock */}
      <div ref={clockRef} className="flipClock1">
        <CountdownClock />
      </div>
    </div>
  );
}

export default App;