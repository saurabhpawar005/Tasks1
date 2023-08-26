import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { BagProvider } from './Tasks/Task1/Components/BagContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <BagProvider>
    <App />
    </BagProvider>
    </BrowserRouter>
  </React.StrictMode>
);
