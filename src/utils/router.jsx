import React, { useState, useEffect } from 'react';

export const Router = ({ children }) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  return React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { currentPath });
    }
    return child;
  });
};

export const Route = ({ path, element, currentPath }) => {
  if (currentPath === path) {
    return element;
  }
  return null;
};