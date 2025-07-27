'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const LeafletMap = ({ source, destination, distance }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null); // optional to ensure map doesn't get reinitialized

  useEffect(() => {
    if (!source || !destination || !mapRef.current) return;

    // Prevent reinitialization
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
    }

    const map = L.map(mapRef.current).setView(
      [
        (parseFloat(source.lat) + parseFloat(destination.lat)) / 2,
        (parseFloat(source.lng) + parseFloat(destination.lng)) / 2
      ],
      3
    );

    mapInstanceRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

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

    L.marker([source.lat, source.lng], { icon: sourceIcon })
      .addTo(map)
      .bindPopup(`<b>Source:</b> ${source.name}<br>Lat: ${source.lat}, Lng: ${source.lng}`);

    L.marker([destination.lat, destination.lng], { icon: destinationIcon })
      .addTo(map)
      .bindPopup(`<b>Destination:</b> ${destination.name}<br>Lat: ${destination.lat}, Lng: ${destination.lng}`);

    const line = L.polyline(
      [[source.lat, source.lng], [destination.lat, destination.lng]],
      { color: 'blue', weight: 2, dashArray: '5,5' }
    ).addTo(map);

    const midpoint = line.getBounds().getCenter();
    L.marker(midpoint, {
      icon: L.divIcon({
        html: `<div class="distance-label">${distance.toFixed(1)} km</div>`,
        className: 'distance-label-container',
        iconSize: [100, 30],
      }),
    }).addTo(map);

    map.fitBounds([
      [source.lat, source.lng],
      [destination.lat, destination.lng],
    ], { padding: [50, 50] });

    return () => {
      map.remove();
    };
  }, [source, destination, distance]);

  return (
    <div
      ref={mapRef}
      style={{ height: '500px', width: '100%', borderRadius: '8px' }}
    />
  );
};

export default LeafletMap;
