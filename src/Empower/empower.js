import React from 'react';
import './empower.css';

const empower = () => {
  return (
    <div className="vision-container">
      <div className="vision-images">
        <div className="vision-grid">
          <img src="/images/empower.png" alt="Group" />
          
        </div>
      </div>
      <div className="vision-text">
        <h2>
          <span className="highlight-bar" /> The Vision: Empower<br />
          Black Excellence<br />
          Together
        </h2>
        <p className="vision-sub">
          Despite contributing $1.6 trillion annually to the U.S. economy, Black creators and businesses
          remain underrepresented. Project Black is here to change that.
        </p>
        <p className="vision-body">
          We're building a digital platform where culture, commerce, and community unite to shift
          narratives, multiply opportunity, and make Black excellence the rule—not the exception.<br /><br />
          Built for us. Backed by us. This is how we redefine the standard—together.
        </p>
      </div>
    </div>
  );
};

export default empower;
