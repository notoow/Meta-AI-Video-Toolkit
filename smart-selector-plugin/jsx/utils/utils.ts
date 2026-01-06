export const randomTemporaryFilename = (extension: string) => {
  const temporaryDirectory = getTemporaryDirectory();
  const outputIdentifier = Math.floor(Math.random() * 1000000).toString();
  return joinPath(
    temporaryDirectory,
    `temporary-${outputIdentifier}.${extension}`
  );
};

const joinPath = (...args: string[]) => {
  const separator = $.os.indexOf('Windows') !== -1 ? '\\' : '/';
  return args.join(separator);
};

const getTemporaryDirectory = (create = true) => {
  const temporaryDirectory = Folder.temp;
  if (!temporaryDirectory.exists && create) {
    temporaryDirectory.create();
  }
  return temporaryDirectory.fsName;
};

export const selectFolder = (initialPath: string) => {
  var folder;
  if (initialPath) {
    folder = new Folder(initialPath);
  } else {
    folder = Folder.desktop; // or some other default location
  }
  var selectedFolder = folder.selectDlg('Select a folder');
  if (selectedFolder) {
    return selectedFolder.fsName; // fsName returns the platform-specific absolute path
  } else {
    return null;
  }
};

export const forEach = <T>(
  arr: T[],
  callback: (item: T, i: number) => void
): void => {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i], i);
  }
};

export const map = <T>(
  arr: T[],
  callback: (item: T, i: number) => any
): T[] => {
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    res.push(callback(arr[i], i));
  }
  return res;
};

export const filter = <T>(
  arr: T[],
  func: (item: T, i: number) => boolean
): T[] => {
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    if (func(arr[i], i)) {
      res.push(arr[i]);
    }
  }
  return res;
};

export const includes = <T>(arr: T[], value: string | number) => {
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    if (element === value) {
      return true;
    }
  }
  return false;
};

export const indexOf = <T>(arr: T[], value: string | number) => {
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    if (element === value) {
      return i;
    }
  }
  return -1;
};

// Joins paths
export const join = (...args: string[]) => {
  const sep = $.os === 'Windows' ? '\\' : '/';
  const len = args.length;
  let res = args[0];
  for (let i = 1; i < len; i++) {
    res = res + sep + args[i];
  }
  return res;
};
