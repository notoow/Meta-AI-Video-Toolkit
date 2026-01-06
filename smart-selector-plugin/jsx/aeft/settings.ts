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

export const getSystemState = ({
  id,
  version,
  displayName,
  hostType,
}: SystemState['info']) => {
  // Check if there are any existing prefs.
  const hasSettings = app.settings.haveSetting(`${id}.prefs`, 'version');
  if (!hasSettings)
    return setNewSystemState({ id, version, displayName, hostType });
  else {
    // const version = getSetting(id, 'version');
    // const displayName = getSetting(id, 'displayName');
    // const hostType = getSetting(id, 'hostType');
    let appSettings = JSON.parse(
      getSetting(id, 'appSettings')
    ) as SystemState['appSettings'];
    if (appSettings.useRenderQueue === undefined)
      appSettings.useRenderQueue = true;
    if (appSettings.copySelectedLayers === undefined)
      appSettings.copySelectedLayers = false;
    if (appSettings.createNewComp === undefined)
      appSettings.createNewComp = false;
    if (appSettings.enableNotifications === undefined)
      appSettings.enableNotifications = false;
    if (appSettings.displayCol === undefined) appSettings.displayCol = true;
    if (appSettings.useProjectPath === undefined)
      appSettings.useProjectPath = true;
    if (appSettings.customSavePath === undefined)
      appSettings.customSavePath = '';
    if (appSettings.lastShownBrevidyAd === undefined)
      appSettings.lastShownBrevidyAd = 0;
    return { info: { id, version, displayName, hostType }, appSettings };
  }
};

export const setSystemState = (state: SystemState) => {
  // Set the new prefs
  saveSetting(
    state.info.id,
    'appSettings',
    JSON.stringify(state.appSettings),
    true
  );
  return state;
};

const setNewSystemState = ({
  id,
  version,
  displayName,
  hostType,
}: SystemState['info']) => {
  // Set the new prefs.
  saveSetting(id, 'version', version);
  saveSetting(id, 'displayName', displayName);
  saveSetting(id, 'hostType', hostType);
  const appSettings: SystemState['appSettings'] = {
    useRenderQueue: true,
    copySelectedLayers: false,
    createNewComp: true,
    enableNotifications: true,
    displayCol: true,
    useProjectPath: true,
    customSavePath: '',
    lastShownBrevidyAd: 0,
  };
  saveSetting(id, 'appSettings', JSON.stringify(appSettings), true);
  return { info: { id, version, displayName, hostType }, appSettings };
};

const saveSetting = (
  id: SystemState['info']['id'],
  setting: string,
  value: string,
  saveToDisk: boolean = false
) => {
  app.settings.saveSetting(`${id}.prefs`, setting, value);
  if (saveToDisk) app.preferences.saveToDisk();
};

const getSetting = (id: SystemState['info']['id'], setting: string) => {
  return app.settings.getSetting(`${id}.prefs`, setting);
};
