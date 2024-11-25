import React from 'react';
import { motion } from 'framer-motion';
import { ChatBubbleLeftRightIcon, PaperClipIcon } from '@heroicons/react/24/outline';

export interface Communication {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
  attachments?: Array<{
    name: string;
    url: string;
  }>;
}

interface ShipmentCommunicationsProps {
  communications?: Communication[];
}

const ShipmentCommunications: React.FC<ShipmentCommunicationsProps> = ({ communications = [] }) => {
  const renderAttachment = (attachment: { name: string; url: string }, index: number) => (
    <motion.a
      key={index}
      href={attachment.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg hover:bg-gray-100"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <PaperClipIcon className="h-4 w-4 text-gray-500" />
      <span className="text-sm text-gray-700">{attachment.name}</span>
    </motion.a>
  );

  return (
    <div className="space-y-4">
      {communications.map((comm) => (
        <div key={comm.id} className="flex flex-col space-y-2">
          <div className="flex items-start space-x-2">
            <ChatBubbleLeftRightIcon className="h-5 w-5 text-gray-500 mt-1" />
            <div className="flex-1">
              <p className="text-sm text-gray-700">{comm.message}</p>
              <span className="text-xs text-gray-500">
                {new Date(comm.timestamp).toLocaleString()}
              </span>
            </div>
          </div>
          {comm.attachments && comm.attachments.length > 0 && (
            <div className="ml-7 space-y-2">
              {comm.attachments.map((attachment, i) => renderAttachment(attachment, i))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ShipmentCommunications;
