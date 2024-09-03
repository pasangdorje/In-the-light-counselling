import React, { useEffect } from "react";

const Chatbot = () => {

  useEffect(() => {
    // Load the Botpress
    const script1 = document.createElement("script");
    script1.src = "https://cdn.botpress.cloud/webchat/v2.1/inject.js";
    script1.async = true;

    const script2 = document.createElement("script");
    script2.src =
      "https://mediafiles.botpress.cloud/c9684d82-1f66-4f98-a908-c5ba6f15f313/webchat/v2.1/config.js";
    script2.async = true;

    document.body.appendChild(script1);
    document.body.appendChild(script2);

    // Cleanup function to remove scripts when component unmounts
    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  return (
    <div>
      <div id="bp-web-widget" />
    </div>
  );
};

export default Chatbot;
