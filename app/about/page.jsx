'use client';
import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const AboutPage = () => {
  const features = [
    {
      icon: '📍',
      title: 'Distance Calculators',
      description: 'Measure in miles, kilometers, or nautical miles—perfect for travelers and planners.',
    },
    {
      icon: '🏙️',
      title: 'City/Town Classifier',
      description: 'Instantly check if a location is officially a city, town, or something else.',
    },
    {
      icon: '👻',
      title: 'Ghost Town Verifier',
      description: 'Discover abandoned settlements and verify their status with ease.',
    },
    {
      icon: '🔍',
      title: 'Search by Keyword',
      description: 'Find places by name or keywords like "rock", "spring", or "island".',
    },
  ];

  const promises = [
    { emoji: '⚡', text: 'Fast-loading pages – No waiting, just answers.' },
    { emoji: '🌎', text: 'Global coverage – From cities to ghost towns.' },
    { emoji: '🎯', text: 'Precise results – Reliable data anytime.' },
    { emoji: '✨', text: 'Simple design – Easy to use for everyone.' },
    { emoji: '📡', text: 'Open data – Transparent and trustworthy.' },
    { emoji: '⏳', text: 'Ready when you are – Explore on your time.' },
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-6 py-20">
        {/* Hero */}
        <section className="text-center mb-24">
          <h1 className="text-5xl md:text-6xl font-bold text-indigo-900 mb-6">
            About <span className="text-blue-600">LocateMyCity</span>
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Discover the world — one location at a time. Whether you're exploring ghost towns, 
            checking distance to a tropical island, or verifying a city's status — our tools make it simple.
          </p>
        </section>

        {/* What We Do */}
        <section className="mb-28">
          <h2 className="text-4xl font-bold text-center text-indigo-800 mb-16">What We Do</h2>
          <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((card, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-8 flex flex-col items-start hover:-translate-y-1"
              >
                <div className="text-4xl mb-4">{card.icon}</div>
                <h3 className="text-xl font-semibold text-indigo-800 mb-2">{card.title}</h3>
                <p className="text-gray-600 text-sm">{card.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why We Built This */}
        <section className="mb-28 bg-white rounded-3xl shadow-xl p-10 max-w-4xl mx-auto border-l-4 border-blue-500">
          <h2 className="text-3xl font-bold text-indigo-800 mb-4">Why We Built This</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            We believe location data should be fast, accurate, and accessible — no clutter, no confusion.
            Whether you're a traveler, researcher, or simply curious, LocateMyCity gives you tools to explore smarter.
          </p>
        </section>

        {/* Our Promise */}
        <section className="mb-28">
          <h2 className="text-4xl font-bold text-center text-indigo-800 mb-12">Our Promise</h2>
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {promises.map((item, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition"
              >
                <span className="text-3xl">{item.emoji}</span>
                <p className="text-gray-700 text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <h3 className="text-3xl font-semibold text-indigo-900 mb-4">Start Exploring Today</h3>
          <p className="text-lg text-gray-700 mb-6">
            Dive into the world with LocateMyCity — where every location tells a story.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-full font-semibold shadow-md transition-all">
            Try Our Tools Now
          </button>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
