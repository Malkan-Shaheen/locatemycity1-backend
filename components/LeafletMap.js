'use client';

import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const LeafletMap = ({ source, destination, distance }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const layerRef = useRef(null);
  const [mapStatus, setMapStatus] = useState('Loading map...');
  const [isInteractive, setIsInteractive] = useState(false);

  useEffect(() => {
    if (!source || !destination || !mapRef.current) return;

    setMapStatus('Initializing map...');
    
    const cleanup = () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.eachLayer(layer => {
          if (layer.remove) layer.remove();
        });
        mapInstanceRef.current.off();
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      if (layerRef.current) {
        layerRef.current.clearLayers();
        layerRef.current = null;
      }
      setIsInteractive(false);
    };

    cleanup();

    const initMap = () => {
      try {
        const map = L.map(mapRef.current, {
          preferCanvas: true,
          zoomControl: true,
          keyboard: true,
          keyboardPanDelta: 75,
          ariaLabel: `Map showing route from ${source.name} to ${destination.name}`
        }).setView(
          [
            (parseFloat(source.lat) + parseFloat(destination.lat)) / 2,
            (parseFloat(source.lng) + parseFloat(destination.lng)) / 2
          ],
          3
        );

        // Add accessible controls
        map.zoomControl.setAttribute('aria-label', 'Map zoom controls');
        map.zoomControl._container.querySelector('.leaflet-control-zoom-in')
          .setAttribute('aria-label', 'Zoom in');
        map.zoomControl._container.querySelector('.leaflet-control-zoom-out')
          .setAttribute('aria-label', 'Zoom out');

        mapInstanceRef.current = map;
        layerRef.current = L.layerGroup().addTo(map);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" aria-label="OpenStreetMap copyright">OpenStreetMap</a> contributors',
          crossOrigin: 'anonymous'
        }).addTo(map);

        // Custom accessible markers
        const createAccessibleMarker = (latlng, icon, title, content) => {
          const marker = L.marker(latlng, {
            icon,
            alt: title,
            keyboard: true,
            title: title,
            riseOnHover: true
          });

          marker.bindPopup(content, {
            ariaLabel: `${title} details`,
            className: 'accessible-popup'
          });

          return marker;
        };

        const sourceIcon = L.icon({
          iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
        });

        const destinationIcon = L.icon({
          iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
        });

        // Add markers with enhanced accessibility
        createAccessibleMarker(
          [source.lat, source.lng],
          sourceIcon,
          `Source location: ${source.name}`,
          `<div role="document" aria-label="Source location details">
            <h3>Source</h3>
            <p>${source.name}</p>
            <p>Latitude: ${source.lat}</p>
            <p>Longitude: ${source.lng}</p>
          </div>`
        ).addTo(layerRef.current);

        createAccessibleMarker(
          [destination.lat, destination.lng],
          destinationIcon,
          `Destination location: ${destination.name}`,
          `<div role="document" aria-label="Destination location details">
            <h3>Destination</h3>
            <p>${destination.name}</p>
            <p>Latitude: ${destination.lat}</p>
            <p>Longitude: ${destination.lng}</p>
          </div>`
        ).addTo(layerRef.current);

        // Accessible route line
        const line = L.polyline(
          [[source.lat, source.lng], [destination.lat, destination.lng]],
          { 
            color: 'blue', 
            weight: 2, 
            dashArray: '5,5',
            ariaLabel: `Route between ${source.name} and ${destination.name}` 
          }
        ).addTo(layerRef.current);

        // Accessible distance label
        const midpoint = line.getBounds().getCenter();
        const distanceMarker = L.marker(midpoint, {
          icon: L.divIcon({
            html: `
              <div class="distance-label" role="status" aria-live="polite">
                ${distance.toFixed(1)} km
                <span class="sr-only">Distance between locations</span>
              </div>`,
            className: 'distance-label-container',
            iconSize: [100, 30],
          }),
          alt: `Distance: ${distance.toFixed(1)} kilometers`,
          keyboard: false // Since it's decorative
        }).addTo(layerRef.current);

        map.fitBounds(
          [
            [source.lat, source.lng],
            [destination.lat, destination.lng]
          ],
          { padding: [50, 50] }
        );

        setMapStatus(`Map loaded showing route from ${source.name} to ${destination.name}`);
        setIsInteractive(true);

        // Focus management for screen readers
        map.whenReady(() => {
          mapRef.current.setAttribute('aria-busy', 'false');
          mapRef.current.focus();
        });

      } catch (error) {
        setMapStatus('Error loading map. Please try again.');
        console.error('Map initialization error:', error);
      }
    };

    mapRef.current.setAttribute('aria-busy', 'true');
    requestAnimationFrame(initMap);

    return cleanup;
  }, [source, destination, distance]);

  return (
    <div
      ref={mapRef}
      style={{ height: '500px', width: '100%', borderRadius: '8px', position: 'relative' }}
      role="application"
      aria-label={`Interactive map ${mapStatus}`}
      aria-live="polite"
      tabIndex={0}
    >
      {/* Status indicator for screen readers */}
      <div className="sr-only" aria-live="assertive">
        {mapStatus}
      </div>
      
      {/* Fallback content for when JS fails */}
      <noscript>
        <div className="map-fallback" style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f0f0f0'
        }}>
          <p>
            Map cannot be displayed without JavaScript. Distance between {source?.name} and {destination?.name}: {distance?.toFixed(1)} km.
          </p>
        </div>
      </noscript>

      {/* Loading indicator */}
      {!isInteractive && (
        <div className="map-loading-overlay" style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(255,255,255,0.7)',
          zIndex: 1000
        }}>
          <p className="map-loading-text">{mapStatus}</p>
        </div>
      )}
    </div>
  );
};

export default LeafletMap;