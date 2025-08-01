import React from 'react';
import './vision.css';
import combinedImage from './../images/empower.png'; 

const Vision = () => {
  return (
    <div className="page-center">
      <section className="empower-section">
        <div className="frame-container">
          <img src={combinedImage} alt="Empower visual" className="frame-image" />
        </div>
        
<div className="text-wrapper">
  <div className="empower-text">
    <h2 className="empower-heading">The Vision: Empower Black Excellence Together</h2>
    <p className="empower-desc">
      Despite contributing $1.6 trillion annually to the U.S. economy, Black creators and businesses remain underrepresented. Project Black is here to change that.
    </p>
    <p className="empower-desc">
      We’re building a digital platform where culture, commerce, and community unite to shift narratives, multiply opportunity, and make Black excellence the rule—not the exception.
      <br />
      Built for us. Backed by us. This is how we redefine the standard—together.
    </p>
  </div>
  <div className="line line-top-left"></div>
  <div className="line line-bottom-left"></div>
  <div className="line line-right-vertical"></div>
</div>

      </section>
    </div>
  );
};

export default Vision;
