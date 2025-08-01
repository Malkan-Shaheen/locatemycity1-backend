import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './faqs.css';

const faqs = [
  {
    question: "What is Project Black, and how is it different from platforms like BLAPP or Miiriya?",
    answer: "Project Black isn’t just a directory or marketplace—it’s a digital ecosystem. We merge community, commerce, culture, capital, and creativity under one unified platform. While others list brands, we build legacy.",
  },
  {
    question: "What do I get when I sign up for a tier?",
    answer: "Each membership tier unlocks access to exclusive perks, visibility, and opportunities. And yes—each higher tier includes the benefits of all the ones before it. Plus, every member, investor, and supporter receives an exclusive, tailored ‘Welcome to Excellence’ Black Box to commemorate their entry into the movement.",
  },
  {
    question: "Can I upgrade or cancel my membership at any time?",
    answer: "Absolutely. You can upgrade, pause, or cancel at any time. We’re community-led, not contract-trapped.",
  },
  {
    question: "What does the monthly or annual fee actually support?",
    answer: "Your subscription powers platform upkeep, creator funding, tech innovation, community growth, and helps keep the Black dollar circulating.",
  },
  {
    question: "What is The Flame tier’s community funding, and how does it work?",
    answer: "It’s like a culturally-rooted Shark Tank. Members can pitch ideas for funding, with support coming from membership dues, merch sales, and partners. It’s exposure, capital, and opportunity in one.",
  },
  {
     question: " If I get funding, am I locked into a contract?",
    answer: "Yes. To ensure trust and protect all parties, we require recipients of community funding to sign a short agreement. It outlines the amount received, the purpose, and a brief community engagement period (3–6 months). It’s about protecting what we’re building together.",
  },
   {
     question: " How do I get involved beyond membership?",
    answer: " Shop the merch, join a partnership, contribute to the PBU community, sponsor a member, or simply share the movement. We’re building Black excellence—together.",
  },
   {
     question: "What does Project Black do differently from other platforms—especially in terms of pricing and value?",
    answer: "Project Black offers layered membership tiers where each higher level unlocks all prior benefits. Unlike others, we also invest directly back into our members through creator funding, sponsorships, and exclusive experiences—while keeping pricing transparent and fair.",
  },
];

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="faq-wrapper">
      <h2 className="faq-heading">FAQs</h2>
      <p className="faq-subheading">Your Questions Answered</p>

      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div
            className={`faq-item ${activeIndex === index ? 'active' : ''}`}
            key={index}
          >
            <div className="faq-question-row">
              <div className="faq-number">{String(index + 1).padStart(2, '0')}</div>
              <div className="faq-question-text">{faq.question}</div>
              <div
                className="faq-toggle-button"
                onClick={() => toggleFAQ(index)}
              >
                {activeIndex === index ? '−' : '+'}
              </div>
            </div>

            <AnimatePresence initial={false}>
              {activeIndex === index && (
                <motion.div
                  className="faq-answer"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p>{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;
