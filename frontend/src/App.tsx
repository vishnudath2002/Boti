import { useState } from 'react'

import './App.css'

function App() {
  const [message, setMessage] = useState('');
  const [history, setHistory] = useState<string[]>([]);

  const handleSendMessage = async () => {
    if (!message) return;

    const response = await fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    setHistory((prev) => [...prev, message, data.response]);
    setMessage('');
  };

  // Inline style objects
  const containerStyle = {
    maxWidth: 480,
    margin: '40px auto',
    background: '#18181b',
    borderRadius: 18,
    boxShadow: '0 6px 32px #0002',
    padding: '2rem 1.5rem 1.5rem 1.5rem',
    display: 'flex',
    flexDirection: 'column' as const,
    minHeight: '70vh',
  };
  const titleStyle = {
    color: '#646cff',
    marginBottom: '1.5rem',
    fontSize: '2rem',
    letterSpacing: 1,
    textAlign: 'center' as const,
  };
  const historyStyle = {
    flex: 1,
    maxHeight: '50vh', // Add this line for scrollable area
    overflowY: 'auto' as const,
    marginBottom: '1.2rem',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.7rem',
  };
  const bubbleStyle = (isUser: boolean) => ({
    maxWidth: '80%',
    padding: '0.8em 1.2em',
    borderRadius: '1.2em',
    fontSize: '1.05em',
    wordBreak: 'break-word' as const,
    boxShadow: '0 2px 8px #0001',
    marginBottom: 2,
    alignSelf: isUser ? 'flex-end' : 'flex-start',
    background: isUser
      ? 'linear-gradient(90deg, #646cff 60%, #747bff 100%)'
      : '#23272f',
    color: isUser ? '#fff' : '#e2e2e2',
    transition: 'background 0.2s',
  });
  const inputAreaStyle = {
    display: 'flex',
    gap: '0.7rem',
    marginTop: '0.5rem',
  };
  const inputStyle = {
    flex: 1,
    padding: '0.7em 1em',
    borderRadius: '1.2em',
    border: '1px solid #646cff',
    fontSize: '1em',
    background: '#23272f',
    color: '#fff',
    outline: 'none',
    transition: 'border 0.2s',
  };
  const buttonStyle = {
    padding: '0.7em 1.5em',
    borderRadius: '1.2em',
    border: 'none',
    background: 'linear-gradient(90deg, #646cff 60%, #747bff 100%)',
    color: '#fff',
    fontWeight: 'bold' as const,
    fontSize: '1em',
    cursor: 'pointer',
    transition: 'background 0.2s',
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Gemini Chatbot</h1>
      <div style={historyStyle}>
        {history.map((msg, index) => (
          <div
            key={index}
            style={bubbleStyle(index % 2 === 0)}
          >
            {msg}
          </div>
        ))}
      </div>
      <div style={inputAreaStyle}>
        <input
          style={inputStyle}
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          onKeyDown={e => { if (e.key === 'Enter') handleSendMessage() }}
        />
        <button style={buttonStyle} onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  )
}

export default App
