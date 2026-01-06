import React from 'react';
import { useBreakpoint } from '../lib/hooks/useBreakpoint';

type Tab = {
  name: string;
  component: any;
  icon: any;
};

type TabContainerProps = {
  Tabs: Tab[];
  currentTab: number;
  setCurrentTab: (index: number) => void;
  bgColor: string;
};

export const TabContainer = ({
  Tabs,
  currentTab,
  setCurrentTab,
  bgColor,
}: TabContainerProps) => {
  const Tab = Tabs[currentTab].component;

  const currentBreakpoint = useBreakpoint();

  return (
    <div className="flex h-screen">
      <div className="w-full h-full overflow-y-auto overflow-x-hidden scrollbar scrollbar-thumb-blue scrollbar-track-blk-100 scrollbar-w-1">
        <Tab />
      </div>
      {!['xs'].includes(currentBreakpoint) && (
        <TabNavigator
          Tabs={Tabs}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          bgColor={bgColor}
        />
      )}
    </div>
  );
};

const TabNavigator = ({
  Tabs,
  currentTab,
  setCurrentTab,
  bgColor,
}: TabContainerProps) => {
  const handleTabClick = (index: number) => {
    setCurrentTab(index);
  };

  return (
    <div className="ml-auto flex flex-col items-center bg-blk-100 overflow-y-auto overflow-x-hidden scrollbar scrollbar-thumb-blue scrollbar-track-blk-100 scrollbar-w-1">
      {Tabs.map((tab, index: number) => {
        const Icon = tab.icon;
        return (
          <div
            key={index}
            onClick={() => handleTabClick(index)}
            className={`flex justify-center items-center p-2 group`}
            style={{
              backgroundColor: currentTab === index ? bgColor : 'transparent',
            }}
          >
            <div
              className={`w-4 h-4 ${
                currentTab === index
                  ? 'text-wht-0'
                  : 'text-wht-200 group-hover:text-wht-100'
              }`}
            >
              <Icon width={'20px'} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
