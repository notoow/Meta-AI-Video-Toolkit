import { LicensingPanel } from '@pluginplay/pp-cep-license';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { csi, vulcanListen, vulcanSend } from '../lib/utils/bolt';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <LicensingPanel
      csi={csi}
      vulcanListen={vulcanListen}
      vulcanSend={vulcanSend}
    />
  </React.StrictMode>
);
