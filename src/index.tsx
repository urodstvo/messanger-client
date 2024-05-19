import ReactDOM from 'react-dom/client';
import { App } from '@/App.tsx';

import '@/styles/reset.css';
import '@/styles/globals.css';
import React from 'react';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
