import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Package, MapPin, AlertCircle, Sparkles, TrendingUp } from 'lucide-react';
import { useAI } from '../hooks/useAI';

interface ShippingOption {
  carrier: string;
  logo: string;
  service: string;
  days: string;
  originalPrice: number;
  discountedPrice: number;
  aiSavings: number;
  reliability: number;
  count: number;
  type: 'Cost-Effective' | 'Balanced' | 'Urgent' | 'Best Option';
}

interface NewShipmentModalProps {
  onClose: () => void;
  orderId?: string;
}

const NewShipmentModal = ({ onClose, orderId = 'ORD001' }: NewShipmentModalProps) => {
  const [step, setStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState<ShippingOption | null>(null);
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    weight: '',
    dimensions: '',
    quantity: '',
  });

  const { suggestions, loading } = useAI(orderId);

  useEffect(() => {
    if (suggestions) {
      setFormData({
        origin: suggestions.origin || '',
        destination: suggestions.destination || '',
        weight: suggestions.weight || '',
        dimensions: suggestions.dimensions || '',
        quantity: '1',
      });
    }
  }, [suggestions]);

  const shippingOptions: ShippingOption[] = [
    {
      carrier: 'Maersk',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Maersk_Group_Logo.svg/2560px-Maersk_Group_Logo.svg.png',
      service: 'Standard Sea Freight',
      days: '30-35',
      originalPrice: 55000,
      discountedPrice: 52000,
      aiSavings: 3000,
      reliability: 98,
      count: 150,
      type: 'Cost-Effective',
    },
    {
      carrier: 'DHL',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/DHL_Logo.svg/2560px-DHL_Logo.svg.png',
      service: 'Air Freight',
      days: '5-7',
      originalPrice: 95000,
      discountedPrice: 90000,
      aiSavings: 5000,
      reliability: 99.5,
      count: 50,
      type: 'Best Option',
    },
    {
      carrier: 'MSC',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/MSC_Logo.svg/2560px-MSC_Logo.svg.png',
      service: 'Express Sea Freight',
      days: '25-30',
      originalPrice: 65000,
      discountedPrice: 61000,
      aiSavings: 4000,
      reliability: 97,
      count: 80,
      type: 'Balanced',
    },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    })
      .format(price)
      .replace('INR', '₹');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-saffron to-primary-600 bg-clip-text text-transparent">
              Create New Shipment
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>
          <div className="mt-4 flex items-center space-x-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`flex items-center ${i !== 3 ? 'flex-1' : ''}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= i
                      ? 'bg-gradient-to-r from-saffron to-primary-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {i}
                </div>
                {i !== 3 && (
                  <div
                    className={`h-1 flex-1 mx-2 ${
                      step > i ? 'bg-gradient-to-r from-saffron to-primary-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="p-6">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2 p-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary-600 border-t-transparent" />
                    <span className="text-primary-600">Loading AI suggestions...</span>
                  </div>
                ) : (
                  suggestions && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gradient-to-r from-primary-50 to-saffron/10 rounded-lg p-4 flex items-start space-x-3"
                    >
                      <Sparkles className="h-5 w-5 text-primary-600 mt-1" />
                      <div>
                        <h4 className="text-sm font-medium text-primary-800">
                          AI Suggestions Applied
                        </h4>
                        <p className="text-sm text-primary-600">
                          We've pre-filled some fields based on your order details.
                        </p>
                      </div>
                    </motion.div>
                  )
                )}

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Origin
                    </label>
                    <div className="mt-1 relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="text"
                        name="origin"
                        value={formData.origin}
                        onChange={handleInputChange}
                        className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        placeholder="Enter origin location"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Destination
                    </label>
                    <div className="mt-1 relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="text"
                        name="destination"
                        value={formData.destination}
                        onChange={handleInputChange}
                        className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        placeholder="Enter destination location"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default NewShipmentModal;
