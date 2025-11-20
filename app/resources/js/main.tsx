import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import '../css/app.css';

const ensureRootElement = () => {
    const existing = document.getElementById('app-root');
    if (existing) return existing;

    const el = document.createElement('div');
    el.id = 'app-root';
    document.body.appendChild(el);
    return el;
};

const container = ensureRootElement();

createRoot(container).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
