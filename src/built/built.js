import React from 'react';
import './built.css';
import blackProjectImage from './../images/built.png';

function Built() {
  return (
    <div className="scroll-container">
      <section className="scroll-section">
        <div className="bp-image-container">
          <img
            src={blackProjectImage}
            alt="Project Black"
            className="bp-main-image"
          />
        </div>

        {/* Sticky text container */}
        <div className="text-sticky-container">
          <div className="scroll-text">
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
      </section>
    </div>
  );
}

export default Built;