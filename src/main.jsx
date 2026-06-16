import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { JobProvider } from './context/JobContext';
import { CandidateProvider } from './context/CandidateContext';
import App from './App';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <JobProvider>
        <CandidateProvider>
          <App />
        </CandidateProvider>
      </JobProvider>
    </BrowserRouter>
  </React.StrictMode>
);
