import React, { useRef, useEffect, useState } from 'react';
import './built.css';
import blackProjectImage from './../images/built.png';

const Built = ({ onScrollComplete }) => {
  const containerRef = useRef();
  const imageRef = useRef();
  const hintRef = useRef();
  const animationFrameId = useRef(null);
  const targetScroll = useRef(0);
  const currentScroll = useRef(0);
  const [isVisible, setIsVisible] = useState(false);

  // Smooth scroll animation
  const animateScroll = () => {
    // Apply easing for smooth movement
    currentScroll.current += (targetScroll.current - currentScroll.current) * 0.1;
    
    // Update image position (from 0% to -100%)
    if (imageRef.current) {
      imageRef.current.style.transform = `translateY(-${currentScroll.current}%)`;
    }
    
    // Update scroll hint opacity
    if (hintRef.current) {
      hintRef.current.style.opacity = `${1 - (currentScroll.current / 100)}`;
      hintRef.current.style.display = currentScroll.current >= 100 ? 'none' : 'block';
    }

    // Check if scroll is complete
    if (Math.abs(targetScroll.current - currentScroll.current) < 0.5) {
      currentScroll.current = targetScroll.current;
      
      // Trigger completion when fully scrolled
      if (currentScroll.current >= 100 && onScrollComplete) {
        onScrollComplete();
      }
      
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    } else {
      animationFrameId.current = requestAnimationFrame(animateScroll);
    }
  };

  // Handle scroll events
  const handleScroll = (e) => {
    if (!containerRef.current || !isVisible) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const containerTop = containerRect.top;
    const containerHeight = containerRect.height;
    
    // Only trigger when container is in viewport
    if (containerTop < window.innerHeight && containerTop > -containerHeight) {
      e.preventDefault();
      
      // Calculate scroll direction and amount
      const delta = e.deltaY || e.detail || -e.wheelDelta;
      targetScroll.current = Math.min(
        Math.max(targetScroll.current + delta * 0.5, 0),
        100
      );
      
      // Start animation if not already running
      if (!animationFrameId.current) {
        animationFrameId.current = requestAnimationFrame(animateScroll);
      }
    }
  };

  // Set up intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.5 }
    );

    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, []);

  // Set up event listeners
  useEffect(() => {
    const options = { passive: false };
    window.addEventListener('wheel', handleScroll, options);
    window.addEventListener('touchmove', handleScroll, options);
    
    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
    };
  }, [isVisible]);

  return (
    <div className="bp-container" ref={containerRef}>
      <div className="bp-image-container">
        <img
          ref={imageRef}
          src={blackProjectImage}
          alt="Project Black"
          className="bp-main-image"
          style={{ transform: 'translateY(0%)' }}
        />
      </div>

      <div className="bp-text-content">
        <h1>Built For Us. Powered By Us</h1>
        <h2>For Everyone Who Believes In Us</h2>
        
        <p>Project Black Is On The Map To Be THE Premium Ecosystem...</p>
        <p>We're Building The Future Of Culture, For The Culture...</p>
        <p>A Space Where Creativity Meets Capital.</p>
        <p>Where Ideas Are Elevated. Where The Culture Owns The Room.</p>
        
        <p className="bp-tagline-text">The Revolution Is Premium ™</p>
      </div>

     
    </div>
  );
};

export default Built;