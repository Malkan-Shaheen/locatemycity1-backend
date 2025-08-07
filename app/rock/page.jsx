'use client';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const MapWithNoSSR = dynamic(() => import('../../components/MapComponent'), { ssr: false });

export default function RockyLocationsExplorer() {
  const [allRockyLocations, setAllRockyLocations] = useState([]);
  const [selectedUSState, setSelectedUSState] = useState(null);
  const [isDataLoading, setIsDataLoading] = useState(true);

  useEffect(() => {
    const loadLocationData = async () => {
      try {
        setIsDataLoading(true);
        const backendUrl = 'https://locate-my-city-backend-production-e8a2.up.railway.app';
        const response = await fetch(`${backendUrl}/api/locations`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const locationData = await response.json();
        setAllRockyLocations(locationData);
      } catch (error) {
        console.error('Error loading location data:', error);
      } finally {
        setIsDataLoading(false);
      }
    };
    loadLocationData();
  }, []);

  const getCommonLocationNames = () => {
    const nameFrequency = {};
    allRockyLocations.forEach(location => {
      nameFrequency[location.name] = (nameFrequency[location.name] || 0) + 1;
    });
    return Object.entries(nameFrequency).sort((a, b) => b[1] - a[1]).slice(0, 4);
  };

  const getStatesWithMostLocations = () => {
    const stateFrequency = {};
    allRockyLocations.forEach(location => {
      stateFrequency[location.state] = (stateFrequency[location.state] || 0) + 1;
    });
    return Object.entries(stateFrequency).sort((a, b) => b[1] - a[1]).slice(0, 4);
  };

  const uniqueUSStates = [...new Set(allRockyLocations.map(l => l.state))].sort();

  const locationsForSelectedState = selectedUSState 
    ? allRockyLocations.filter(l => l.state === selectedUSState)
    : [];

  const locationsGroupedByState = allRockyLocations.reduce((acc, location) => {
    if (!acc[location.state]) acc[location.state] = [];
    acc[location.state].push(location);
    return acc;
  }, {});

  const focusOnMapLocation = (lat, lon, name) => {
    const mainName = name.split(',')[0].trim();
    const cleanName = mainName.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '').toLowerCase();
    window.open(`/location-from-me/how-far-is-${cleanName}-from-me`, '_blank');
  };

  return (
    <>
      <Head>
        <title>Rocky Locations Explorer - LocateMyCity</title>
        <meta name="description" content="Explore cities with 'Rock' in their name using interactive maps and data." />
        <html lang="en" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
      </Head>

      <header className="site-header">
        <div className="header-wrapper">
          <div className="decorative-circle" style={{ width: '80px', height: '80px', top: '20%', left: '10%' }} aria-hidden="true"></div>
          <div className="decorative-circle" style={{ width: '120px', height: '120px', bottom: '-30%', right: '15%' }} aria-hidden="true"></div>
          <div className="decorative-circle" style={{ width: '60px', height: '60px', top: '50%', left: '80%' }} aria-hidden="true"></div>

          <div className="header-content-wrapper">
            <div className="site-logo" role="banner" aria-label="LocateMyCity Logo and Branding">
              <Image 
                src="/Images/cityfav.png" 
                alt="LocateMyCity Logo" 
                width={50} 
                height={50} 
                className="logo-img"
                priority
              />
              <span>LocateMyCity</span>
            </div>
            <nav className="main-navigation" role="navigation" aria-label="Main site navigation">
              <Link href="/" passHref legacyBehavior><a title="Home Page">HOME</a></Link>
              <Link href="/about" passHref legacyBehavior><a title="About Us Page">ABOUT US</a></Link>
              <Link href="/contact" passHref legacyBehavior><a title="Contact Page">CONTACT US</a></Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="main-content" role="main">
        <section className="hero-banner" aria-labelledby="hero-heading">
          <div className="content-container">
            <h1 id="hero-heading" className="main-heading">Cities with "Rock" in the Name</h1>
            <p className="hero-subtitle">Discover unique U.S. cities celebrating America's geological heritage</p>
          </div>
        </section>

        <section className="location-statistics" aria-label="Location Statistics">
          <div className="content-container">
            <div className="stats-grid">
              {[{
                title: 'Most Common Names',
                data: getCommonLocationNames(),
                labelFormatter: (name, count) => `${name} - ${count} locations`
              }, {
                title: 'States with Most',
                data: getStatesWithMostLocations(),
                labelFormatter: (state, count) => `${state} - ${count} cities`
              }, {
                title: 'Notable Locations',
                data: [
                  { name: "Little Rock, AR", description: "State Capital" },
                  { name: "Rockville, MD", description: "DC Suburb" },
                  { name: "Rock Springs, WY", description: "Historic" },
                  { name: "Rock Hill, SC", description: "Major City" }
                ],
                labelFormatter: (loc) => `${loc.name} - ${loc.description}`
              }].map((stat, i) => (
                <div className="stat-card" key={i} role="region" aria-labelledby={`stat-title-${i}`}>
                  <div className="stat-content">
                    <h3 id={`stat-title-${i}`} className="stat-title">{stat.title}</h3>
                    <ul className="stat-list">
                      {isDataLoading ? (
                        <div className="loading-indicator" role="status" aria-label="Loading data...">
                          <div className="loading-spinner" aria-hidden="true"></div>
                        </div>
                      ) : (
                        stat.data.map((item, index) => (
                          <li key={index} className="stat-item">
                            <span>{typeof item === 'object' ? stat.labelFormatter(item) : stat.labelFormatter(...item)}</span>
                          </li>
                        ))
                      )}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="interactive-map-section" aria-labelledby="map-heading">
          <div className="content-container">
            <h2 id="map-heading" className="section-heading">Interactive Map</h2>
            {isDataLoading ? (
              <div className="loading-indicator" role="status" aria-label="Loading map...">
                <div className="loading-spinner" aria-hidden="true"></div>
              </div>
            ) : (
              <MapWithNoSSR locations={allRockyLocations} />
            )}
          </div>
        </section>

        <section className="state-browser-section" aria-labelledby="browse-heading">
          <div className="content-container">
            <h2 id="browse-heading" className="section-heading">Browse by State</h2>
            <div className="state-buttons-container">
              {isDataLoading ? (
                <div className="loading-indicator" role="status" aria-label="Loading states...">
                  <div className="loading-spinner" aria-hidden="true"></div>
                </div>
              ) : (
                uniqueUSStates.map(state => (
                  <button 
                    key={state} 
                    className="state-button" 
                    onClick={() => setSelectedUSState(state)}
                    aria-label={`Filter by ${state}`}
                  >
                    <span>{state}</span>
                  </button>
                ))
              )}
            </div>
            {selectedUSState && (
              <div className="state-locations-container" style={{ marginTop: '2rem' }}>
                <div className="state-location-group">
                  <h3 className="state-group-heading">{selectedUSState}</h3>
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
              <div className="loading-indicator" role="status" aria-label="Loading all locations...">
                <div className="loading-spinner" aria-hidden="true"></div>
              </div>
            ) : (
              Object.keys(locationsGroupedByState).sort().map(state => (
                <div key={state} className="state-location-group">
                  <h3 className="state-group-heading">{state}</h3>
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
        <Footer />
      </main>
    </>
  );
}
