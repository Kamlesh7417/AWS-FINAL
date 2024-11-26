import { Link } from 'react-router-dom'; // Add this import
import { motion } from 'framer-motion';
import { 
  ShoppingBagIcon, 
  GlobeAsiaAustraliaIcon,
  TruckIcon,
  DocumentTextIcon,
  ChartBarIcon,
  UserGroupIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

const Landing: React.FC = () => {
  const features = [
    {
      icon: GlobeAsiaAustraliaIcon,
      title: 'Global Market Access',
      description: 'Expand your business globally with our comprehensive export platform',
    },
    {
      icon: SparklesIcon,
      title: 'AI Rate Negotiation',
      description: 'Automated rate negotiation with carriers for best pricing',
    },
    {
      icon: DocumentTextIcon,
      title: 'Smart Documentation',
      description: 'AI-powered document generation and compliance checks',
    },
    {
      icon: ChartBarIcon,
      title: 'Real-time Analytics',
      description: 'Advanced insights and predictive analytics for better decisions',
    },
    {
      icon: UserGroupIcon,
      title: 'AI Support Team',
      description: 'Intelligent virtual agents available 24/7 for assistance',
    },
    {
      icon: TruckIcon,
      title: 'Smart Shipping',
      description: 'AI-powered rate negotiation for optimal savings',
    },
  ];

  const benefits = [
    'Save up to 30% with AI rate negotiation',
    'Automated customs documentation',
    'Real-time shipment tracking',
    'AI-powered rate negotiation',
    'Multi-carrier rate comparison',
    'AI-powered compliance checks',
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="animated-bg"></div>

      {/* Navigation */}
      <nav className="relative z-10 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-r from-primary-500 to-accent-500 p-2 rounded-xl shadow-lg"
              >
                <ShoppingBagIcon className="h-8 w-8 text-white" />
              </motion.div>
              <span className="ml-2 text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                ExportEdge
              </span>
            </div>
            <div className="flex items-center space-x-4">
              {/* Updated Login Link */}
              <Link to="/seller/login" className="btn btn-secondary">
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Rest of the component remains unchanged */}
    </div>
  );
};

export default Landing;
