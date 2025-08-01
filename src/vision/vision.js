import React from 'react';
import './vision.css';
import img1 from './../images/group.png';
import img2 from './../images/store.png';
import img3 from './../images/couple.png';
import img4 from './../images/mural.png';

const Vision = () => {
  return (
    <div className="page-center">
      <section className="empower-section">

        <div className="frames-grid">
          <img src={img1} alt="Visual 1" className="frame-img frame-img-1" />
          <img src={img2} alt="Visual 2" className="frame-img frame-img-2" />
          <img src={img3} alt="Visual 3" className="frame-img frame-img-3" />
          <img src={img4} alt="Visual 4" className="frame-img frame-img-4" />
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
