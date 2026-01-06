import { LicenseWrapper } from '@pluginplay/pp-cep-license';
import { useSystemState } from '../lib/context/SystemState';
import { useEffect, useState } from 'react';
import { TabContainer } from '../components/TabContainer';
import { child_process, fs, os, path, crypto, dns } from '../lib/cep/node';
import {
  csi,
  evalES,
  subscribeBackgroundColor,
  vulcanListen,
  vulcanSend,
} from '../lib/utils/bolt';
import { Tab_Main } from '../components/tabs/Tab_Main';
import { Tab_About } from '../components/tabs/Tab_About';
import { Tab_Settings } from '../components/tabs/Tab_Settings';
import cp_icon from '../components/cp_icon';
import settings_icon from '../components/settings_icon';
import info_icon from '../components/info_icon';
import { version, name, license_type } from '../../../package.json';

const Main = () => {
  const [bgColor, setBgColor] = useState('#282c34');
  const [currentTab, setCurrentTab] = useState(0);
  const { addNotification } = useSystemState();

  useEffect(() => {
    if (window.cep) {
      subscribeBackgroundColor(setBgColor);
    }
  }, []);

  const Tabs = [
    {
      name: 'Main',
      component: Tab_Main,
      icon: cp_icon,
    },
    {
      name: 'Settings',
      component: () => <Tab_Settings bgColor={bgColor} />,
      icon: settings_icon,
    },
    {
      name: 'About',
      component: Tab_About,
      icon: info_icon,
    },
  ];

  return license_type === 'PP' ? (
    <LicenseWrapper
      csi={csi}
      nodeLib={{
        os,
        child_process,
        crypto,
        dns,
      }}
      vulcanListen={vulcanListen}
      vulcanSend={vulcanSend}
      evalES={evalES}
      productId={name}
      version={version}
      addNotification={addNotification}
      devMode={false}
      useLocalHost={false}
    >
      <div className="w-full h-full" style={{ backgroundColor: bgColor }}>
        <TabContainer
          Tabs={Tabs}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          bgColor={bgColor}
        />
      </div>
    </LicenseWrapper>
  ) : (
    <div className="w-full h-full" style={{ backgroundColor: bgColor }}>
      <TabContainer
        Tabs={Tabs}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        bgColor={bgColor}
      />
    </div>
  );
};

export default Main;
