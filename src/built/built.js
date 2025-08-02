import React, { useRef, useEffect } from 'react';
import './built.css';
import blackProjectImage from './../images/built.png';

const Built = () => {
  const containerRef = useRef();
  const imageRef = useRef();
  const isHovered = useRef(false);
  const scrollOffset = useRef(0); // track scroll state manually
  
  

  const handleScroll = (e) => {
  if (!containerRef.current || !isHovered.current) return;

  e.preventDefault();

  const delta = e.deltaY || e.detail || -e.wheelDelta;

  scrollOffset.current = Math.max(scrollOffset.current + delta, 0);

  const containerHeight = containerRef.current.clientHeight;
  const imageHeight = imageRef.current.clientHeight;

const maxScroll = Math.max(imageHeight - containerHeight, 0); // 🛡️ prevent negative
if (maxScroll === 0) return;

  scrollOffset.current = Math.min(scrollOffset.current, maxScroll);

  const percent = (scrollOffset.current / imageHeight) * 100;
  imageRef.current.style.transform = `translateY(-${percent}%)`;

  // Auto-scroll behavior
  if (scrollOffset.current <= 0) {
    window.scrollBy({ top: -100, behavior: 'smooth' });
  } else if (scrollOffset.current >= maxScroll - 5) {
    window.scrollBy({ top: 100, behavior: 'smooth' });
  }
};


  useEffect(() => {
    const options = { passive: false };
    window.addEventListener('wheel', handleScroll, options);

    return () => {
      window.removeEventListener('wheel', handleScroll, options);
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
          style={{ transform: 'translateY(0%)' }}
        />
      </div>

      <div className="bp-text-content">
        <h1>Built For Us. Powered By Us</h1>
        <h2>For Everyone Who Believes In Us</h2>
        <p>Project Black is on the map to be THE premium ecosystem for connection, education,
ownership, and legacy.
We’re building the future of culture, for the culture— 
through media, tech, commerce, and
community.
A space where creativity meets capital. 
Where ideas are elevated. Where the culture owns the
room.</p>
        <p className="bp-tagline-text">The Revolution Is Premium ™</p>
      </div>
    </div>
  );
};

export default Built;
