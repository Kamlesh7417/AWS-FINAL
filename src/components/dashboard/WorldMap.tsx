import React from 'react';
import { useTranslation } from 'react-i18next';

interface Hub {
  location: string;
  volume: number;
}

const hubs: Hub[] = [
  { location: 'USA', volume: 150 },
  { location: 'UK', volume: 120 },
  { location: 'Australia', volume: 100 },
];

const WorldMap: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {t('metrics.global_presence')}
      </h3>
      <div className="space-y-4">
        {hubs.map((hub, index) => (
          <div
            key={index}
            className="p-4 bg-white shadow rounded-lg flex justify-between items-center"
          >
            <div>
              <h4 className="text-md font-medium text-gray-800">{hub.location}</h4>
              <p className="text-sm text-gray-600">
                {t('metrics.shipment_volume')}: {hub.volume}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorldMap;
