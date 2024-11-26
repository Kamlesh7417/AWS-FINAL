import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Phone, Video } from 'lucide-react';
import { Agent } from '../../types/agents';

interface AIAgentChatProps {
  agent: Agent;
  onSendMessage: (message: string) => void;
  onStartCall?: () => void;
  onStartVideo?: () => void;
}

const AIAgentChat: React.FC<AIAgentChatProps> = ({
  agent,
  onSendMessage,
  onStartCall,
  onStartVideo
}) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ sender: string; content: string }[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to the bottom of the chat when messages update
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (message.trim()) {
      // Add user message to chat
      const userMessage = { sender: 'You', content: message.trim() };
      setMessages((prev) => [...prev, userMessage]);

      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const renderMessage = (sender: string, content: string) => (
    <div
      className={`mb-4 ${
        sender === 'You' ? 'text-right' : 'text-left'
      }`}
    >
      <div
        className={`inline-block rounded-lg p-3 ${
          sender === 'You'
            ? 'bg-primary-600 text-white'
            : 'bg-gray-100 text-gray-900'
        }`}
      >
        <p className="text-sm">{content}</p>
      </div>
      <div className="text-xs text-gray-500 mt-1">{sender}</div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm">
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={agent.avatar}
              alt={agent.name}
              className="w-10 h-10 rounded-full"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{agent.name}</h3>
            <p className="text-sm text-gray-500">{agent.role}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {onStartCall && (
            <button
              onClick={onStartCall}
              className="p-2 text-gray-600 hover:text-primary-600 rounded-full hover:bg-gray-100"
            >
              <Phone className="h-5 w-5" />
            </button>
          )}
          {onStartVideo && (
            <button
              onClick={onStartVideo}
              className="p-2 text-gray-600 hover:text-primary-600 rounded-full hover:bg-gray-100"
            >
              <Video className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg) => renderMessage(msg.sender, msg.content))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSend}
            className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            <Send className="h-5 w-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default AIAgentChat;
