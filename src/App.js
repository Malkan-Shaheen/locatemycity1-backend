import React, { useRef, useEffect } from 'react';
import Header from './Header/Header';
import HeroSection from './Hero/Hero';
import Built from './built/built';
import NextSection from './blackprintEcosystem/blackprintEcosystem';
import Vision from './vision/vision';
import Directory from './built/Directory/directory';
import Mission from './mission/mission';
import Footer from './Footer/footer';
import FAQs from './faqs/faqs';
import CountdownClock from './Clockmain';
import './App.css';

function App() {
  const nextSectionRef = useRef();
  const builtRef = useRef();
  const clockRef = useRef();

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

      <Vision />
      <Directory />
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