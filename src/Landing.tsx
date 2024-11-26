import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShoppingBagIcon,
  GlobeAsiaAustraliaIcon,
  TruckIcon,
  DocumentTextIcon,
  ChartBarIcon,
  UserGroupIcon,
  SparklesIcon,
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
              <Link to="/seller/login" className="btn btn-secondary">
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-16 lg:pt-32 lg:pb-28 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-6xl font-extrabold text-gray-900 mb-6"
          >
            Simplify Your Export Operations
          </motion.h1>
          <p className="text-lg text-gray-600 mb-8">
            Streamline documentation, optimize shipping costs, and access advanced analytics
            with ExportEdge.
          </p>
          <div className="space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-primary-500 text-white rounded-lg shadow-lg"
            >
              Get Started
            </motion.button>
            <Link
              to="/learn-more"
              className="px-6 py-3 text-primary-600 border border-primary-600 rounded-lg"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Features</h2>
            <p className="text-gray-600 mt-4">
              Tools to help your business thrive in the global marketplace.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <feature.icon className="h-10 w-10 text-primary-500" />
                  <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                </div>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Benefits</h2>
            <p className="text-gray-600 mt-4">
              Unlock new opportunities and improve efficiency with our platform.
            </p>
          </div>
          <ul className="list-disc pl-6 space-y-4">
            {benefits.map((benefit, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-lg text-gray-700"
              >
                {benefit}
              </motion.li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Landing;
