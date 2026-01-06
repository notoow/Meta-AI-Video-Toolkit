import React from 'react';
import config from '../../../../cep.config';
import { csi } from '../../lib/utils/bolt';
import { useLicense } from '@pluginplay/pp-cep-license';
import { license_type } from '../../../../package.json';

export const Tab_About = () => {
  const licenseObject = license_type === 'PP' ? useLicense() : null;
  const license = licenseObject?.license;
  const { version } = config;

  const handleSupportClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (license_type === 'PP') {
      csi.openURLInDefaultBrowser('https://app.pluginplay.app/support');
    } else {
      csi.openURLInDefaultBrowser(
        'mailto:danny@brevidy.pro?subject=Copy%20Pasta%20Support&body=Hi%20Danny%2C%0A%0AI%20need%20help%20with%20Copy%20Pasta.%0A%0AThanks!'
      );
    }
  };

  const handleProductClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (license_type === 'PP') {
      csi.openURLInDefaultBrowser('https://app.pluginplay.app/tool/copy-pasta');
    } else {
      csi.openURLInDefaultBrowser('https://brevidy.pro/copy-pasta');
    }
  };

  const handleTutorialClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (license_type === 'PP') {
      csi.openURLInDefaultBrowser(
        'https://www.youtube.com/watch?v=9LjcDQE7LvA'
      );
    } else {
      csi.openURLInDefaultBrowser('https://youtu.be/D4u9E0x7EXE');
    }
  };

  return (
    <div className="flex flex-col w-full h-full gap-4 overflow-y-auto items-center px-2 py-4 scrollbar scrollbar-thumb-blk-100 scrollbar-track-transparent scrollbar-w-1">
      <div className="flex flex-col gap-2 items-center justify-center w-full">
        <h1 className="text-2xl text-wht-0 text-center">Copy Pasta</h1>
        <p className="text-sm text-wht-100">
          Version: <span className="text-wht-0">{version}</span>
        </p>
        {license_type === 'PP' && (
          <p className="text-sm text-wht-100">
            Plan: <span className="text-wht-0">{license.plan}</span>
          </p>
        )}
      </div>
      <div className="flex flex-wrap gap-2 items-center justify-center w-full">
        <Button label="Support" id="support" onClick={handleSupportClick} />
        <Button label="Product" id="product" onClick={handleProductClick} />
        <Button label="Tutorial" id="tutorial" onClick={handleTutorialClick} />
      </div>
    </div>
  );
};

type ButtonProps = {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  id?: string;
};

const Button = ({ label, onClick, id }: ButtonProps) => {
  return (
    <button
      id={id}
      className="flex-1 flex flex-row items-center justify-center w-full px-2 h-8 bg-blk-100 text-wht-0 rounded-md hover:bg-blk-200"
      onClick={onClick}
    >
      {label}
    </button>
  );
};
