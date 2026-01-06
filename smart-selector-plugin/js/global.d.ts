import { cep_node, cep, __adobe_cep__ } from './lib/cep/cep-types';

declare module '*.png';
declare module '*.gif';
declare module '*.jpg';
declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare global {
  interface Window {
    cep_node: cep_node;
    cep: cep;
    __adobe_cep__: __adobe_cep__;
  }
  interface SystemState {
    info: {
      id: string;
      version: string;
      displayName: string;
      hostType: string;
    };
    appSettings: {
      useRenderQueue: boolean;
      copySelectedLayers: boolean;
      createNewComp: boolean;
      enableNotifications: boolean;
      displayCol: boolean;
      useProjectPath: boolean;
      customSavePath: string;
      lastShownBrevidyAd: number;
    };
  }
  interface NotificationType {
    type: 'error' | 'success' | 'info';
    title: string;
    message: string;
    id: string;
    duration: number;
    link?: string;
    linkText?: string;
    // removeNotification: () => void;
  }
  interface NewNotification {
    type: NotificationType['type'];
    title: NotificationType['title'];
    message: NotificationType['message'];
    link?: NotificationType['link'];
    linkText?: NotificationType['linkText'];
  }
  interface OperationRes {
    success: boolean;
    message: string;
  }
}
