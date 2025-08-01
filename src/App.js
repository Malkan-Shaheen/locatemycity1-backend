import React, { useRef } from 'react';
import Header from './Header/Header';
import HeroSection from './Hero/Hero';
import Built from './built/built';
import NextSection from './blackprintEcosystem/blackprintEcosystem';
import empower from './Empower/empower';

function App() {
  const nextSectionRef = useRef();
  const builtRef = useRef();

  const handleScrollComplete = () => {
    nextSectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

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

      <empower />
    </div>
  );
}

export default App;