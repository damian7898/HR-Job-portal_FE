import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { JobProvider } from './context/JobContext';
import { CandidateProvider } from './context/CandidateContext';
import { LanguageProvider } from './context/LanguageContext';
import App from './App';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <JobProvider>
          <CandidateProvider>
            <App />
          </CandidateProvider>
        </JobProvider>
      </LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>
);
