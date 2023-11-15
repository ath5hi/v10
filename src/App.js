import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [quote, setQuote] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const backgroundStyle = {
    backgroundImage: `url(/img/inspiration.png)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center', 
    alignItems: 'center', 
    textAlign: 'center',
    color: 'white'
  };

  const fetchKanyeQuote = async () => {
    setIsLoading(true);
    setIsTyping(false);
    try {
      const response = await axios.get('https://api.kanye.rest');
      setQuote(response.data.quote);
    } catch (error) {
      console.error('Error fetching Kanye quote:', error);
      setQuote('Failed to fetch quote');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (quote && !isLoading) {
      // Start typing animation after a short delay
      const timer = setTimeout(() => {
        setIsTyping(true);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [quote, isLoading]);

  return (
    <div className="App" style={backgroundStyle}>
      <button onClick={fetchKanyeQuote} className="quote-button">
        Ye Quote
      </button>
      {isLoading ? (
        <div className="loader"></div>
      ) : (
        quote && (
          <p className={`quote-text ${isTyping ? 'quote-text-typing' : ''}`}>
            {quote}
          </p>
        )
      )}
    </div>
  );
}

export default App;