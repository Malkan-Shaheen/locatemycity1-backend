// Directory.jsx
import React, { useState, useEffect, useRef } from 'react';
import './directory.css';
import { motion, AnimatePresence } from 'framer-motion';

const contentList = [
  {
    image: require('./../../images/child.png'),
    icon: require('./../../images/icon1.png'),
    title: "The Seed: Planted in the Directory",
    price: "$50 (Limited Time) / Annum",
    text: `Your First Step Into the Ecosystem 
The Seed is  how you claim your place in the culture. 
Whether you’re a brand, creative, or supporter, this entry-level listing gives you visibility, access, 
and community. 

What You Get 
Verified spot in the ProjectBlack Directory (The Black Book)  
Exposure to a culture-driven audience 
Early supporter recognition (Digital badge for social media) 
Member-only updates, events and opportunities`
  },
  {
    image: require('./../../images/man.png'),
    icon: require('./../../images/icon2.png'),
    title: "Growth Phase",
    price: "$50 (Limited Time) / Annum",
    text: `Designed for business owners looking for a competitive edge and deeper engagement within Project Black.\n\nBenefits:\nAll Trailblazer perks included\nEarly access to platform launches and events\nExclusive discounts with partner brands\nFounders Circle recognition with permanent listing\nPrivate networking with Black 100 members\nPriority spotlights for your business on the platform\n\nWelcome package: The Black Box Innovator Edition\n\nPay-in-Full Bonus:\nOne additional social media feature (extra promotion across Project Black's platforms)`
  },
  {
    image: require('./../../images/woman.png'),
    icon: require('./../../images/icon3.png'),
    title: "Established Root",
    price: "$50 (Limited Time) / Annum",
    text: `For entrepreneurs and business leaders ready to scale and position themselves as industry trailblazers.\n\nBenefits:\nAll Innovator perks included\nVIP platform feature with top-tier directory placement\nDedicated business highlight feature and media exposure\nSpeaking and interview opportunities within Project Black's network\nPriority introductions to potential partners and investors\n\nBusiness Makeover Package:\nDirectory listing with feature write-up\nInstagram highlight and social media boost\nCustom promotional reel creation for business marketing\n\nWelcome package: The Black Box Visionary Edition\n\nPayment Plan Option:\n2 Monthly Payments of $1,300 OR\n3 Monthly Payments of $875\n\nPay-in-Full Bonus:\nExclusive interview feature on Project Black's blog and social media platforms`
  },
  {
    image: require('./../../images/crown.png'),
    icon: require('./../../images/icon4.png'),
    title: "Harvesting Change",
    price: "$50 (Limited Time) / Annum",
    text: `An exclusive tier for pioneers committed to shaping the future of Black business, media, and culture.\n\nBenefits:\nAll Visionary perks included\nOfficial recognition as a Project Black Legend\nPersonalized business strategy session with tailored growth recommendations\nFeatured on Project Black's media platforms for increased visibility\nEarly access to international Black-owned business initiatives\n\nThe Ultimate Business Makeover Package:\nPremium directory listing with front-page article and interview\nPermanent social media feature across multiple platforms\nOne-on-one branding consultation\nHigh-quality professional video production for business promotion\n\nWelcome package: The Black Box Legend Edition\n\nPayment Plan Option:\n3 Monthly Payments of $1,750 OR\n6 Monthly Payments of $900\n\nPay-in-Full Bonus:\nFeature in Project Black's Exclusive Business Spotlight Video Series (professionally curated and shared across platforms)`
  }
];


const Directory = () => {
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef(null);
  const carouselRef = useRef(null);
  const isScrollingRef = useRef(false);
  const isAtBoundaryRef = useRef(false);
  

  useEffect(() => {
  const section = sectionRef.current;
  const carousel = carouselRef.current;

  if (!section || !carousel) return;

  const handleScroll = (e) => {
    e.preventDefault(); // Prevent default global scroll
    if (isScrollingRef.current) return;

    const direction = e.deltaY > 0 ? 1 : -1;
    let newIndex = current + direction;

    // --- Allow scroll to previous section from first image
    if (newIndex < 0) {
      if (!isAtBoundaryRef.current) {
        isAtBoundaryRef.current = true;
        document.body.style.overflow = 'auto'; // unlock scroll
        window.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
        setTimeout(() => {
          document.body.style.overflow = 'hidden'; // relock after scroll
        }, 1000);
      }
      return;
    }

    // --- Allow scroll to next section from last image
    if (newIndex >= contentList.length) {
      if (!isAtBoundaryRef.current) {
        isAtBoundaryRef.current = true;
        document.body.style.overflow = 'auto'; // unlock scroll
        window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
        setTimeout(() => {
          document.body.style.overflow = 'hidden'; // relock after scroll
        }, 1000);
      }
      return;
    }

    isScrollingRef.current = true;
    isAtBoundaryRef.current = false;

    // Update index
    setCurrent(newIndex);

    // Scroll carousel
    const scrollStep = 435 + 20;
    carousel.scrollTo({
      top: newIndex * scrollStep,
      behavior: 'smooth'
    });

    setTimeout(() => {
      isScrollingRef.current = false;
    }, 1000);
  };

  // Lock scroll globally
  document.body.style.overflow = 'hidden';
  section.addEventListener('wheel', handleScroll, { passive: false });

  return () => {
    section.removeEventListener('wheel', handleScroll);
    document.body.style.overflow = 'auto'; // reset on unmount
  };
}, [current]);


useEffect(() => {
  const section = sectionRef.current;

  const handleScrollLock = () => {
    if (!section) return;

    const rect = section.getBoundingClientRect();

    // Lock only when section top aligns exactly with top of viewport
    const isAtTop = Math.abs(rect.top) < 1;

    if (isAtTop) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  window.addEventListener('scroll', handleScrollLock);
  handleScrollLock(); // Run once on mount

  return () => {
    window.removeEventListener('scroll', handleScrollLock);
    document.body.style.overflow = 'auto';
  };
}, []);




  // Handle carousel scroll to update current index
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const handleCarouselScroll = () => {
      const scrollStep = 435 + 20;
      const newIndex = Math.round(carousel.scrollTop / scrollStep);
      if (newIndex !== current) {
        setCurrent(newIndex);
      }
    };

    carousel.addEventListener('scroll', handleCarouselScroll);
    return () => {
      carousel.removeEventListener('scroll', handleCarouselScroll);
    };
  }, [current]);

  // Reset boundary flag when not at boundaries
  useEffect(() => {
    if (current > 0 && current < contentList.length - 1) {
      isAtBoundaryRef.current = false;
    }
  }, [current]);

  return (
    <div className="directory-section" ref={sectionRef}>
      <div className="directory-heading">
        <h1>Join the movement</h1>
        <h3>Fueling the Future of Black Innovation</h3>
      </div>

      <div className="directory-left">
        <div className="side-icons">
          {contentList.map((item, index) => (
            <div
              key={index}
              className={`icon ${index === current ? 'active-icon' : ''}`}
              onClick={() => {
                const el = document.querySelector(`[data-index='${index}']`);
                el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
            >
              <img src={item.icon} alt={`icon-${index}`} className="icon-img" />
            </div>
          ))}
        </div>

        <div className="directory-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="directory-title-price-wrapper">
                <h2 className="directory-title">{contentList[current].title}</h2>
                <div className="directory-price">{contentList[current].price}</div>
              </div>
              <p className="directory-text">
                {contentList[current].text.split('\n').map((line, i) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
              <button className="join-btn">Join Now</button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="directory-right">
        <div className="image-carousel-container">
          <div className="image-carousel" ref={carouselRef}>
            {contentList.map((item, index) => (
              <div
                key={index}
                className="carousel-image-wrapper"
                data-index={index}
              >
                <img src={item.image} alt="Visual" className="carousel-image" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Directory;
