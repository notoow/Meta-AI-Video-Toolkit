export const retrieveLocalLicense = (): string => {
  const hasLicense = app.settings.haveSetting('pp-prefs', 'key');
  let License = <LicenseType>{
    key: 'null',
    plan: 'null',
    last_check: 0,
  };

  if (!hasLicense) {
    const jsonLicense = JSON.stringify(License);
    return jsonLicense;
  }

  const key = app.settings.getSetting('pp-prefs', 'key');
  const plan = app.settings.getSetting('pp-prefs', 'plan');
  const last_check = parseInt(
    app.settings.getSetting('pp-prefs', 'last_check')
  );
  License = { key, plan, last_check };
  const jsonLicense = JSON.stringify(License);
  return jsonLicense;
};

export const updateLicense = (License: LicenseType) => {
  saveSetting('last_check', License.last_check.toString());
  saveSetting('plan', License.plan);
  saveSetting('key', License.key);
  app.preferences.saveToDisk();
};

function saveSetting(setting: string, value: string) {
  app.settings.saveSetting('pp-prefs', setting, value);
  app.preferences.saveToDisk();
}
