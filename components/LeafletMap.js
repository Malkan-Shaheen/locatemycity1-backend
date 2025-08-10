'use client';
import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const LeafletMap = ({ source, destination, distance }) => {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const markersRef = useRef([]);
  const lineRef = useRef(null);
  const distanceLabelRef = useRef(null);

  useEffect(() => {
    // Initialize map only once
    if (!mapRef.current && mapContainerRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [0, 0],
        zoom: 2,
        worldCopyJump: true,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
      }).addTo(map);

      mapRef.current = map;
    }

    const map = mapRef.current;
    if (!map) return;

    // Clear previous markers and line
    markersRef.current.forEach(marker => map.removeLayer(marker));
    markersRef.current = [];
    if (lineRef.current) map.removeLayer(lineRef.current);
    if (distanceLabelRef.current) map.removeLayer(distanceLabelRef.current);

    if (source && destination) {
      // Create source and destination markers
      const sourceMarker = L.marker([source.lat, source.lng], {
        title: source.name,
        alt: `Source location: ${source.name}`,
        riseOnHover: true,
      }).addTo(map);

      const destMarker = L.marker([destination.lat, destination.lng], {
        title: destination.name,
        alt: `Destination location: ${destination.name}`,
        riseOnHover: true,
      }).addTo(map);

      markersRef.current = [sourceMarker, destMarker];

      // Add popups to markers
      sourceMarker.bindPopup(`<b>Source:</b> ${source.name}`).openPopup();
      destMarker.bindPopup(`<b>Destination:</b> ${destination.name}`);

      // Create a line between the points
      const line = L.polyline(
        [[source.lat, source.lng], [destination.lat, destination.lng]],
        {
          color: '#3b82f6',
          weight: 3,
          dashArray: '5, 5',
          className: 'distance-line',
        }
      ).addTo(map);

      lineRef.current = line;

      // Add distance label at midpoint
      const midpoint = [
        (source.lat + destination.lat) / 2,
        (source.lng + destination.lng) / 2,
      ];

      const distanceLabel = L.divIcon({
        html: `<div class="distance-label">${distance.toFixed(1)} km<br>(${(distance * 0.621371).toFixed(1)} mi)</div>`,
        className: 'distance-label-container',
        iconSize: [100, 40],
      });

      const labelMarker = L.marker(midpoint, {
        icon: distanceLabel,
        interactive: false,
        zIndexOffset: 1000,
      }).addTo(map);

      distanceLabelRef.current = labelMarker;

      // Fit map to show both locations with padding
      const bounds = L.latLngBounds([source.lat, source.lng], [destination.lat, destination.lng]);
      map.fitBounds(bounds, { padding: [50, 50] });
    }

    return () => {
      // Cleanup markers and layers but keep the map instance
      if (mapRef.current) {
        markersRef.current.forEach(marker => mapRef.current.removeLayer(marker));
        markersRef.current = [];
        if (lineRef.current) mapRef.current.removeLayer(lineRef.current);
        if (distanceLabelRef.current) mapRef.current.removeLayer(distanceLabelRef.current);
      }
    };
  }, [source, destination, distance]);

  // Full cleanup when component unmounts
  useEffect(() => {
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div 
      ref={mapContainerRef}
      className="h-full w-full min-h-[400px] rounded-lg shadow-md"
      aria-label="Map showing distance between locations"
      role="application"
    />
  );
};

export default LeafletMap;