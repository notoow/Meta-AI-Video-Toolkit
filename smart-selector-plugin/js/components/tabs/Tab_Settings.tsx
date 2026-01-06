import React, { useState } from 'react';
import LabeledCheckbox from '../LabeledCheckbox';
import { useSystemState } from '../../lib/context/SystemState';
import LabeledInput from '../LabeledInput';
import StyledActionIcon from '../icons/StyledActionIcon';
import IconFolder from '../icons/IconFolder';
import { path } from '../../lib/cep/node';
import { evalES, evalTS } from '../../lib/utils/bolt';

export const Tab_Settings = ({ bgColor }: { bgColor: string }) => {
  const { systemState, saveSystemSettings } = useSystemState();
  const {
    useRenderQueue,
    copySelectedLayers,
    createNewComp,
    enableNotifications,
    displayCol,
    useProjectPath,
    customSavePath,
  } = systemState.appSettings;
  const { hostType } = systemState.info;
  const [customSavePathInput, setCustomSavePathInput] = useState<string>(
    customSavePath || ''
  );

  const handleUseRenderQueueChange = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    console.log('useRenderQueue: ' + !useRenderQueue);
    saveSystemSettings({
      ...systemState.appSettings,
      useRenderQueue: !useRenderQueue,
    });
  };

  const handleCopySelectedLayersChange = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    e.stopPropagation();
    console.log('copySelectedLayers: ' + !copySelectedLayers);
    saveSystemSettings({
      ...systemState.appSettings,
      copySelectedLayers: !copySelectedLayers,
    });
  };

  const handleCreateNewCompChange = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    console.log('createNewComp: ' + !createNewComp);
    saveSystemSettings({
      ...systemState.appSettings,
      createNewComp: !createNewComp,
    });
  };

  const handleNotificationsChange = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    saveSystemSettings({
      ...systemState.appSettings,
      enableNotifications: !enableNotifications,
    });
  };

  const handleDisplayColChange = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    console.log('displayCol: ' + !displayCol);
    saveSystemSettings({ ...systemState.appSettings, displayCol: !displayCol });
  };

  const handleUseProjectPathChange = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    console.log('useProjectPath: ' + !useProjectPath);
    saveSystemSettings({
      ...systemState.appSettings,
      useProjectPath: !useProjectPath,
    });
  };

  const handleCustomSavePathChange = (value: string) => {
    console.log('customSavePath: ' + value);
    setCustomSavePathInput(value);
    // wait for user to stop typing
    setTimeout(() => {
      saveSystemSettings({
        ...systemState.appSettings,
        customSavePath: customSavePathInput,
      });
    }, 1000);
  };

  const handleCustomSavePathFolderClick = async (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    e.stopPropagation();
    console.log('customSavePathFolderClick');

    let initialPath = '';
    if (path.isAbsolute(customSavePathInput)) {
      console.log('isAbsolute');
      initialPath = customSavePathInput;
    } else {
      let projectPathRes = await evalTS('getProjectDir');
      console.log('projectPathRes: ' + projectPathRes);
      if (projectPathRes) {
        initialPath = projectPathRes;
      }
    }
    // Call a ExtendScript function that opens a folder dialog and returns the selected path
    let selectedPath = await evalTS('selectFolder', initialPath);
    if (selectedPath) {
      console.log('selectedPath: ' + selectedPath);
      setCustomSavePathInput(selectedPath);
      saveSystemSettings({
        ...systemState.appSettings,
        customSavePath: selectedPath,
      });
    }
  };

  return (
    <div className="flex flex-col items-center h-full">
      <div className="flex flex-col items-center justify-center p-2 w-full gap-2">
        {hostType === 'AEFT' ? (
          <SettingsSection label="After Effects" bgColor={bgColor}>
            <LabeledCheckbox
              label="Use Render Queue"
              value={useRenderQueue}
              handleOnChange={(e) => {
                handleUseRenderQueueChange(e);
              }}
            />
            <LabeledCheckbox
              label="Copy selected layers"
              value={copySelectedLayers}
              handleOnChange={(e) => {
                handleCopySelectedLayersChange(e);
              }}
            />
            <LabeledCheckbox
              label="Paste new comp"
              value={createNewComp}
              handleOnChange={(e) => {
                handleCreateNewCompChange(e);
              }}
            />
          </SettingsSection>
        ) : null}
        <SettingsSection label="UI" bgColor={bgColor}>
          <LabeledCheckbox
            label="Notifications"
            value={enableNotifications}
            handleOnChange={(e) => {
              handleNotificationsChange(e);
            }}
          />
          <LabeledCheckbox
            label="Display Col"
            value={displayCol}
            handleOnChange={(e) => {
              handleDisplayColChange(e);
            }}
          />
        </SettingsSection>
        <SettingsSection label="Save Path" bgColor={bgColor}>
          <LabeledCheckbox
            label="Use Project Path"
            value={useProjectPath}
            handleOnChange={handleUseProjectPathChange}
          />
          <div className={`flex w-full gap-1 ${useProjectPath && 'hidden'}`}>
            <LabeledInput
              value={customSavePath}
              onChange={handleCustomSavePathChange}
              label="Save Path"
              type="text"
              isVisible={!useProjectPath}
            />
            {/* Button for opening a file dialog to select a folder */}
            <div className="flex-1" />
            <StyledActionIcon onClick={handleCustomSavePathFolderClick}>
              <IconFolder />
            </StyledActionIcon>
          </div>
        </SettingsSection>
      </div>
    </div>
  );
};

const SettingsSection = ({
  label,
  children,
  bgColor,
}: {
  label: string;
  children: React.ReactNode;
  bgColor: string;
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-2 py-3 w-full gap-1 border border-gray-500 rounded-lg relative">
      <div
        className="text-xs text-wht-400 px-2 absolute -top-2 left-0 ml-4"
        style={{ backgroundColor: bgColor }}
      >
        {label}
      </div>
      {children}
    </div>
  );
};
