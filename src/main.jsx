import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { JobProvider } from './context/JobContext';
import App from './App';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <JobProvider>
        <App />
      </JobProvider>
    </BrowserRouter>
  </React.StrictMode>
);
