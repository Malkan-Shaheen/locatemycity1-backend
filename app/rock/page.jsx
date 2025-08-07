'use client';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

// Dynamically import Leaflet to avoid SSR issues
const MapWithNoSSR = dynamic(() => import('../../components/MapComponent'), { ssr: false });

export default function RockyLocationsExplorer() {
  const [allRockyLocations, setAllRockyLocations] = useState([]);
  const [selectedUSState, setSelectedUSState] = useState(null);
  const [isDataLoading, setIsDataLoading] = useState(true);

  // Load data from rock
  useEffect(() => {
    const loadLocationData = async () => {
      try {
        setIsDataLoading(true);
        const backendUrl = 'https://locate-my-city-backend-production-e8a2.up.railway.app';
        console.log("Fetching from:", backendUrl);

        const response = await fetch(`${backendUrl}/api/locations`);
        console.log("Response status:", response.status);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const locationData = await response.json();
        console.log("Fetched data:", locationData);
        setAllRockyLocations(locationData);
      } catch (error) {
        console.error('Error loading location data:', error);
      } finally {
        setIsDataLoading(false);
      }
    };

    loadLocationData();
  }, []);

  // Calculate most common names
  const getCommonLocationNames = () => {
    const nameFrequency = {};
    allRockyLocations.forEach(location => {
      nameFrequency[location.name] = (nameFrequency[location.name] || 0) + 1;
    });
    return Object.entries(nameFrequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4);
  };

  // Calculate states with most locations
  const getStatesWithMostLocations = () => {
    const stateFrequency = {};
    allRockyLocations.forEach(location => {
      stateFrequency[location.state] = (stateFrequency[location.state] || 0) + 1;
    });
    return Object.entries(stateFrequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4);
  };

  // Get unique states
  const uniqueUSStates = [...new Set(allRockyLocations.map(l => l.state))].sort();

  // Get locations for selected state
  const locationsForSelectedState = selectedUSState 
    ? allRockyLocations.filter(l => l.state === selectedUSState)
    : [];

  // Group locations by state for all countries section
  const locationsGroupedByState = allRockyLocations.reduce((acc, location) => {
    if (!acc[location.state]) {
      acc[location.state] = [];
    }
    acc[location.state].push(location);
    return acc;
  }, {});

  // Focus on a specific location
  const focusOnMapLocation = (lat, lon, name) => {
    // Extract just the main name (before any comma)
    const mainName = name.split(',')[0].trim();
    
    // Clean the name to be URL-friendly:
    // 1. Replace spaces with hyphens
    // 2. Remove special characters
    // 3. Convert to lowercase
    const cleanName = mainName
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/[^a-zA-Z0-9-]/g, '') // Remove special chars
      .toLowerCase(); // Convert to lowercase
    
    // Open the how-far-is page with just the clean name
    window.open(`/location-from-me/how-far-is-${cleanName}-from-me`, '_blank');
  };

  return (
    <>
      <Head>
        <title>LocateMyCity - Rocky Locations Explorer</title>
        <meta name="description" content="Discover unique U.S. cities with 'Rock' in their names" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
      </Head>

      <div aria-hidden="true" style={{ display: 'none' }}></div>

      <header className="site-header" role="banner">
        <div className="header-wrapper">
          {/* Floating circles - decorative only */}
          <div className="decorative-circle" style={{ width: '80px', height: '80px', top: '20%', left: '10%' }} aria-hidden="true"></div>
          <div className="decorative-circle" style={{ width: '120px', height: '120px', bottom: '-30%', right: '15%' }} aria-hidden="true"></div>
          <div className="decorative-circle" style={{ width: '60px', height: '60px', top: '50%', left: '80%' }} aria-hidden="true"></div>
          
          <div className="header-content-wrapper">
            <div className="site-logo">
              <Image 
                src="/Images/cityfav.png" 
                alt="LocateMyCity Logo" 
                width={50} 
                height={50} 
                className="logo-img"
                priority
              />
              <h1>LocateMyCity</h1>
            </div>
            <nav className="main-navigation" role="navigation" aria-label="Main navigation">
              <a href="/" title="Home">HOME</a>
              <Link href="/about" passHref legacyBehavior>
                <a title="About Us">ABOUT US</a>
              </Link>
              <Link href="/contact" passHref legacyBehavior>
                <a title="Contact Us">CONTACT US</a>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main id="main-content" role="main">
        <section className="hero-banner" aria-labelledby="main-heading">
          <div className="content-container">
            <h1 id="main-heading" className="main-heading">Cities with "Rock" in the Name</h1>
            <p className="hero-subtitle">Discover unique U.S. cities celebrating America's geological heritage</p>
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
                      <div className="loading-indicator" aria-live="polite" aria-busy="true">
                        <div className="loading-spinner" aria-hidden="true"></div>
                        <span>Loading data...</span>
                      </div>
                    ) : (
                      getCommonLocationNames().map(([name, count]) => (
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
                      <div className="loading-indicator" aria-live="polite" aria-busy="true">
                        <div className="loading-spinner" aria-hidden="true"></div>
                        <span>Loading data...</span>
                      </div>
                    ) : (
                      getStatesWithMostLocations().map(([state, count]) => (
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
                      <div className="loading-indicator" aria-live="polite" aria-busy="true">
                        <div className="loading-spinner" aria-hidden="true"></div>
                        <span>Loading data...</span>
                      </div>
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
              <div className="loading-indicator" aria-live="polite" aria-busy="true">
                <div className="loading-spinner" aria-hidden="true"></div>
                <span>Loading map...</span>
              </div>
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
                <div className="loading-indicator" aria-live="polite" aria-busy="true">
                  <div className="loading-spinner" aria-hidden="true"></div>
                  <span>Loading states...</span>
                </div>
              ) : (
                uniqueUSStates.map(state => (
                  <button 
                    key={state} 
                    className="state-button" 
                    onClick={() => setSelectedUSState(state)}
                    aria-label={`Show locations in ${state}`}
                  >
                    <span>{state}</span>
                  </button>
                ))
              )}
            </div>
            {selectedUSState && (
              <div className="state-locations-container" style={{ marginTop: '2rem' }} role="region" aria-labelledby={`${selectedUSState}-locations-heading`}>
                <div className="state-location-group">
                  <h3 id={`${selectedUSState}-locations-heading`} className="state-group-heading">{selectedUSState}</h3>
                  <div className="location-list">
                    {locationsForSelectedState.map(location => (
                      <div key={`${location.name}-${location.county}-${location.lat}-${location.lon}`} className="location-item">
                        <span className="location-name">{location.name}</span>
                        <button 
                          className="map-view-button" 
                          onClick={() => focusOnMapLocation(location.lat, location.lon, location.name)}
                          aria-label={`View ${location.name} on map`}
                        >
                          View on Map
                        </button>
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
              <div className="loading-indicator" aria-live="polite" aria-busy="true">
                <div className="loading-spinner" aria-hidden="true"></div>
                <span>Loading all locations...</span>
              </div>
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
                          aria-label={`View ${location.name} on map`}
                        >
                          View on Map
                        </button>
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