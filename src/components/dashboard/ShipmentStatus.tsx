import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ShipmentStatus: React.FC = () => {
  const { t } = useTranslation();

  const data = {
    labels: [
      t('metrics.delivered'),
      t('metrics.in_transit'),
      t('metrics.pending'),
    ],
    datasets: [
      {
        data: [120, 30, 6],
        backgroundColor: ['#10b981', '#3b82f6', '#f59e0b'],
        hoverBackgroundColor: ['#059669', '#2563eb', '#d97706'],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {t('metrics.shipment_status')}
      </h3>
      <div className="h-[300px] relative">
        <Doughnut data={data} options={options} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-900">156</p>
            <p className="text-sm text-gray-600">{t('metrics.total_shipments')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipmentStatus;
