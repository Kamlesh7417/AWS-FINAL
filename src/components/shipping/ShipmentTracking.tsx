import React from 'react';
import { motion } from 'framer-motion';
import { TruckIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

export interface TrackingEvent {
  id: string;
  timestamp: string;
  location: string;
  status: string;
  description: string;
}

interface ShipmentTrackingProps {
  shipmentId: string;
  events: TrackingEvent[];
  status: string;
  progress: number;
}

const ShipmentTracking: React.FC<ShipmentTrackingProps> = ({
  shipmentId,
  events,
  status,
  progress
}) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Tracking #{shipmentId}</h3>
        <div className="flex items-center space-x-2">
          <TruckIcon className="h-5 w-5 text-primary-600" />
          <span className="text-sm font-medium">{status}</span>
        </div>
      </div>

      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-primary-600 bg-primary-200">
              Progress
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold inline-block text-primary-600">
              {progress}%
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary-200">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-500"
          />
        </div>
      </div>

      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <CheckCircleIcon className="h-5 w-5 text-primary-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{event.status}</p>
              <p className="text-sm text-gray-500">{event.description}</p>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(event.timestamp).toLocaleString()} • {event.location}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShipmentTracking;
