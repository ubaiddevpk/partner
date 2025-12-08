import React, { useState, useEffect } from "react";
import LandingPage from "./pages/LandingPage";
import PartnerSignupPage from "./pages/PartnerSignupPage";
import PartnerLoginPage from "./pages/PartnerLoginPage";

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  return (
    <>
      {currentPath === '/' && <LandingPage />}
      {currentPath === '/signup' && <PartnerSignupPage />}
      
      {currentPath === '/login' && <PartnerLoginPage />}

    </>
  );
}