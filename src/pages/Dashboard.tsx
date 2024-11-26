import { ShoppingBagIcon, TruckIcon, CurrencyDollarIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import RevenueChart from '../components/dashboard/RevenueChart';
import ShipmentStatusChart from '../components/dashboard/ShipmentStatusChart';
import TopDestinationsChart from '../components/dashboard/TopDestinationsChart';
import PerformanceMetrics from '../components/dashboard/PerformanceMetrics';
import RecentUpdates from '../components/dashboard/RecentUpdates';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <ShoppingBagIcon className="h-6 w-6 text-primary-600" />
            <span className="text-2xl font-bold">124</span>
          </div>
          <p className="text-gray-600 mt-2">Total Orders</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <TruckIcon className="h-6 w-6 text-primary-600" />
            <span className="text-2xl font-bold">56</span>
          </div>
          <p className="text-gray-600 mt-2">Total Shipments</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <CurrencyDollarIcon className="h-6 w-6 text-primary-600" />
            <span className="text-2xl font-bold">$14,500</span>
          </div>
          <p className="text-gray-600 mt-2">Revenue</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <DocumentTextIcon className="h-6 w-6 text-primary-600" />
            <span className="text-2xl font-bold">32</span>
          </div>
          <p className="text-gray-600 mt-2">Pending Documents</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trends</h3>
          <RevenueChart />
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipment Status</h3>
          <ShipmentStatusChart />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Destinations</h3>
        <TopDestinationsChart />
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <PerformanceMetrics />
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <RecentUpdates />
      </div>
    </div>
  );
};

export default Dashboard;
