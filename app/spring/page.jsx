'use client';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '../../components/Footer'

// Dynamically import Leaflet
const MapWithNoSSR = dynamic(() => import('../../components/MapComponent'), { ssr: false });

export default function SpringLocationsExplorer() {
  const [allSprings, setAllSprings] = useState([]);
  const [selectedState, setSelectedState] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const backendUrl = 'https://locate-my-city-backend-production-e8a2.up.railway.app';
        console.log("Fetching from:", backendUrl);

        const response = await fetch(`${backendUrl}/api/springs/flat`);
        console.log("Response status:", response.status);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched data:", data);
        setAllSprings(data);
      } catch (error) {
        console.error('Error loading spring data:', error);
        setError(error.message);
        // Fallback data if API fails
        setAllSprings([
          {
            name: "Blue Springs",
            state: "Alabama",
            lat: 31.66128,
            lon: -85.50744,
            county: null
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const commonNames = () => {
    const nameCounts = {};
    allSprings.forEach(loc => {
      nameCounts[loc.name] = (nameCounts[loc.name] || 0) + 1;
    });
    return Object.entries(nameCounts).sort((a, b) => b[1] - a[1]).slice(0, 4);
  };

  const statesMost = () => {
    const stateCounts = {};
    allSprings.forEach(loc => {
      stateCounts[loc.state] = (stateCounts[loc.state] || 0) + 1;
    });
    return Object.entries(stateCounts).sort((a, b) => b[1] - a[1]).slice(0, 4);
  };

  const uniqueStates = [...new Set(allSprings.map(l => l.state))].sort();
  const stateLocations = selectedState ? allSprings.filter(l => l.state === selectedState) : [];

  const locationsByState = allSprings.reduce((acc, loc) => {
    if (!acc[loc.state]) acc[loc.state] = [];
    acc[loc.state].push(loc);
    return acc;
  }, {});

  const focusOnLocation = (lat, lon, name) => {
    // Create a clean URL path
    const cleanName = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const cleanUrl = `/location-from-me/how-far-is-${cleanName}-from-me`;
    
    // Create a hidden form to submit the data
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = cleanUrl;
    form.target = '_blank';
    form.style.display = 'none';

    // Add latitude and longitude as hidden inputs
    const addHiddenField = (name, value) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      input.value = value;
      form.appendChild(input);
    };

    addHiddenField('lat', lat);
    addHiddenField('lon', lon);

    // Add form to DOM and submit
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  };

  return (
    <>
      <Head>
        <title>Spring Locations Explorer | LocateMyCity</title>
        <meta name="description" content="Discover unique U.S. cities named after natural springs with interactive map and state-by-state listings" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet" />
      </Head>

      <a href="#main-content" className="skip-link">Skip to main content</a>

      <header className="main-header" role="banner">
        <div className="header-container">
          {/* Floating circles - decorative only */}
          <div className="floating-circle" style={{ width: '80px', height: '80px', top: '20%', left: '10%' }} aria-hidden="true"></div>
          <div className="floating-circle" style={{ width: '120px', height: '120px', bottom: '-30%', right: '15%' }} aria-hidden="true"></div>
          <div className="floating-circle" style={{ width: '60px', height: '60px', top: '50%', left: '80%' }} aria-hidden="true"></div>
          
          <div className="header-content">
            <div className="logo">
              <Image 
                src="/Images/cityfav.png" 
                alt="LocateMyCity Logo" 
                width={50} 
                height={50} 
                className="logo-image"
                priority
              />
              <span>LocateMyCity</span>
            </div>
            <nav role="navigation" aria-label="Main navigation">
              <a href="\" title="Home" aria-current="page">HOME</a>
              <Link href="/about" passHref legacyBehavior>
                <a>ABOUT US</a>
              </Link>
              <Link href="/contact" passHref legacyBehavior>
                <a>CONTACT US</a>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main id="main-content">
        <section className="page-hero" aria-labelledby="page-title">
          <div className="container">
            <h1 id="page-title">Cities with "Spring" in the Name</h1>
            <p className="subtitle">Discover unique U.S. cities named after natural springs</p>
          </div>
        </section>

        {error && (
          <div role="alert" className="error-alert">
            Error loading data: {error}. Showing sample data instead.
          </div>
        )}

        <section className="stats-section" aria-labelledby="stats-heading">
          <div className="container">
            <h2 id="stats-heading" className="sr-only">Statistics about spring locations</h2>
            <div className="stats-container">
              <div className="stat-card">
                <div className="stat-card-content">
                  <h3 className="stat-card-title">Most Common Names</h3>
                  <ul className="stat-card-list" role="list">
                    {isLoading ? (
                      <div className="loading-container" role="status" aria-busy="true">
                        <div className="spinner" aria-hidden="true"></div>
                        <span className="sr-only">Loading most common names...</span>
                      </div>
                    ) : (
                      commonNames().map(([name, count]) => (
                        <li key={name} className="stat-card-item" role="listitem">
                          <span>{name}</span> <strong>{count} locations</strong>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-card-content">
                  <h3 className="stat-card-title">States with Most</h3>
                  <ul className="stat-card-list" role="list">
                    {isLoading ? (
                      <div className="loading-container" role="status" aria-busy="true">
                        <div className="spinner" aria-hidden="true"></div>
                        <span className="sr-only">Loading states with most springs...</span>
                      </div>
                    ) : (
                      statesMost().map(([state, count]) => (
                        <li key={state} className="stat-card-item" role="listitem">
                          <span>{state}</span> <strong>{count} cities</strong>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-card-content">
                  <h3 className="stat-card-title">Notable Locations</h3>
                  <ul className="stat-card-list" role="list">
                    {isLoading ? (
                      <div className="loading-container" role="status" aria-busy="true">
                        <div className="spinner" aria-hidden="true"></div>
                        <span className="sr-only">Loading notable locations...</span>
                      </div>
                    ) : (
                      [
                        { name: "Hot Springs, AR", description: "Historic Spa Town" },
                        { name: "Sulphur Springs, TX", description: "Famous for minerals" },
                        { name: "Palm Springs, CA", description: "Desert resort" },
                        { name: "Coral Springs, FL", description: "Master-planned city" }
                      ].map(location => (
                        <li key={location.name} className="stat-card-item" role="listitem">
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

        <section className="map-section" aria-labelledby="map-heading">
          <div className="container">
            <h2 id="map-heading" className="section-title">Interactive Map</h2>
            {isLoading ? (
              <div className="loading-container" role="status" aria-busy="true">
                <div className="spinner" aria-hidden="true"></div>
                <span className="sr-only">Loading map...</span>
              </div>
            ) : (
              <MapWithNoSSR locations={allSprings} />
            )}
          </div>
        </section>

        <section className="states-section" aria-labelledby="states-heading">
          <div className="container">
            <h2 id="states-heading" className="section-title">Browse by State</h2>
            <div className="states-container" role="list">
              {isLoading ? (
                <div className="loading-container" role="status" aria-busy="true">
                  <div className="spinner" aria-hidden="true"></div>
                  <span className="sr-only">Loading states...</span>
                </div>
              ) : (
                uniqueStates.map(state => (
                  <button 
                    key={state} 
                    className="state-btn" 
                    onClick={() => setSelectedState(state)}
                    role="listitem"
                    aria-pressed={selectedState === state}
                  >
                    <span>{state}</span>
                  </button>
                ))
              )}
            </div>
            {selectedState && (
              <div id="state-countries-container" aria-live="polite" style={{ marginTop: '2rem' }}>
                <div className="state-group">
                  <h3 className="state-group-title">{selectedState}</h3>
                  <div className="countries-list" role="list">
                    {stateLocations.map(loc => (
                      <div 
                        key={`${loc.name}-${loc.lat}-${loc.lon}`} 
                        className="country-item"
                        role="listitem"
                      >
                        <span className="country-name">{loc.name}</span>
                        <button 
                          className="view-map-btn" 
                          onClick={() => focusOnLocation(loc.lat, loc.lon, loc.name)}
                          aria-label={`View ${loc.name} on map`}
                          style={{ width: '120px' }}
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

        <section className="countries-section" aria-labelledby="all-locations-heading">
          <div className="container">
            <h2 id="all-locations-heading" className="section-title">All Locations by State</h2>
            {isLoading ? (
              <div className="loading-container" role="status" aria-busy="true">
                <div className="spinner" aria-hidden="true"></div>
                <span className="sr-only">Loading all locations...</span>
              </div>
            ) : (
              Object.keys(locationsByState).sort().map(state => (
                <div key={state} className="state-group">
                  <h3 className="state-group-title">{state}</h3>
                  <div className="countries-list" role="list">
                    {locationsByState[state].map(loc => (
                      <div 
                        key={`${loc.name}-${loc.lat}-${loc.lon}-all`} 
                        className="country-item"
                        role="listitem"
                      >
                        <span className="country-name">{loc.name}</span>
                        <button 
                          className="view-map-btn" 
                          onClick={() => focusOnLocation(loc.lat, loc.lon, loc.name)}
                          aria-label={`View ${loc.name} on map`}
                          style={{ width: '120px' }}
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
          <Footer />
        </section>
      </main>

    
    </>
  );
}