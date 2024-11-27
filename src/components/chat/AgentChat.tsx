import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Agent, AgentMessage } from '../../types/agents';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface AgentChatProps {
  agent: Agent;
  messages: AgentMessage[];
  className?: string;
  onSendMessage?: (message: string) => void; // Handle new user messages
  updateMessages?: (newMessages: AgentMessage[]) => void; // Update messages with responses
}

const AgentChat: React.FC<AgentChatProps> = ({
  agent,
  messages,
  className = '',
  onSendMessage,
  updateMessages,
}) => {
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to the bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!newMessage.trim() || loading) return;

    // Send the user message
    onSendMessage?.(newMessage);

    setLoading(true);

    try {
      // Call appropriate API based on the agent
      const apiEndpoint =
        agent.id === 'doc-agent'
          ? 'https://bi5e25o5we.execute-api.us-east-1.amazonaws.com/dev/compliance'
          : agent.id === 'tracking-agent'
          ? 'https://zskbswe676.execute-api.us-east-1.amazonaws.com/default/Tracking-Agent'
          : agent.id === 'negotiator-agent'
          ? 'https://zskbswe676.execute-api.us-east-1.amazonaws.com/default/Negotiation-Agent'
          : '';

      if (apiEndpoint) {
        const response = await axios.post(apiEndpoint, {
          user_input: newMessage,
          language: 'en',
        });

        const aiResponse: AgentMessage = {
          id: `${Date.now()}-ai`,
          agentId: agent.id,
          content: response.data.message || 'No response available',
          timestamp: new Date().toISOString(),
          type: 'text',
        };

        // Update messages via parent callback
        updateMessages?.([aiResponse]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
      setNewMessage('');
    }
  };

  return (
    <div className={`flex flex-col h-full bg-white rounded-lg shadow-sm ${className}`}>
      <div className="p-4 border-b">
        <div className="flex items-center space-x-3">
          <img src={agent.avatar} alt={agent.name} className="w-10 h-10 rounded-full" />
          <div>
            <h3 className="font-medium text-gray-900">{agent.name}</h3>
            <p className="text-sm text-gray-500">{agent.role}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${message.agentId === agent.id ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.agentId === agent.id ? 'bg-gray-100' : 'bg-primary-600 text-white'
                }`}
              >
                <ReactMarkdown
                  className="text-sm text-gray-800 prose prose-a:text-blue-600 prose-a:underline hover:prose-a:text-blue-800"
                  remarkPlugins={[remarkGfm]}
                  linkTarget="_blank"
                >
                  {message.content}
                </ReactMarkdown>
                <span className="text-xs opacity-75 mt-1 block">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>
        <div className="p-4 border-t">
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-600 hover:text-primary-600 rounded-full hover:bg-gray-100">
            <Paperclip className="h-5 w-5" />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            disabled={loading}
          />
          <motion.button
            whileHover={{ scale: loading ? 1 : 1.05 }}
            whileTap={{ scale: loading ? 1 : 0.95 }}
            onClick={handleSend}
            disabled={loading}
            className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
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

export default AgentChat;

