export const getOrCreateFolder = (folderName: string) => {
  const parentFolder = app.project.rootFolder;
  let foundFolder = null;
  for (let i = 1; i <= parentFolder.items.length; i++) {
    const item = parentFolder.items[i];
    if (item instanceof FolderItem && item.name === folderName) {
      foundFolder = item;
      break;
    }
  }
  if (!foundFolder) {
    foundFolder = parentFolder.items.addFolder(folderName);
  }
  return foundFolder;
};

export const importFile = (file: File | string, folderName: string) => {
  const newFile = getFile(file);
  const folder = getOrCreateFolder(folderName);
  const newItem = app.project.importFile(
    new ImportOptions(newFile)
  ) as FootageItem;
  if (newItem.duration * newItem.frameRate === 1) {
    // Not sure why this is here...
    //@ts-ignore
    newItem.replace(file);
  }
  newItem.parentFolder = folder;
  newItem.selected = false;
  return newItem;
};

const getFile = (file: File | string) => {
  return file instanceof File ? file : new File(file);
};

export const setSelectedAsVisible = (composition: CompItem) => {
  if (composition.selectedLayers.length === 0) return null;
  const previousVisible = [];
  for (let i = 1; i <= composition.layers.length; i++) {
    const layer = composition.layers[i];
    previousVisible.push(layer.enabled);
    layer.selected ? (layer.enabled = true) : (layer.enabled = false);
  }
  return previousVisible;
};

export const restorePreviousVisible = (
  composition: CompItem,
  previousVisible: boolean[]
) => {
  for (let i = 1; i <= composition.layers.length; i++) {
    const layer = composition.layers[i];
    layer.enabled = previousVisible[i - 1];
  }
};

export const createNewSizedComp = (
  [width, height]: [number, number],
  name: string,
  folderName: string
) => {
  const folder = getOrCreateFolder(folderName);
  const newComp = app.project.items.addComp(name, width, height, 1, 10, 30);
  newComp.parentFolder = folder;
  newComp.selected = false;
  return newComp;
};
