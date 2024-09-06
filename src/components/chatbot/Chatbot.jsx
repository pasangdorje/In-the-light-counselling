import React, { useEffect } from 'react';

const Chatbot = () => {
  useEffect(() => {
    // Function to dynamically load a script
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    // Load Botpress scripts
    const loadBotpress = async () => {
      try {
        // Load the inject script first
        await loadScript('https://cdn.botpress.cloud/webchat/v2.1/inject.js');
        // Then load the config script
        await loadScript('https://mediafiles.botpress.cloud/c9684d82-1f66-4f98-a908-c5ba6f15f313/webchat/v2.1/config.js');
        
        // Ensure the chat is visible after refresh
        if (window.botpressWebChat) {
          window.botpressWebChat.init();
        }
      } catch (error) {
        console.error('Error loading Botpress chatbot:', error);
      }
    };

    loadBotpress();

    // Clean up scripts when the component is unmounted
    return () => {
      const injectScript = document.querySelector('script[src="https://cdn.botpress.cloud/webchat/v2.1/inject.js"]');
      const configScript = document.querySelector('script[src="https://mediafiles.botpress.cloud/c9684d82-1f66-4f98-a908-c5ba6f15f313/webchat/v2.1/config.js"]');

      if (injectScript) document.body.removeChild(injectScript);
      if (configScript) document.body.removeChild(configScript);
    };
  }, []);

  return (
    <div>
      {/* Chatbot container */}
    </div>
  );
};

export default Chatbot;