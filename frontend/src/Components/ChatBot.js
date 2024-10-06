import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { Card, Form, Button } from 'react-bootstrap';

const ChatBot = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isMinimized, setIsMinimized] = useState(false);
    const messagesEndRef = useRef(null);
    const socketRef = useRef(null);
    
    useEffect(() => {
        // Initialize socket connection
        socketRef.current = io('http://localhost:8080', { transports: ['websocket'] });
        
        // Log connection status
        socketRef.current.on('connect', () => {
            console.log('Connected to Socket.IO server');
        });
    
        // Listen for bot responses
        socketRef.current.on('botResponse', (data) => {
            console.log('Bot response received:', data);
            
            // Check if data is an array or a single message
            const message = Array.isArray(data) ? data[0] : data;
    
            // Update the messages state with the bot's response
            setMessages(prevMessages => [
                ...prevMessages,
                { text: message, sender: 'bot' }
            ]);
        });
    
        // Error handling
        socketRef.current.on('connect_error', (err) => {
            console.error('Connection Error:', err);
        });
    
        // Cleanup on unmount
        return () => {
            socketRef.current.off('connect');
            socketRef.current.off('botResponse');
            socketRef.current.disconnect();
        };
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (inputMessage.trim()) {
            // Update the messages state with the user's message
            setMessages(prevMessages => [
                ...prevMessages,
                { text: inputMessage, sender: 'user' }
            ]);
            // Send the message to the backend
            socketRef.current.emit('sendMessage', inputMessage);
            setInputMessage(''); // Clear input
        }
    };

    return (
        <Card style={{ position: 'fixed', bottom: '20px', right: '20px', width: '300px', zIndex: 1000 }}>
            <Card.Header>
                Chat with our Bot
                <Button variant="link" onClick={() => setIsMinimized(!isMinimized)} style={{ float: 'right' }}>
                    {isMinimized ? '+' : '–'}
                </Button>
            </Card.Header>
            {!isMinimized && (
                <Card.Body style={{ height: '300px', overflowY: 'auto' }}>
                    {messages.map((message, index) => (
                        <div key={index} style={{ textAlign: message.sender === 'user' ? 'right' : 'left' }}>
                            <span style={{ 
                                background: message.sender === 'user' ? '#007bff' : '#f8f9fa', 
                                color: message.sender === 'user' ? 'white' : 'black',
                                padding: '5px 10px', 
                                borderRadius: '10px', 
                                display: 'inline-block',
                                marginBottom: '5px'
                            }}>
                                {message.text}
                            </span>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </Card.Body>
            )}
            {!isMinimized && (
                <Card.Footer>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="d-flex">
                            <Form.Control
                                type="text"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                placeholder="Type your message..."
                            />
                            <Button variant="primary" type="submit" className="ml-2">Send</Button>
                        </Form.Group>
                    </Form>
                </Card.Footer>
            )}
        </Card>
    );
};

export default ChatBot;