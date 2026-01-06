import React from 'react';
import ReactDOM from 'react-dom/client';
import '../index.css';
import Main from './main';
import SystemStateProvider from '../lib/context/SystemState';
import { initBolt } from '../lib/utils/bolt';

initBolt();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <SystemStateProvider>
      <Main />
    </SystemStateProvider>
  </React.StrictMode>
);
