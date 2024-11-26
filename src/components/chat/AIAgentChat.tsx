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
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to the bottom of the chat whenever messages are updated
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!message.trim() || loading) return;

    const userMessage = message.trim();
    setMessage('');
    setMessages((prev) => [...prev, { sender: 'You', content: userMessage }]);
    setLoading(true);

    try {
      onSendMessage(userMessage); // Trigger external onSendMessage logic
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [
        ...prev,
        { sender: 'Error', content: 'Failed to send the message. Please try again.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const renderMessage = (sender: string, content: string) => {
    const isUser = sender === 'You';
    return (
      <div
        className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-2`}
        key={`${sender}-${content}-${Date.now()}`}
      >
        <div
          className={`rounded-lg p-3 max-w-[80%] ${
            isUser
              ? 'bg-primary-600 text-white'
              : 'bg-gray-100 text-gray-900 border border-gray-300'
          }`}
        >
          {content}
        </div>
      </div>
    );
  };

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
        {messages.map((msg, index) => renderMessage(msg.sender, msg.content))}
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
            disabled={loading}
          />
          <motion.button
            whileHover={{ scale: loading ? 1 : 1.05 }}
            whileTap={{ scale: loading ? 1 : 0.95 }}
            onClick={handleSend}
            className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default AIAgentChat;
