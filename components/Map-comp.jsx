'use client';
import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function Map({ sourceCoords, destinationCoords, distance }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef([]);
  const polylineRef = useRef(null);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    // Create map instance with a more appropriate initial view
    mapInstance.current = L.map(mapRef.current, {
      zoomControl: false
    });

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapInstance.current);

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  // Update map markers and polyline
  useEffect(() => {
    if (!mapInstance.current) return;

    // Clear previous markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];
    
    // Remove previous polyline
    if (polylineRef.current) {
      polylineRef.current.remove();
    }

    // Add destination marker (always shown when available)
    if (destinationCoords) {
      const destMarker = L.marker([destinationCoords.lat, destinationCoords.lng], {
        icon: L.divIcon({
          className: 'custom-icon destination',
          html: '<div class="marker-pin"></div>',
          iconSize: [30, 42],
          iconAnchor: [15, 42]
        })
      })
      .addTo(mapInstance.current)
      .bindPopup("Destination");
      
      markersRef.current.push(destMarker);
    }

    // Add source marker if available
    if (sourceCoords) {
      const sourceMarker = L.marker([sourceCoords.lat, sourceCoords.lng], {
        icon: L.divIcon({
          className: 'custom-icon',
          html: '<div class="marker-pin"></div>',
          iconSize: [30, 42],
          iconAnchor: [15, 42]
        })
      })
      .addTo(mapInstance.current)
      .bindPopup("Your Location");
      
      markersRef.current.push(sourceMarker);
    }

    // Set appropriate view based on available coordinates
    if (destinationCoords && sourceCoords) {
      // If both points exist, show both with polyline
      polylineRef.current = L.polyline([
        [sourceCoords.lat, sourceCoords.lng],
        [destinationCoords.lat, destinationCoords.lng]
      ], { 
        color: '#4682B4',
        weight: 4,
        dashArray: '5, 5'
      }).addTo(mapInstance.current);

      mapInstance.current.fitBounds([
        [sourceCoords.lat, sourceCoords.lng],
        [destinationCoords.lat, destinationCoords.lng]
      ], { padding: [50, 50] });
    } else if (destinationCoords) {
      // If only destination exists, center on it
      mapInstance.current.setView(
        [destinationCoords.lat, destinationCoords.lng], 
        12 // Zoom level for city-level view
      );
    } else {
      // Default view if no coordinates
      mapInstance.current.setView([20, 0], 2);
    }
  }, [sourceCoords, destinationCoords, distance]);

  return (
    <div 
      ref={mapRef} 
      style={{ 
        height: '100%', 
        width: '100%',
        borderRadius: '10px',
        minHeight: '400px'
      }} 
    />
  );
}