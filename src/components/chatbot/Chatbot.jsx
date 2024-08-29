import React, { useEffect, useState } from 'react';

const Chatbot = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!document.getElementById('botpress-script')) {
      const botScript = document.createElement('script');
      botScript.id = 'botpress-script';
      botScript.src = 'https://cdn.botpress.cloud/webchat/v2.1/inject.js';
      botScript.async = true;

      document.body.appendChild(botScript);

      botScript.onload = () => {
        setIsLoaded(true); 
      };
    } else {
      setIsLoaded(true); 
    }

    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <div>
      {isLoaded && (
        <div id="bp-web-widget" />
      )}
    </div>
  );
};

export default Chatbot;
