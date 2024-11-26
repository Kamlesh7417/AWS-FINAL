import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TopDestinations: React.FC = () => {
  const { t } = useTranslation();

  const data = {
    labels: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Miami'],
    datasets: [
      {
        label: t('metrics.shipment_volume'),
        data: [120, 95, 80, 60, 50],
        backgroundColor: ['#4f46e5', '#10b981', '#f59e0b', '#3b82f6', '#ef4444'],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: t('metrics.top_destinations'),
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value: string | number) {
            return `${Number(value).toLocaleString()} shipments`;
          },
        },
      },
    },
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {t('metrics.top_destinations')}
      </h3>
      <div className="h-[300px]">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default TopDestinations;
