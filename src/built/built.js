import React, { useRef, useEffect, useState } from 'react';
import './built.css';
import blackProjectImage from './../images/built.png';

const Built = () => {
  const containerRef = useRef();
  const imageRef = useRef();
  const textContentRef = useRef();
  const isHovered = useRef(false);
  const scrollOffset = useRef(0);
  const isAnimating = useRef(false);
  const [isScrollLocked, setIsScrollLocked] = useState(true);
  const rafId = useRef(null);
  const touchStartY = useRef(0);
  const lastScrollTime = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !imageRef.current || !textContentRef.current) return;

    const handleWheel = (e) => {
      if (!isScrollLocked) return;

      const now = Date.now();
      if (now - lastScrollTime.current < 16) return; // ~60fps throttle
      lastScrollTime.current = now;

      const containerHeight = container.clientHeight;
      const imageHeight = imageRef.current.scrollHeight;
      const maxScroll = Math.max(imageHeight - containerHeight, 0);
      const atBottom = scrollOffset.current >= maxScroll;

      // If we're at bottom and scrolling down, release lock
      if (atBottom && e.deltaY > 0) {
        setIsScrollLocked(false);
        return;
      }

      // Otherwise, handle the scroll ourselves
      e.preventDefault();
      e.stopPropagation();

      const delta = e.deltaY * 0.5;
      let newOffset = scrollOffset.current + delta;
      newOffset = Math.max(0, Math.min(newOffset, maxScroll));

      scrollOffset.current = newOffset;
      imageRef.current.style.transform = `translateY(-${scrollOffset.current}px)`;

      // If we reached bottom after this scroll, release lock on next frame
      if (scrollOffset.current >= maxScroll && e.deltaY > 0) {
        requestAnimationFrame(() => {
          setIsScrollLocked(false);
        });
      }
    };

    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      if (!isScrollLocked) return;

      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY.current - touchY;
      touchStartY.current = touchY;

      const containerHeight = container.clientHeight;
      const imageHeight = imageRef.current.scrollHeight;
      const maxScroll = Math.max(imageHeight - containerHeight, 0);
      const atBottom = scrollOffset.current >= maxScroll;

      // If we're at bottom and scrolling down, release lock
      if (atBottom && deltaY < 0) {
        setIsScrollLocked(false);
        return;
      }

      // Otherwise, handle the scroll ourselves
      e.preventDefault();
      e.stopPropagation();

      let newOffset = scrollOffset.current + deltaY;
      newOffset = Math.max(0, Math.min(newOffset, maxScroll));

      scrollOffset.current = newOffset;
      imageRef.current.style.transform = `translateY(-${scrollOffset.current}px)`;

      // If we reached bottom after this scroll, release lock on next frame
      if (scrollOffset.current >= maxScroll && deltaY < 0) {
        requestAnimationFrame(() => {
          setIsScrollLocked(false);
        });
      }
    };

    const checkScrollLock = () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);

      rafId.current = requestAnimationFrame(() => {
        const containerHeight = container.clientHeight;
        const imageHeight = imageRef.current.scrollHeight;
        const maxScroll = Math.max(imageHeight - containerHeight, 0);
        const atBottom = scrollOffset.current >= maxScroll;

        // Always lock while image has scroll left
        if (!atBottom && maxScroll > 0) {
          setIsScrollLocked(true);
        }
      });
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('scroll', checkScrollLock);
    window.addEventListener('resize', checkScrollLock);

    // Initial check
    checkScrollLock();

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('scroll', checkScrollLock);
      window.removeEventListener('resize', checkScrollLock);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [isScrollLocked]);

  useEffect(() => {
    if (isScrollLocked) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isScrollLocked]);

  return (
    <div
      className="bp-container"
      ref={containerRef}
      onMouseEnter={() => (isHovered.current = true)}
      onMouseLeave={() => (isHovered.current = false)}
      role="region"
      aria-label="Project Black image and description"
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

      <div className="bp-text-content" ref={textContentRef}>
        <h1>Built For Us. Powered By Us</h1>
        <h2>For Everyone Who Believes In Us</h2>
        <p>
          Project Black is on the map to be THE premium ecosystem for connection, education,
          ownership, and legacy.
        </p>
        <p>
          We're building the future of culture, for the culture—through media, tech, commerce, and
          community.
        </p>
        <p>
          A space where creativity meets capital. Where ideas are elevated. Where the culture owns
          the room.
        </p>
        <p className="bp-tagline-text">The Revolution Is Premium ™</p>
      </div>
    </div>
  );
};

export default Built;