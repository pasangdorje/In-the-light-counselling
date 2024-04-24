import React from "react";

function NotFound() {
  const deployedURL = window.location.href;

  return (
    <div>
      <h1>Page Not Found</h1>
      <p>Could not find the requested URL {deployedURL} on this server.</p>
    </div>
  );
}

export default NotFound;
