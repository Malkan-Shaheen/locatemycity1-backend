'use client';

import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const LeafletMap = ({ source, destination, distance }) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const layerGroupRef = useRef(null);
  const [mapInitialized, setMapInitialized] = useState(false);
  const [mapError, setMapError] = useState(false);

  // Cleanup function
  const cleanupMap = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.off();
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }
    if (layerGroupRef.current) {
      layerGroupRef.current.clearLayers();
      layerGroupRef.current.remove();
      layerGroupRef.current = null;
    }
    setMapInitialized(false);
  };

  useEffect(() => {
    // Only initialize if we have valid data and container
    if (!source || !destination || !mapContainerRef.current) {
      return;
    }

    // Cleanup any existing map first
    cleanupMap();

    try {
      // Initialize map with explicit options
      const map = L.map(mapContainerRef.current, {
        preferCanvas: true,
        zoomControl: false,
        attributionControl: false,
        // Prevent double-tap zoom on mobile
        doubleClickZoom: false,
        // Disable inertia for better performance
        inertia: false
      });

      // Store the map instance
      mapInstanceRef.current = map;

      // Create a layer group
      const layerGroup = L.layerGroup().addTo(map);
      layerGroupRef.current = layerGroup;

      // Calculate center point
      const centerLat = (parseFloat(source.lat) + parseFloat(destination.lat)) / 2;
      const centerLng = (parseFloat(source.lng) + parseFloat(destination.lng)) / 2;

      // Set view after initialization
      map.setView([centerLat, centerLng], 3);

      // Detect high DPI displays
      const isHighDPI = window.devicePixelRatio > 1;

      // Add base tile layer
      L.tileLayer(
        isHighDPI 
          ? 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}@2x.png'
          : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          maxZoom: 19,
          tileSize: isHighDPI ? 512 : 256,
          zoomOffset: isHighDPI ? -1 : 0,
          // Prevent tile loading errors
          errorTileUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='
        }
      ).addTo(map);

      // Create custom icons
      const createIcon = (color) => L.icon({
        iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

      // Add markers with error handling
      try {
        L.marker([source.lat, source.lng], { icon: createIcon('green') })
          .addTo(layerGroup)
          .bindPopup(`<b>Source:</b> ${source.name.split(',')[0]}`);
      } catch (markerError) {
        console.error('Failed to create source marker:', markerError);
      }

      try {
        L.marker([destination.lat, destination.lng], { icon: createIcon('red') })
          .addTo(layerGroup)
          .bindPopup(`<b>Destination:</b> ${destination.name.split(',')[0]}`);
      } catch (markerError) {
        console.error('Failed to create destination marker:', markerError);
      }

      // Add connection line
      try {
        const line = L.polyline(
          [[source.lat, source.lng], [destination.lat, destination.lng]],
          { color: '#3388ff', weight: 3, dashArray: '5,5' }
        ).addTo(layerGroup);

        // Add distance label at midpoint
        const midpoint = line.getBounds().getCenter();
        L.marker(midpoint, {
          icon: L.divIcon({
            html: `<div class="distance-label">${distance.toFixed(1)} km</div>`,
            className: 'distance-label-container',
            iconSize: [100, 30]
          }),
          interactive: false // Make the label non-clickable
        }).addTo(layerGroup);
      } catch (lineError) {
        console.error('Failed to create connection line:', lineError);
      }

      // Fit bounds with padding
      map.fitBounds([
        [source.lat, source.lng],
        [destination.lat, destination.lng]
      ], { padding: [50, 50] });

      // Add controls after map is ready
      L.control.zoom({ position: 'topright' }).addTo(map);
      L.control.attribution({ position: 'bottomright' }).addTo(map);

      // Mark map as initialized
      setMapInitialized(true);
      setMapError(false);

    } catch (error) {
      console.error('Map initialization failed:', error);
      cleanupMap();
      setMapError(true);
    }

    // Cleanup on unmount
    return cleanupMap;
  }, [source, destination, distance]);

  if (mapError) {
    return (
      <div className="map-error-container">
        <p>Failed to load the map. Please refresh the page or try again later.</p>
      </div>
    );
  }

  return (
    <div
      ref={mapContainerRef}
      className="leaflet-map-container"
      style={{
        height: '500px',
        width: '100%',
        borderRadius: '8px',
        backgroundColor: mapInitialized ? 'transparent' : '#f5f5f5'
      }}
    >
      {!mapInitialized && !mapError && (
        <div className="map-loading-overlay">
          <div className="loading-spinner"></div>
          <p>Loading map...</p>
        </div>
      )}
    </div>
  );
};

export default LeafletMap;