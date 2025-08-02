import React, { useRef, useEffect } from 'react';
import './built.css';
import blackProjectImage from './../images/built.png';

const Built = () => {
  const containerRef = useRef();
  const imageRef = useRef();
  const isHovered = useRef(false);
  const scrollOffset = useRef(0);
  const isAnimating = useRef(false);

  const handleScroll = (e) => {
    if (!containerRef.current || !isHovered.current || isAnimating.current) return;

    const containerHeight = containerRef.current.clientHeight;
    const imageHeight = imageRef.current.scrollHeight;
    const maxScroll = Math.max(imageHeight - containerHeight, 0);
    
    if (maxScroll <= 0) return;

    // Check boundaries
    const atTop = scrollOffset.current <= 0;
    const atBottom = scrollOffset.current >= maxScroll;

    // Allow normal scroll at boundaries
    if ((atTop && e.deltaY < 0) || (atBottom && e.deltaY > 0)) {
      return;
    }

    e.preventDefault();
    isAnimating.current = true;

    // Slow scroll speed (30% of normal)
    const delta = e.deltaY * 0.3;
    
    // Calculate new position with clamping
    let newOffset = scrollOffset.current + delta;
    newOffset = Math.max(0, Math.min(newOffset, maxScroll));

    // Only update if position changed
    if (Math.abs(newOffset - scrollOffset.current) > 0.5) {
      scrollOffset.current = newOffset;
      imageRef.current.style.transform = `translateY(-${scrollOffset.current}px)`;
    }

    requestAnimationFrame(() => {
      isAnimating.current = false;
    });
  };

  useEffect(() => {
    const container = containerRef.current;
    const options = { passive: false };
    
    container.addEventListener('wheel', handleScroll, options);

    return () => {
      container.removeEventListener('wheel', handleScroll, options);
    };
  }, []);

  return (
    <div
      className="bp-container"
      ref={containerRef}
      onMouseEnter={() => (isHovered.current = true)}
      onMouseLeave={() => (isHovered.current = false)}
    >
      <div className="bp-image-container">
        <img
          ref={imageRef}
          src={blackProjectImage}
          alt="Project Black"
          className="bp-main-image"
          style={{ transform: 'translateY(0)' }}
        />
      </div>

      <div className="bp-text-content">
        <h1>Built For Us. Powered By Us</h1>
        <h2>For Everyone Who Believes In Us</h2>
        <p>Project Black is on the map to be THE premium ecosystem for connection, education,
ownership, and legacy.</p>
        <p>We're building the future of culture, for the culture—through media, tech, commerce, and
community.</p>
        <p>A space where creativity meets capital. Where ideas are elevated. Where the culture owns the
room.</p>
        <p className="bp-tagline-text">The Revolution Is Premium ™</p>
      </div>
    </div>
  );
};

export default Built;