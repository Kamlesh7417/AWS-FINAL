import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

export interface Shipment {
  id: string;
  origin: {
    lat: number;
    lng: number;
    name: string;
  };
  destination: {
    lat: number;
    lng: number;
    name: string;
  };
  status: string;
}

interface ShipmentMapProps {
  shipment: Shipment;
}

const ShipmentMap: React.FC<ShipmentMapProps> = ({ shipment }) => {
  const markerIcon = new Icon({
    iconUrl: '/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  const center = {
    lat: (shipment.origin.lat + shipment.destination.lat) / 2,
    lng: (shipment.origin.lng + shipment.destination.lng) / 2,
  };

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={4}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[shipment.origin.lat, shipment.origin.lng]} icon={markerIcon}>
        <Popup>{shipment.origin.name}</Popup>
      </Marker>
      <Marker position={[shipment.destination.lat, shipment.destination.lng]} icon={markerIcon}>
        <Popup>{shipment.destination.name}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default ShipmentMap;
