// Remove unused currentLocation from props
interface ShipmentTrackingProps {
  shipmentId: string;
  events: TrackingEvent[];
  estimatedDelivery: string;
  transportMode: 'sea' | 'air' | 'road';
  status: string;
  progress: number;
}

// Rest of the component implementation remains the same