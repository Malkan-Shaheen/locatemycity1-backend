'use client';
import { useEffect, useState, useMemo, useRef, useCallback } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import React from 'react';

// Reusable Loading component
const LoadingIndicator = ({ message = 'Loading...' }) => (
  <div className="loading-indicator" role="status" aria-live="polite" aria-busy="true">
    <div className="loading-spinner" aria-hidden="true"></div>
    <span>{message}</span>
  </div>
);

// Memoized StateButtons component
const StateButtons = React.memo(({ uniqueUSStates, selectedUSState, setSelectedUSState }) => (
  uniqueUSStates.map(state => (
    <button 
      key={state} 
      className="state-button" 
      onClick={() => setSelectedUSState(state)}
      aria-label={`Show locations in ${state}`}
      aria-pressed={selectedUSState === state}
    >
      <span>{state}</span>
    </button>
  ))
));

// Fixed dynamic import syntax
const MapWithNoSSR = dynamic(() => import('../../components/MapComponent'), { 
  ssr: false,
  loading: () => <LoadingIndicator message="Loading map..." />
});

export default function RockyLocationsExplorer() {
  const [allRockyLocations, setAllRockyLocations] = useState([]);
  const [selectedUSState, setSelectedUSState] = useState(null);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const stateHeadingRef = useRef(null);

  // Focus on heading when a new state is selected
  useEffect(() => {
    if (selectedUSState && stateHeadingRef.current) {
      stateHeadingRef.current.focus();
    }
  }, [selectedUSState]);

  // Load data from backend with optimizations
  useEffect(() => {
    let isMounted = true;
    let controller = new AbortController();
    
    const loadLocationData = async () => {
      try {
        setIsDataLoading(true);
        const backendUrl = 'https://locate-my-city-backend-production-e8a2.up.railway.app';
        const response = await fetch(`${backendUrl}/api/locations`, { 
          cache: 'force-cache',
          signal: controller.signal 
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const locationData = await response.json();
        if (isMounted) {
          if ('requestIdleCallback' in window) {
            window.requestIdleCallback(() => {
              setAllRockyLocations(locationData);
            });
          } else {
            setAllRockyLocations(locationData);
          }
        }
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Error loading location data:', error);
        }
      } finally {
        if (isMounted) setIsDataLoading(false);
      }
    };

    loadLocationData();
    return () => { 
      isMounted = false;
      controller.abort();
    };
  }, []);

  // Memoized calculations
  const commonLocationNames = useMemo(() => {
    const nameFrequency = {};
    allRockyLocations.forEach(location => {
      nameFrequency[location.name] = (nameFrequency[location.name] || 0) + 1;
    });
    return Object.entries(nameFrequency).sort((a, b) => b[1] - a[1]).slice(0, 4);
  }, [allRockyLocations]);

  const statesWithMostLocations = useMemo(() => {
    const stateFrequency = {};
    allRockyLocations.forEach(location => {
      stateFrequency[location.state] = (stateFrequency[location.state] || 0) + 1;
    });
    return Object.entries(stateFrequency).sort((a, b) => b[1] - a[1]).slice(0, 4);
  }, [allRockyLocations]);

  const uniqueUSStates = useMemo(() => [...new Set(allRockyLocations.map(l => l.state))].sort(), [allRockyLocations]);

  const locationsForSelectedState = useMemo(() => 
    selectedUSState ? allRockyLocations.filter(l => l.state === selectedUSState) : [],
    [allRockyLocations, selectedUSState]
  );

  const locationsGroupedByState = useMemo(() => {
    return allRockyLocations.reduce((acc, location) => {
      if (!acc[location.state]) acc[location.state] = [];
      acc[location.state].push(location);
      return acc;
    }, {});
  }, [allRockyLocations]);

  // Optimized handler with useCallback
  const focusOnMapLocation = useCallback((lat, lon, name) => {
    const mainName = name.split(',')[0].trim();
    const cleanName = mainName.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '').toLowerCase();
    window.open(`/location-from-me/how-far-is-${cleanName}-from-me`, '_blank', 'noopener,noreferrer');
  }, []);

  return (
    <>
      <Head>
        <title>LocateMyCity - Rocky Locations Explorer</title>
        <meta name="description" content="Discover unique U.S. cities with 'Rock' in their names" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Load fonts asynchronously */}
        <link 
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" 
          rel="stylesheet"
          media="print" 
          onLoad="this.onload=null;this.media='all'" 
        />
        <noscript>
          <link 
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" 
            rel="stylesheet"
          />
        </noscript>
        
        {/* Load Leaflet CSS asynchronously */}
        <link 
          rel="preload" 
          href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" 
          as="style" 
          onLoad="this.onload=null;this.rel='stylesheet'"
        />
        <noscript>
          <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
        </noscript>

        {/* Inline critical CSS */}
        <style dangerouslySetInnerHTML={{
          __html: `
            .loading-indicator {
              display: flex;
              align-items: center;
              gap: 0.5rem;
            }
            .loading-spinner {
              border: 2px solid rgba(0,0,0,0.1);
              border-radius: 50%;
              border-top: 2px solid #000;
              width: 16px;
              height: 16px;
              animation: spin 1s linear infinite;
            }
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            .visually-hidden {
              position: absolute;
              width: 1px;
              height: 1px;
              padding: 0;
              margin: -1px;
              overflow: hidden;
              clip: rect(0, 0, 0, 0);
              white-space: nowrap;
              border: 0;
            }
            .skip-link {
              position: absolute;
              left: -9999px;
              top: 0;
              background: #000;
              color: white;
              padding: 10px;
              z-index: 100;
            }
            .skip-link:focus {
              left: 0;
            }
          `
        }} />
      </Head>

      {/* Skip to content link */}
      <a href="#main-content" className="skip-link">Skip to main content</a>

      <Header role="banner" />

      <main id="main-content" tabIndex="-1">
        <section className="hero-banner" aria-labelledby="main-heading" aria-describedby="hero-desc">
          <div className="content-container">
            <h1 id="main-heading" className="main-heading">Cities with "Rock" in the Name</h1>
            <p id="hero-desc" className="hero-subtitle">Discover unique U.S. cities celebrating America's geological heritage</p>
          </div>
        </section>

        <section className="location-statistics" aria-labelledby="statistics-heading">
          <div className="content-container">
            <h2 id="statistics-heading" className="visually-hidden">Location Statistics</h2>
            <div className="stats-grid">
              <div className="stat-card" role="region" aria-labelledby="common-names-heading">
                <div className="stat-content">
                  <h3 id="common-names-heading" className="stat-title">Most Common Names</h3>
                  <ul className="stat-list">
                    {isDataLoading ? (
                      <LoadingIndicator message="Loading data..." />
                    ) : (
                      commonLocationNames.map(([name, count]) => (
                        <li key={name} className="stat-item">
                          <span>{name}</span> <strong>{count} locations</strong>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              </div>

              <div className="stat-card" role="region" aria-labelledby="states-most-heading">
                <div className="stat-content">
                  <h3 id="states-most-heading" className="stat-title">States with Most</h3>
                  <ul className="stat-list">
                    {isDataLoading ? (
                      <LoadingIndicator message="Loading data..." />
                    ) : (
                      statesWithMostLocations.map(([state, count]) => (
                        <li key={state} className="stat-item">
                          <span>{state}</span> <strong>{count} cities</strong>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              </div>

              <div className="stat-card" role="region" aria-labelledby="notable-locations-heading">
                <div className="stat-content">
                  <h3 id="notable-locations-heading" className="stat-title">Notable Locations</h3>
                  <ul className="stat-list">
                    {isDataLoading ? (
                      <LoadingIndicator message="Loading data..." />
                    ) : (
                      [
                        { name: "Little Rock, AR", description: "State Capital" },
                        { name: "Rockville, MD", description: "DC Suburb" },
                        { name: "Rock Springs, WY", description: "Historic" },
                        { name: "Rock Hill, SC", description: "Major City" }
                      ].map(location => (
                        <li key={location.name} className="stat-item">
                          <span>{location.name}</span> <strong>{location.description}</strong>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="interactive-map-section" aria-labelledby="map-heading">
          <div className="content-container">
            <h2 id="map-heading" className="section-heading">Interactive Map</h2>
            {isDataLoading ? (
              <LoadingIndicator message="Loading map..." />
            ) : (
              <MapWithNoSSR locations={allRockyLocations} />
            )}
          </div>
        </section>

        <section className="state-browser-section" aria-labelledby="state-browser-heading">
          <div className="content-container">
            <h2 id="state-browser-heading" className="section-heading">Browse by State</h2>
            <div className="state-buttons-container" role="group" aria-label="US States">
              {isDataLoading ? (
                <LoadingIndicator message="Loading states..." />
              ) : (
                <StateButtons 
                  uniqueUSStates={uniqueUSStates}
                  selectedUSState={selectedUSState}
                  setSelectedUSState={setSelectedUSState}
                />
              )}
            </div>

            {selectedUSState && (
              <div 
                className="state-locations-container" 
                style={{ marginTop: '2rem' }} 
                role="region" 
                aria-labelledby={`${selectedUSState}-locations-heading`}
              >
                <div className="state-location-group">
                  <h3 
                    id={`${selectedUSState}-locations-heading`} 
                    className="state-group-heading" 
                    tabIndex="-1" 
                    ref={stateHeadingRef}
                  >
                    {selectedUSState}
                  </h3>
                  <div className="location-list">
                    {locationsForSelectedState.map(location => (
                      <div key={`${location.name}-${location.county}-${location.lat}-${location.lon}`} className="location-item">
                        <span className="location-name">{location.name}</span>
                        <button 
                          className="map-view-button" 
                          onClick={() => focusOnMapLocation(location.lat, location.lon, location.name)}
                          aria-label={`View ${location.name} on map in new window`}
                          aria-describedby={`location-${location.name}-desc`}
                        >
                          View on Map
                        </button>
                        <span id={`location-${location.name}-desc`} className="visually-hidden">
                          Opens in a new window
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="all-locations-section" aria-labelledby="all-locations-heading">
          <div className="content-container">
            <h2 id="all-locations-heading" className="section-heading">All Locations by State</h2>
            {isDataLoading ? (
              <LoadingIndicator message="Loading all locations..." />
            ) : (
              Object.keys(locationsGroupedByState).sort().map(state => (
                <div key={state} className="state-location-group" role="region" aria-labelledby={`${state}-all-locations-heading`}>
                  <h3 id={`${state}-all-locations-heading`} className="state-group-heading">{state}</h3>
                  <div className="location-list">
                    {locationsGroupedByState[state].map(location => (
                      <div key={`${location.name}-${location.county}-${location.lat}-${location.lon}`} className="location-item">
                        <span className="location-name">{location.name}</span>
                        <button 
                          className="map-view-button" 
                          onClick={() => focusOnMapLocation(location.lat, location.lon, location.name)}
                          aria-label={`View ${location.name} on map in new window`}
                          aria-describedby={`location-${location.name}-desc`}
                        >
                          View on Map
                        </button>
                        <span id={`location-${location.name}-desc`} className="visually-hidden">
                          Opens in a new window
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>

      <Footer role="contentinfo" />
    </>
  );
}