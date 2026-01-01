import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChatProvider } from "./contexts/ChatContext";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Wrap your app with ChatProvider */}
    <ChatProvider>
      <App />
    </ChatProvider>
  </React.StrictMode>
);
