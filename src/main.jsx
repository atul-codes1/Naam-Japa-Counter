import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { registerSW } from 'virtual:pwa-register'; // Add this line
import './index.css';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext';
import { SyncProvider } from './context/SyncContext';
import ErrorBoundary from './components/common/ErrorBoundary';

// Register PWA Service Worker
registerSW({ immediate: true });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <SyncProvider>
            <HelmetProvider>
              <App />
            </HelmetProvider>
          </SyncProvider>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
