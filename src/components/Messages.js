import React, { useEffect, useState } from 'react';

const Messages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch messages data from the server or any other source
    // For now, I'm using some sample data
    const sampleMessages = [
      'Hello there!',
      'Welcome to the messages page.',
      'Feel free to add more messages here.',
    ];

    setMessages(sampleMessages);
  }, []);

  return (
    <div className="messages-container">
      <h1>Messages</h1>
      <ul className="message-list">
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
};

export default Messages;
