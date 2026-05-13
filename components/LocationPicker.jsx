'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet with Next.js
const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function MapEvents({ onLocationSelect }) {
  useMapEvents({
    click(e) {
      onLocationSelect(e.latlng);
    },
  });
  return null;
}

function ChangeView({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, 15);
    }
  }, [center, map]);
  return null;
}

export default function LocationPicker({ selectedLocation, onLocationChange }) {
  const defaultPos = { lat: 31.5204, lng: 74.3587 };
  const [currentPos, setCurrentPos] = useState(
    selectedLocation && selectedLocation.lat && selectedLocation.lng 
      ? selectedLocation 
      : defaultPos
  );

  const markerPosition = useMemo(() => {
    if (selectedLocation && selectedLocation.lat && selectedLocation.lng) {
      return [selectedLocation.lat, selectedLocation.lng];
    }
    return [currentPos.lat, currentPos.lng];
  }, [selectedLocation, currentPos]);

  const eventHandlers = useMemo(
    () => ({
      dragend(e) {
        const marker = e.target;
        const position = marker.getLatLng();
        onLocationChange(position);
      },
    }),
    [onLocationChange]
  );

  return (
    <div className="w-full h-[300px] rounded-xl overflow-hidden border border-slate-200 relative">
      <MapContainer
        center={markerPosition}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          draggable={true}
          eventHandlers={eventHandlers}
          position={markerPosition}
          icon={icon}
        />
        <MapEvents onLocationSelect={onLocationChange} />
        <ChangeView center={markerPosition} />
      </MapContainer>
      
      <div className="absolute bottom-2 right-2 z-[1000]">
        <button
          type="button"
          onClick={() => {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition((pos) => {
                const newPos = { lat: pos.coords.latitude, lng: pos.coords.longitude };
                setCurrentPos(newPos);
                onLocationChange(newPos);
              });
            }
          }}
          className="bg-white p-2 rounded-lg shadow-md border border-slate-200 text-secondary hover:bg-slate-50 transition-colors"
          title="Get My Location"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>
        </button>
      </div>
    </div>
  );
}
