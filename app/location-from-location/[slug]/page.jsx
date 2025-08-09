'use client';
import { FaChevronUp, FaChevronDown, FaGlobe, FaSun, FaWind, FaPlane, FaAnchor, FaClock } from 'react-icons/fa';
import { WiSunrise, WiSunset } from 'react-icons/wi';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { MetricCard, WeatherPanel, FAQItem, RouteCard } from '../../../components/DistanceComponents';

// Lazy load with enhanced loading state accessibility
const LeafletMap = dynamic(() => import('../../../components/LeafletMap'), {
  ssr: false,
  loading: () => (
    <div 
      className="distance-result__map-loading" 
      role="status" 
      aria-live="polite"
      aria-label="Map loading"
    >
      <div className="distance-result__map-loader">
        <div className="distance-result__map-loader-icon" aria-hidden="true"></div>
        <p className="distance-result__map-loader-text">Loading map...</p>
      </div>
    </div>
  )
});

// ... [Keep all your existing constants and utility functions] ...

export default function DistanceResult() {
  // ... [Keep all existing state and logic] ...

  if (!sourcePlace || !destinationPlace) {
    return (
      <div 
        className="distance-calc-loading-screen min-h-screen flex items-center justify-center" 
        role="status" 
        aria-live="polite"
        aria-label="Loading location data"
      >
        <div className="distance-calc-loading-content text-center">
          <div 
            className="distance-calc-spinner spinner border-4 border-blue-500 border-t-transparent rounded-full w-12 h-12 animate-spin mx-auto" 
            aria-hidden="true"
          ></div>
          <p className="distance-calc-loading-text mt-4 text-lg">Loading location data...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <Head>
        <title>{`How far is ${sourceShortName} from ${destinationShortName}?`}</title>
        <meta name="description" content={`Distance between ${sourcePlace?.display_name} and ${destinationPlace?.display_name}`} />
      </Head>

      <main>
        <section className="distance-result__header" aria-labelledby="distance-header">
          <div className="distance-result__header-content">
            <h1 id="distance-header" className="distance-result__title">
              How far is <span className="distance-result__highlight">{sourceShortName}</span> from <span className="distance-result__highlight">{destinationShortName}</span>?
            </h1>
            {!isLoading && (
              <p className="distance-result__description">
                {sourceShortName} is approximately <strong>{kmToMiles(distanceInKm).toFixed(1)} miles</strong> ({distanceInKm.toFixed(1)} km) from {destinationShortName}, with a flight time of around <strong>{calculateFlightTime(distanceInKm)} hours</strong>.
              </p>
            )}
          </div>
        </section>

        <section className="distance-result__container">
          <section 
            className="distance-result__map-section" 
            aria-labelledby="map-section-title"
            aria-live="polite"
          >
            <h2 id="map-section-title" className="sr-only">Map between {sourceShortName} and {destinationShortName}</h2>
            <div className="distance-result__map-wrapper">
              <LeafletMap 
                source={{ lat: parseFloat(sourcePlace.lat), lng: parseFloat(sourcePlace.lon), name: sourcePlace.display_name }}
                destination={{ lat: parseFloat(destinationPlace.lat), lng: parseFloat(destinationPlace.lon), name: destinationPlace.display_name }}
                distance={distanceInKm}
              />
            </div>
          </section>

          {!isLoading && (
            <>
              <section className="distance-result__metrics" aria-labelledby="metrics-section-title">
                <h2 id="metrics-section-title" className="distance-result__section-title">Distance Information</h2>
                <div className="distance-result__metrics-grid">
                  <MetricCard 
                    icon={<FaGlobe aria-hidden="true" />} 
                    title="Kilometers" 
                    value={distanceMetrics.km} 
                    unit="km" 
                    variant="blue" 
                    aria-label={`Distance: ${distanceMetrics.km} kilometers`}
                  />
                  {/* Add same aria-label to other MetricCards */}
                </div>
              </section>

              <section 
                className="distance-result__weather" 
                aria-labelledby="weather-section-title"
                aria-live="polite"
              >
                <h2 id="weather-section-title" className="distance-result__section-title">Current Weather Comparison</h2>
                <div className="distance-result__weather-grid">
                  <WeatherPanel 
                    location={sourceShortName} 
                    weather={sourceWeather} 
                    type="source" 
                    aria-labelledby="source-weather-heading"
                    id="source-weather-panel"
                  />
                  <WeatherPanel 
                    location={destinationShortName} 
                    weather={destinationWeather} 
                    type="destination" 
                    aria-labelledby="destination-weather-heading"
                    id="destination-weather-panel"
                  />
                </div>
              </section>

              <section className="faq-page" aria-labelledby="faq-section-title">
                <h2 id="faq-section-title" className="faq-title">Frequently Asked Questions</h2>
                <div className="faq-list" role="region">
                  {faqs.map((faq, index) => (
                    <div 
                      key={faq.id}
                      className={`faq-card ${activeFAQ === index ? 'open' : ''}`}
                      role="region"
                      aria-labelledby={`faq-question-${faq.id}`}
                    >
                      <button
                        id={`faq-question-${faq.id}`}
                        className="faq-question"
                        aria-expanded={activeFAQ === index}
                        aria-controls={`faq-answer-${faq.id}`}
                        onClick={() => toggleFAQ(index)}
                      >
                        <span>{faq.question}</span>
                        {activeFAQ === index ? 
                          <FaChevronUp aria-hidden="true" /> : 
                          <FaChevronDown aria-hidden="true" />
                        }
                      </button>
                      <div 
                        id={`faq-answer-${faq.id}`}
                        className="faq-answer"
                        role="region"
                        aria-labelledby={`faq-question-${faq.id}`}
                      >
                        {activeFAQ === index && <p>{faq.answer}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="distance-result__routes" aria-labelledby="routes-section-title">
                <h2 id="routes-section-title" className="distance-result__section-title">Popular Travel Routes</h2>
                <div className="distance-result__routes-grid">
                  {popularRoutes.map((route) => (
                    <RouteCard 
                      key={route.id}
                      source={route.source} 
                      destination={route.destination} 
                      onClick={() => navigateToRoute(route.source, route.destination)}
                      aria-label={`View route from ${route.source} to ${route.destination}`}
                    />
                  ))}
                </div>
              </section>
            </>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}