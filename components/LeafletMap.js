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
    if (!source || !destination || !mapContainerRef.current) {
      return;
    }
    cleanupMap();

    try {
      const map = L.map(mapContainerRef.current, {
        preferCanvas: true,
        zoomControl: false,
        attributionControl: false,
        doubleClickZoom: false,
        inertia: false
      });
      mapInstanceRef.current = map;
      const layerGroup = L.layerGroup().addTo(map);
      layerGroupRef.current = layerGroup;
      const centerLat = (parseFloat(source.lat) + parseFloat(destination.lat)) / 2;
      const centerLng = (parseFloat(source.lng) + parseFloat(destination.lng)) / 2;
      map.setView([centerLat, centerLng], 3);
      const isHighDPI = window.devicePixelRatio > 1;
      L.tileLayer(
        isHighDPI 
          ? 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}@2x.png'
          : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          maxZoom: 19,
          tileSize: isHighDPI ? 512 : 256,
          zoomOffset: isHighDPI ? -1 : 0,
          errorTileUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='
        }
      ).addTo(map);
      const createIcon = (color) => L.icon({
        iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });
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
      try {
        const line = L.polyline(
          [[source.lat, source.lng], [destination.lat, destination.lng]],
          { color: '#3388ff', weight: 3, dashArray: '5,5' }
        ).addTo(layerGroup);
        const midpoint = line.getBounds().getCenter();
        L.marker(midpoint, {
          icon: L.divIcon({
            html: `<div class="distance-label">${distance.toFixed(1)} km</div>`,
            className: 'distance-label-container',
            iconSize: [100, 30]
          }),
          interactive: false 
        }).addTo(layerGroup);
      } catch (lineError) {
        console.error('Failed to create connection line:', lineError);
      }
      map.fitBounds([
        [source.lat, source.lng],
        [destination.lat, destination.lng]
      ], { padding: [50, 50] });

      L.control.zoom({ position: 'topright' }).addTo(map);
      L.control.attribution({ position: 'bottomright' }).addTo(map);
      setMapInitialized(true);
      setMapError(false);

    } catch (error) {
      console.error('Map initialization failed:', error);
      cleanupMap();
      setMapError(true);
    }
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