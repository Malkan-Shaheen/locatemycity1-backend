import React from 'react';
import './tabdirectory.css';

// Import images
import childImg from './../../images/child.png';
import manImg from './../../images/man.png';
import womanImg from './../../images/woman.png';
import crownImg from './../../images/crown.png';
import icon1 from './../../images/icon1.png';
import icon2 from './../../images/icon2.png';
import icon3 from './../../images/icon3.png';
import icon4 from './../../images/icon4.png';

const contentList = [
 {
    image: childImg,
    icon: icon1,
    title: "The Seed: Planted in the Directory",
    price: "$50 (Limited Time) / Annum",
    text: `The entry-level tier designed for businesses looking to establish their presence and gain early access to Project Black’s growing network.

Benefits:
• Business listing in the Directory on GoProjectBlack.com
• Exposure to an engaged audience and exclusive early access opportunities
• Social media highlights to drive traffic to your business
• Recognition in the Founders Circle as an early supporter

Welcome package: The Trailblazer Innovator Edition

Early Bird Rate: $50 (50% off, will increase to $100 after launch)
`
},
{
    image: manImg,
    icon: icon2,
    title: "Growth Phase",
    price: "$50 (Limited Time) / Annum",
    text: `Designed for business owners looking for a competitive edge and deeper engagement within Project Black.

Benefits:
• All Trailblazer perks included
• Early access to platform launches and events
• Exclusive discounts with partner brands
• Founders Circle recognition with permanent listing
• Private networking with Black 100 members
• Priority spotlights for your business on the platform

Welcome package: The Black Box Innovator Edition

Pay-in-Full Bonus:
One additional social media feature (extra promotion across Project Black's platforms)
`
},
  {
    image: womanImg,
    icon: icon3,
    title: "Established Root",
    price: "$50 (Limited Time) / Annum",
 text: `For entrepreneurs scaling up and ready to lead the culture.

Benefits:
	•	All Pillar perks included
	•	VIP platform + directory feature
	•	Business spotlight & media exposure
	•	Speaking/interview opportunities
	•	Priority brand/investor intros
…and more

Extras:
Business Makeover Package
	•	Feature write-up & promo reel
	•	IG highlight & social media boost

Welcome Package:
The Black Box — Flame Edition
 `  },
  {
    image: crownImg,
    icon: icon4,
    title: "Harvesting Change",
    price: "$50 (Limited Time) / Annum",
    text: `The entry-level tier designed for businesses looking to establish their presence and gain early access to Project Black's growing network.

Benefits:
• Business listing in the Directory on GoProjectBlack.com
• Exposure to an engaged audience and exclusive early access opportunities
• Social media highlights to drive traffic to your business
• Recognition in the Founders Circle as an early supporter

Welcome package: The Trailblazer Innovator Edition

Early Bird Rate: $50 (50% off, will increase to $100 after launch)
`
}

];

const Tabdirectory = () => {
  return (
    <div className="directory-section1">
      <div className="directory-heading1">
        <h1>Join the movement</h1>
        <h3>Fueling the Future of Black Innovation</h3>
      </div>

      {contentList.map((item, index) => (
        <div key={`content-${index}`} className="content-block1">
          <div className="content-header1">
            <img src={item.icon} alt={`Icon ${index + 1}`} className="content-icon1" />
            <h2>{item.title}</h2>
          </div>
          
          <div className="content-image1">
            <img 
              src={item.image} 
              alt={`Content ${index + 1}`} 
            />
          </div>
          
          <div className="content-text1">
            <p>{item.text}</p>
            <button className="join-btn1">Join Now</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tabdirectory;