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

  // Smooth scroll animation with slower movement
  const animateScroll = () => {
  // Slower easing (changed from 0.1 to 0.05)
  currentScroll.current += (targetScroll.current - currentScroll.current) * 0.025;
  
  if (imageRef.current && containerRef.current) {
    // Calculate maximum scrollable percentage
    const containerHeight = containerRef.current.clientHeight;
    const imageHeight = imageRef.current.clientHeight;
    const maxScrollable = ((imageHeight - containerHeight) / imageHeight) * 100;
    
    // Clamp the scroll percentage to not exceed the image bounds
    const clampedScroll = Math.min(currentScroll.current, maxScrollable);
    
    // Apply the transform
    imageRef.current.style.transform = `translateY(-${clampedScroll}%)`;
    
    // Update hint opacity based on clamped scroll
    if (hintRef.current) {
      const scrollProgress = clampedScroll / maxScrollable;
      hintRef.current.style.opacity = `${1 - scrollProgress}`;
      hintRef.current.style.display = clampedScroll >= maxScrollable ? 'none' : 'block';
    }

    // Check if scroll is complete (with small threshold)
    if (Math.abs(targetScroll.current - currentScroll.current) < 0.5 || 
        clampedScroll >= maxScrollable) {
      currentScroll.current = Math.min(targetScroll.current, maxScrollable);
      
      if (clampedScroll >= maxScrollable && onScrollComplete) {
        onScrollComplete();
      }
      
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    } else {
      animationFrameId.current = requestAnimationFrame(animateScroll);
    }
  }
};

  // Handle scroll events with reduced sensitivity
  const handleScroll = (e) => {
    if (!containerRef.current || !isVisible) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const containerTop = containerRect.top;
    const containerHeight = containerRect.height;
    
    if (containerTop < window.innerHeight && containerTop > -containerHeight) {
      e.preventDefault();
      
      // Reduced scroll sensitivity (changed from 0.5 to 0.3)
      const delta = e.deltaY || e.detail || -e.wheelDelta;
      targetScroll.current = Math.min(
        Math.max(targetScroll.current + delta * 0.3, 0),
        100
      );
      
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