import { RenderToPNG } from './copy-helpers';
import { ImportFile } from './paste-helpers';
import { selectFolder } from '../utils/utils';
export { ImportFile, RenderToPNG, selectFolder };

export const alertString = (str: string) => {
  alert(str);
};

export const qeDomFunction = () => {
  if (typeof qe === 'undefined') {
    app.enableQE();
  }
  if (qe) {
    qe.name;
    qe.project.getVideoEffectByName('test');
  }
};

export const getProjectDir = (throwIfNotFound = true) => {
  let aepFile = app.project.path;
  if (!aepFile) {
    app.project.save();
    aepFile = app.project.path;
  }
  if (!aepFile) {
    if (throwIfNotFound) {
      throw new Error('You must save the project before continuing.');
    } else {
      return null;
    }
  }

  const file = new File(aepFile);
  return file.fsName;
};

export function getActiveSequence() {
  return app.project.activeSequence;
}
