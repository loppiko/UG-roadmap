import React from 'react';
import ReactDOM from 'react-dom/client';
import './styleSheet/index/index.css';
import App from './App';

// React Router
import { BrowserRouter } from "react-router-dom";
import {AuthProvider} from "./internal/auth/authProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
    </React.StrictMode>
  </BrowserRouter>
);
