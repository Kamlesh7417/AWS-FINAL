import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

// API Endpoint
const API_ENDPOINT = 'https://bi5e25o5we.execute-api.us-east-1.amazonaws.com/dev/compliance';

const AgentChat: React.FC = () => {
    const [messages, setMessages] = useState<{ sender: string; content: string }[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Scroll to the bottom of the chat
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || loading) return;

        const userMessage = newMessage.trim();

        // Append the user's message to the chat
        setMessages((prev) => [...prev, { sender: 'You', content: userMessage }]);
        setNewMessage('');
        setError(null); // Clear any previous errors
        setLoading(true);

        try {
            // Call the API
            const response = await axios.post(
                API_ENDPOINT,
                { user_input: userMessage, language: 'en' }, // Default language set to 'en'
                { headers: { 'Content-Type': 'application/json' } }
            );

            // Parse the response from the API
            const data = response.data;
            const apiMessage =
                typeof data.response === 'string'
                    ? data.response
                    : JSON.stringify(data.response, null, 2); // Pretty print JSON response if necessary

            // Append the API's response to the chat
            setMessages((prev) => [...prev, { sender: 'API', content: apiMessage }]);
        } catch (error) {
            console.error('Error:', error);

            const errorMessage =
                axios.isAxiosError(error) && error.response
                    ? `API Error: ${error.response.status} - ${error.response.statusText}`
                    : 'Failed to fetch response. Please try again later.';

            // Show error message
            setMessages((prev) => [
                ...prev,
                { sender: 'Error', content: errorMessage },
            ]);
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', backgroundColor: '#f2f2f2' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '20px', textAlign: 'center' }}>Chat API Tester</div>
            <div
                style={{
                    height: '400px',
                    overflowY: 'scroll',
                    border: '1px solid #ddd',
                    padding: '10px',
                    marginBottom: '20px',
                    backgroundColor: '#fff',
                }}
            >
                {messages.map((msg, index) => (
                    <div key={index} style={{ marginBottom: '15px' }}>
                        <strong
                            style={{
                                color: msg.sender === 'You' ? '#007BFF' : msg.sender === 'API' ? '#28A745' : '#FF0000',
                            }}
                        >
                            {msg.sender}:
                        </strong>{' '}
                        <span>{msg.content}</span>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            {error && (
                <div
                    style={{
                        backgroundColor: '#ffcccc',
                        color: '#990000',
                        padding: '10px',
                        borderRadius: '4px',
                        marginBottom: '10px',
                    }}
                >
                    {error}
                </div>
            )}
            <form onSubmit={handleSend} style={{ display: 'flex', gap: '10px' }}>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message here..."
                    style={{
                        flex: 1,
                        padding: '10px',
                        fontSize: '16px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                    }}
                    disabled={loading}
                    aria-label="Message input"
                />
                <button
                    type="submit"
                    style={{
                        padding: '10px 20px',
                        fontSize: '16px',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        backgroundColor: '#007BFF',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    disabled={loading}
                >
                    {loading ? (
                        <div
                            style={{
                                border: '2px solid #fff',
                                borderTop: '2px solid transparent',
                                borderRadius: '50%',
                                width: '16px',
                                height: '16px',
                                animation: 'spin 1s linear infinite',
                            }}
                        ></div>
                    ) : (
                        'Send'
                    )}
                </button>
            </form>
            <style>
                {`
                    @keyframes spin {
                        from {
                            transform: rotate(0deg);
                        }
                        to {
                            transform: rotate(360deg);
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default AgentChat;
