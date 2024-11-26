import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPinIcon, SparklesIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { ShippingOption } from '../../types/shipping';

interface NewShipmentModalProps {
  onClose: () => void;
  orderId?: string;
}

const NewShipmentModal: React.FC<NewShipmentModalProps> = ({ onClose, orderId = 'ORD001' }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    weight: '',
    dimensions: '',
    quantity: '',
  });

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
              <XMarkIcon className="h-6 w-6" />
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
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Origin
                    </label>
                    <div className="mt-1 relative">
                      <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
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
                      <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
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
