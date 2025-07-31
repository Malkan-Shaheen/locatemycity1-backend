import React from 'react';
import './built.css';
import blackProjectImage from './../images/built.png'; // Make sure the path is correct

const BlackProject = () => {
  return (
    <div className="bp-container">
      <div className="bp-text-content">
        <h1 className="bp-main-heading">Built For Us. Powered By Us</h1>
        <h2 className="bp-sub-heading">For Everyone Who Believes In Us</h2>

        <div className="bp-description-text">
          <p className="bp-paragraph">
            Project Black Is On The Map To Be THE Premium Ecosystem For Connection, Education,<br />
            Ownership, And Legacy.
          </p>
          <p className="bp-paragraph">
            We're Building The Future Of Culture, For The Culture—<br />
            Through Media, Tech, Commerce, And Community.
          </p>
          <p className="bp-paragraph">
            A Space Where Creativity Meets Capital.
          </p>
          <p className="bp-paragraph">
            Where Ideas Are Elevated. Where The Culture Owns The Room.
          </p>
        </div>

        <p className="bp-tagline-text">The Revolution Is Premium ™</p>
      </div>

      <div className="bp-image-container">
        <img src={blackProjectImage} alt="Project Black" className="bp-main-image" />
      </div>
    </div>
  );
};

export default BlackProject;
