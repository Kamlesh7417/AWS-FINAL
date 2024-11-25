import React, { useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { Icon } from 'leaflet';
import { Shipment } from '../../utils/mockData';
import 'leaflet/dist/leaflet.css';

interface ShipmentMapProps {
  shipment: Shipment;
}

// Rest of the component implementation remains the same