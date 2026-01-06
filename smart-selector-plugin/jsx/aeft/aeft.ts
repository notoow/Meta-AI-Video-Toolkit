import { getActiveComp, getProjectDir } from './aeft-utils';
import {
  createNewSizedComp,
  getOrCreateFolder,
  importFile,
  restorePreviousVisible,
  setSelectedAsVisible,
} from './project';
import { renderFrameToPNG } from './render';
import { retrieveLocalLicense, updateLicense } from './licensing';
import { getSystemState, setSystemState } from './settings';
import { randomTemporaryFilename, selectFolder } from '../utils/utils';
export {
  getProjectDir,
  getOrCreateFolder,
  retrieveLocalLicense,
  updateLicense,
  getSystemState,
  setSystemState,
  selectFolder,
};

const PROJECT_FOLDER = 'Copy Pasta';

type RenderOptions = {
  useRenderQueue: boolean;
  copySelectedLayers: boolean;
};

export const RenderToPNG = (options: RenderOptions) => {
  const composition: CompItem = getActiveComp();
  const temporaryFile = randomTemporaryFilename('png');
  const compositionPreviousVisible = options.copySelectedLayers
    ? setSelectedAsVisible(composition)
    : null;
  if (options.useRenderQueue) {
    renderFrameToPNG(temporaryFile, composition);
  } else {
    composition.saveFrameToPng(composition.time, new File(temporaryFile));
  }
  if (options.copySelectedLayers && compositionPreviousVisible) {
    restorePreviousVisible(composition, compositionPreviousVisible);
  }

  return temporaryFile;
};

export const ImportFile = (filename: File | string, createNewComp: boolean) => {
  const importedFile = importFile(filename, PROJECT_FOLDER);
  const size = [importedFile.width, importedFile.height] as [number, number];
  const composition = createNewComp
    ? createNewSizedComp(size, importedFile.name, PROJECT_FOLDER)
    : getActiveComp();
  composition.layers.add(importedFile);
  composition.openInViewer();
  return {
    success: true,
    message: 'File imported',
  };
};
