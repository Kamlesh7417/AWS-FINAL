import React from 'react';
import { motion } from 'framer-motion';
import { 
  ChatBubbleLeftRightIcon,
  PaperClipIcon,
  UserIcon,
  BuildingOfficeIcon,
  TruckIcon,
  PhoneIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import { Communication } from '../../store/slices/shipmentSlice';

interface Attachment {
  name: string;
  url: string;
}

// Update the component with proper types
const ShipmentCommunications: React.FC<{ communications?: Communication[] }> = ({ 
  communications = [] 
}) => {
  // Rest of the component implementation remains the same, but with proper types for attachment and i
  const renderAttachment = (attachment: Attachment, i: number) => {
    // Attachment rendering logic
  };
  
  // Rest of the component implementation
};