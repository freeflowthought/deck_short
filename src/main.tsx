import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PitchDeckPage from './PitchDeckPage';
import '@fontsource-variable/ibm-plex-sans/index.css';
import '@fontsource-variable/fraunces/full.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Could not find root element to mount to');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<PitchDeckPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
