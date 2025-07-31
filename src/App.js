import React from 'react';
import './App.css';
import Header from './Header/Header'
import HeroSection from './Hero/Hero';
import Built from './built/built';
import BlackprintEcosystem from './blackprintEcosystem/blackprintEcosystem';


function App() {
  return (
     <div>
    <Header />
    <HeroSection />
    <Built />
    <BlackprintEcosystem />
        </div>
  );
}

export default App;