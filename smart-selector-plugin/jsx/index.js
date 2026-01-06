(function (thisObj) {// ----- EXTENDSCRIPT INCLUDES ------ //"object"!=typeof JSON&&(JSON={}),function(){"use strict";var rx_one=/^[\],:{}\s]*$/,rx_two=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,rx_three=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,rx_four=/(?:^|:|,)(?:\s*\[)+/g,rx_escapable=/[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,rx_dangerous=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta,rep;function f(t){return t<10?"0"+t:t}function this_value(){return this.valueOf()}function quote(t){return rx_escapable.lastIndex=0,rx_escapable.test(t)?'"'+t.replace(rx_escapable,function(t){var e=meta[t];return"string"==typeof e?e:"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+t+'"'}function str(t,e){var r,n,o,u,f,a=gap,i=e[t];switch(i&&"object"==typeof i&&"function"==typeof i.toJSON&&(i=i.toJSON(t)),"function"==typeof rep&&(i=rep.call(e,t,i)),typeof i){case"string":return quote(i);case"number":return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i)return"null";if(gap+=indent,f=[],"[object Array]"===Object.prototype.toString.apply(i)){for(u=i.length,r=0;r<u;r+=1)f[r]=str(r,i)||"null";return o=0===f.length?"[]":gap?"[\n"+gap+f.join(",\n"+gap)+"\n"+a+"]":"["+f.join(",")+"]",gap=a,o}if(rep&&"object"==typeof rep)for(u=rep.length,r=0;r<u;r+=1)"string"==typeof rep[r]&&(o=str(n=rep[r],i))&&f.push(quote(n)+(gap?": ":":")+o);else for(n in i)Object.prototype.hasOwnProperty.call(i,n)&&(o=str(n,i))&&f.push(quote(n)+(gap?": ":":")+o);return o=0===f.length?"{}":gap?"{\n"+gap+f.join(",\n"+gap)+"\n"+a+"}":"{"+f.join(",")+"}",gap=a,o}}"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},Boolean.prototype.toJSON=this_value,Number.prototype.toJSON=this_value,String.prototype.toJSON=this_value),"function"!=typeof JSON.stringify&&(meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},JSON.stringify=function(t,e,r){var n;if(gap="",indent="","number"==typeof r)for(n=0;n<r;n+=1)indent+=" ";else"string"==typeof r&&(indent=r);if(rep=e,e&&"function"!=typeof e&&("object"!=typeof e||"number"!=typeof e.length))throw new Error("JSON.stringify");return str("",{"":t})}),"function"!=typeof JSON.parse&&(JSON.parse=function(text,reviver){var j;function walk(t,e){var r,n,o=t[e];if(o&&"object"==typeof o)for(r in o)Object.prototype.hasOwnProperty.call(o,r)&&(void 0!==(n=walk(o,r))?o[r]=n:delete o[r]);return reviver.call(t,e,o)}if(text=String(text),rx_dangerous.lastIndex=0,rx_dangerous.test(text)&&(text=text.replace(rx_dangerous,function(t){return"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})),rx_one.test(text.replace(rx_two,"@").replace(rx_three,"]").replace(rx_four,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}();// ---------------------------------- //// ----- EXTENDSCRIPT PONYFILLS -----function __objectFreeze(obj) { return obj; }function __isArray(arr) { try { return arr instanceof Array; } catch (e) { return false; } };// ---------------------------------- //var version = "1.7.3";

var config = {
  version: version,
  id: 'com.pluginplay.copy-pasta',
  displayName: 'Copy Pasta',
  symlink: 'local',
  port: 3000,
  servePort: 5000,
  startingDebugPort: 8860,
  extensionManifestVersion: 6.0,
  requiredRuntimeVersion: 9.0,
  hosts: [{
    name: 'AEFT',
    version: '[0.0,99.9]'
  }, {
    name: 'PPRO',
    version: '[0.0,99.9]'
  }],
  type: 'Panel',
  iconDarkNormal: './src/assets/light-icon.png',
  iconNormal: './src/assets/dark-icon.png',
  iconDarkNormalRollOver: './src/assets/light-icon.png',
  iconNormalRollOver: './src/assets/dark-icon.png',
  parameters: ['--v=0', '--enable-nodejs', '--mixed-context'],
  width: 500,
  height: 550,
  panels: [{
    mainPath: './main/index.html',
    name: 'main',
    panelDisplayName: 'Copy Pasta',
    autoVisible: true,
    width: 350,
    height: 200,
    minWidth: 132
  }, {
    mainPath: './licensing/index.html',
    name: 'licensing',
    type: 'Modeless',
    // panelDisplayName: "Bolt CEP",
    autoVisible: true,
    width: 350,
    height: 440
  }],
  build: {
    jsxBin: 'off',
    sourceMap: true
  },
  zxp: {
    country: 'US',
    province: 'KY',
    org: 'PluginPlay',
    password: 'mypassword',
    tsa: 'http://timestamp.digicert.com/',
    sourceMap: false,
    jsxBin: 'off'
  },
  installModules: [],
  copyAssets: ['bin/pngpaste', 'bin/CopyPasta.exe', ''],
  copyZipAssets: []
};

var ns = config.id;

var getProjectDir$1 = function getProjectDir() {
  var throwIfNotFound = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var aepFile = app.project.file;
  if (!aepFile) {
    app.project.save();
    aepFile = app.project.file;
  }
  if (!aepFile) {
    if (throwIfNotFound) {
      throw new Error('You must save the project before continuing.');
    } else {
      return null;
    }
  }
  return aepFile.fsName;
};
var getActiveComp = function getActiveComp() {
  if (app.project.activeItem instanceof CompItem === false) {
    var _app$activeViewer;
    (_app$activeViewer = app.activeViewer) === null || _app$activeViewer === void 0 ? void 0 : _app$activeViewer.setActive();
  }
  return app.project.activeItem;
};

function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (__isArray(r)) return r; }
var getOrCreateFolder = function getOrCreateFolder(folderName) {
  var parentFolder = app.project.rootFolder;
  var foundFolder = null;
  for (var i = 1; i <= parentFolder.items.length; i++) {
    var item = parentFolder.items[i];
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
var importFile = function importFile(file, folderName) {
  var newFile = getFile(file);
  var folder = getOrCreateFolder(folderName);
  var newItem = app.project.importFile(new ImportOptions(newFile));
  if (newItem.duration * newItem.frameRate === 1) {
    // Not sure why this is here...
    
    newItem.replace(file);
  }
  newItem.parentFolder = folder;
  newItem.selected = false;
  return newItem;
};
var getFile = function getFile(file) {
  return file instanceof File ? file : new File(file);
};
var setSelectedAsVisible = function setSelectedAsVisible(composition) {
  if (composition.selectedLayers.length === 0) return null;
  var previousVisible = [];
  for (var i = 1; i <= composition.layers.length; i++) {
    var layer = composition.layers[i];
    previousVisible.push(layer.enabled);
    layer.selected ? layer.enabled = true : layer.enabled = false;
  }
  return previousVisible;
};
var restorePreviousVisible = function restorePreviousVisible(composition, previousVisible) {
  for (var i = 1; i <= composition.layers.length; i++) {
    var layer = composition.layers[i];
    layer.enabled = previousVisible[i - 1];
  }
};
var createNewSizedComp = function createNewSizedComp(_ref, name, folderName) {
  var _ref2 = _slicedToArray(_ref, 2),
    width = _ref2[0],
    height = _ref2[1];
  var folder = getOrCreateFolder(folderName);
  var newComp = app.project.items.addComp(name, width, height, 1, 10, 30);
  newComp.parentFolder = folder;
  newComp.selected = false;
  return newComp;
};

var storeRenderQueue = function storeRenderQueue() {
  var checkedItems = [];
  for (var p = 1; p <= app.project.renderQueue.numItems; p++) {
    if (app.project.renderQueue.item(p).status === RQItemStatus.RENDERING) {
      checkedItems.push('rendering');
      break;
    } else if (app.project.renderQueue.item(p).status === RQItemStatus.QUEUED) {
      checkedItems.push(p);
      app.project.renderQueue.item(p).render = false;
    }
  }
  return checkedItems;
};
var restoreRenderQueue = function restoreRenderQueue(checkedItems) {
  alert(checkedItems.length);
  checkedItems.forEach(function (checkedItem) {
    app.project.renderQueue.item(checkedItem).render = true;
  });
};
var renderFrameToPNG = function renderFrameToPNG(outputLocation, comp) {
  // If the resolution is not full, store the current resolution and set to Full.
  var res = [1, 1];
  res = comp.resolutionFactor;
  comp.resolutionFactor = [1, 1];
  app.project.renderQueue.showWindow(false);
  var renderQueueBackup = storeRenderQueue();
  if (renderQueueBackup.length > 0 && renderQueueBackup[renderQueueBackup.length - 1] === 'rendering') {
    throw new Error('Cannot render frame to PNG when currently rendering a file.');
  }

  // "Save Frame As" command, adds the current frame to the render queue.
  app.executeCommand(2104);
  var renderQueueItem = app.project.renderQueue.item(app.project.renderQueue.numItems);
  renderQueueItem.render = true;
  var colorDepth = app.project.bitsPerChannel;
  var templateName = "_HIDDEN X-Factor ".concat(colorDepth, " Premul");
  renderQueueItem.outputModule(1).applyTemplate(templateName);
  renderQueueItem.outputModule(1).file = new File(outputLocation);
  app.project.renderQueue.render();
  renderQueueItem.remove();
  if (renderQueueBackup !== null && renderQueueBackup.length > 0) {
    restoreRenderQueue(renderQueueBackup);
  }
  if (app.activeViewer && app.activeViewer.setActive) {
    app.activeViewer.setActive();
  }
  if (app.project && app.project.activeItem) {
    comp.resolutionFactor = res;
  }
  return outputLocation;
};

var retrieveLocalLicense = function retrieveLocalLicense() {
  var hasLicense = app.settings.haveSetting('pp-prefs', 'key');
  var License = {
    key: 'null',
    plan: 'null',
    last_check: 0
  };
  if (!hasLicense) {
    var _jsonLicense = JSON.stringify(License);
    return _jsonLicense;
  }
  var key = app.settings.getSetting('pp-prefs', 'key');
  var plan = app.settings.getSetting('pp-prefs', 'plan');
  var last_check = parseInt(app.settings.getSetting('pp-prefs', 'last_check'));
  License = {
    key: key,
    plan: plan,
    last_check: last_check
  };
  var jsonLicense = JSON.stringify(License);
  return jsonLicense;
};
var updateLicense = function updateLicense(License) {
  saveSetting$1('last_check', License.last_check.toString());
  saveSetting$1('plan', License.plan);
  saveSetting$1('key', License.key);
  app.preferences.saveToDisk();
};
function saveSetting$1(setting, value) {
  app.settings.saveSetting('pp-prefs', setting, value);
  app.preferences.saveToDisk();
}

var getSystemState = function getSystemState(_ref) {
  var id = _ref.id,
    version = _ref.version,
    displayName = _ref.displayName,
    hostType = _ref.hostType;
  // Check if there are any existing prefs.
  var hasSettings = app.settings.haveSetting("".concat(id, ".prefs"), 'version');
  if (!hasSettings) return setNewSystemState({
    id: id,
    version: version,
    displayName: displayName,
    hostType: hostType
  });else {
    // const version = getSetting(id, 'version');
    // const displayName = getSetting(id, 'displayName');
    // const hostType = getSetting(id, 'hostType');
    var appSettings = JSON.parse(getSetting(id, 'appSettings'));
    if (appSettings.useRenderQueue === undefined) appSettings.useRenderQueue = true;
    if (appSettings.copySelectedLayers === undefined) appSettings.copySelectedLayers = false;
    if (appSettings.createNewComp === undefined) appSettings.createNewComp = false;
    if (appSettings.enableNotifications === undefined) appSettings.enableNotifications = false;
    if (appSettings.displayCol === undefined) appSettings.displayCol = true;
    if (appSettings.useProjectPath === undefined) appSettings.useProjectPath = true;
    if (appSettings.customSavePath === undefined) appSettings.customSavePath = '';
    if (appSettings.lastShownBrevidyAd === undefined) appSettings.lastShownBrevidyAd = 0;
    return {
      info: {
        id: id,
        version: version,
        displayName: displayName,
        hostType: hostType
      },
      appSettings: appSettings
    };
  }
};
var setSystemState = function setSystemState(state) {
  // Set the new prefs
  saveSetting(state.info.id, 'appSettings', JSON.stringify(state.appSettings), true);
  return state;
};
var setNewSystemState = function setNewSystemState(_ref2) {
  var id = _ref2.id,
    version = _ref2.version,
    displayName = _ref2.displayName,
    hostType = _ref2.hostType;
  // Set the new prefs.
  saveSetting(id, 'version', version);
  saveSetting(id, 'displayName', displayName);
  saveSetting(id, 'hostType', hostType);
  var appSettings = {
    useRenderQueue: true,
    copySelectedLayers: false,
    createNewComp: true,
    enableNotifications: true,
    displayCol: true,
    useProjectPath: true,
    customSavePath: '',
    lastShownBrevidyAd: 0
  };
  saveSetting(id, 'appSettings', JSON.stringify(appSettings), true);
  return {
    info: {
      id: id,
      version: version,
      displayName: displayName,
      hostType: hostType
    },
    appSettings: appSettings
  };
};
var saveSetting = function saveSetting(id, setting, value) {
  var saveToDisk = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  app.settings.saveSetting("".concat(id, ".prefs"), setting, value);
  if (saveToDisk) app.preferences.saveToDisk();
};
var getSetting = function getSetting(id, setting) {
  return app.settings.getSetting("".concat(id, ".prefs"), setting);
};

var randomTemporaryFilename = function randomTemporaryFilename(extension) {
  var temporaryDirectory = getTemporaryDirectory();
  var outputIdentifier = Math.floor(Math.random() * 1000000).toString();
  return joinPath(temporaryDirectory, "temporary-".concat(outputIdentifier, ".").concat(extension));
};
var joinPath = function joinPath() {
  var separator = $.os.indexOf('Windows') !== -1 ? '\\' : '/';
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return args.join(separator);
};
var getTemporaryDirectory = function getTemporaryDirectory() {
  var create = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var temporaryDirectory = Folder.temp;
  if (!temporaryDirectory.exists && create) {
    temporaryDirectory.create();
  }
  return temporaryDirectory.fsName;
};
var selectFolder = function selectFolder(initialPath) {
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

var PROJECT_FOLDER = 'Copy Pasta';
var RenderToPNG$1 = function RenderToPNG(options) {
  var composition = getActiveComp();
  var temporaryFile = randomTemporaryFilename('png');
  var compositionPreviousVisible = options.copySelectedLayers ? setSelectedAsVisible(composition) : null;
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
var ImportFile$1 = function ImportFile(filename, createNewComp) {
  var importedFile = importFile(filename, PROJECT_FOLDER);
  var size = [importedFile.width, importedFile.height];
  var composition = createNewComp ? createNewSizedComp(size, importedFile.name, PROJECT_FOLDER) : getActiveComp();
  composition.layers.add(importedFile);
  composition.openInViewer();
  return {
    success: true,
    message: 'File imported'
  };
};

var aeft = /*#__PURE__*/__objectFreeze({
  __proto__: null,
  getProjectDir: getProjectDir$1,
  getOrCreateFolder: getOrCreateFolder,
  retrieveLocalLicense: retrieveLocalLicense,
  updateLicense: updateLicense,
  getSystemState: getSystemState,
  setSystemState: setSystemState,
  selectFolder: selectFolder,
  RenderToPNG: RenderToPNG$1,
  ImportFile: ImportFile$1
});

var helloWorld$2 = function helloWorld() {
  alert("Hello from Illustrator");
  app.activeDocument.path;
};

var ilst = /*#__PURE__*/__objectFreeze({
  __proto__: null,
  helloWorld: helloWorld$2
});

var helloWorld$1 = function helloWorld() {
  alert("Hello from Animate");
};

var anim = /*#__PURE__*/__objectFreeze({
  __proto__: null,
  helloWorld: helloWorld$1
});

var RenderToPNG = function RenderToPNG(_ref) {
  _ref.useRenderQueue;
    _ref.copySelectedLayers;
  var temporaryFile = randomTemporaryFilename('png');
  exportCurrentFrameAsPNG(temporaryFile);
  return temporaryFile;
};
function exportCurrentFrameAsPNG(outFilepath) {
  var _qe;
  app.enableQE();
  // var seq = getActiveSequence();
  var activeSequence = (_qe = qe) === null || _qe === void 0 ? void 0 : _qe.project.getActiveSequence(); // note: make sure a sequence is active in PPro UI
  if (activeSequence) {
    // var currentTime = seq.getPlayerPosition();
    // alert('here');
    var currentTime = activeSequence.CTI.timecode; // CTI = Current Time Indicator.
    // alert(currentTime);
    activeSequence.exportFramePNG(currentTime, outFilepath);
  }
}

var ImportFile = function ImportFile(filename, createNewComp) {
  var sequence = app.project.activeSequence;
  if (!sequence) {
    return {
      success: false,
      message: 'No active sequence found'
    };
  }
  var binName = 'Copy Pasta';
  var binForImportedItems = findBinByName(binName);

  // If bin doesn't exist, create it
  if (!binForImportedItems) {
    binForImportedItems = app.project.rootItem.createBin(binName);
  }
  var importSuccess = app.project.importFiles([filename.toString()], true, binForImportedItems, false);
  if (!importSuccess) {
    return {
      success: false,
      message: 'Failed to import file'
    };
  }
  var importedFile = binForImportedItems.children[binForImportedItems.children.numItems - 1];
  var insertionTime = sequence.getPlayerPosition().seconds; // Playhead's current position

  var inserted = false;
  var videoTracks = sequence.videoTracks;
  for (var i = 0; i < videoTracks.numTracks && !inserted; i++) {
    if (canInsertClip(videoTracks[i], insertionTime, 1)) {
      videoTracks[i].insertClip(importedFile, insertionTime);
      inserted = true;
    }
  }

  // If no suitable track was found, add a new track and insert there.
  if (!inserted) {
    var _qe;
    app.enableQE();
    var qeSequence = (_qe = qe) === null || _qe === void 0 ? void 0 : _qe.project.getActiveSequence();
    if (!qeSequence) {
      return {
        success: false,
        message: 'No active sequence found'
      };
    }
    qeSequence.addTracks(1, sequence.videoTracks.numTracks);
    videoTracks[sequence.videoTracks.numTracks - 1].insertClip(importedFile, insertionTime);
    inserted = true;
  }
  if (!inserted) {
    // This is just a fallback in case something went wrong with adding the new track, but theoretically, it shouldn't hit this.
    return {
      success: false,
      message: 'Unexpected error inserting clip'
    };
  }
  return {
    success: true,
    message: 'File imported'
  };
};
function findBinByName(binName) {
  var rootChildren = app.project.rootItem.children;
  for (var i = 0; i < rootChildren.numItems; i++) {
    var item = rootChildren[i];
    if (item.type === ProjectItemType.BIN && item.name === binName) {
      return item;
    }
  }
  return null;
}
function canInsertClip(track, startTime, duration) {
  for (var i = 0; i < track.clips.numItems; i++) {
    var clip = track.clips[i];
    var clipStart = clip.start.seconds;
    var clipEnd = clip.end.seconds;

    // Check if the new clip starts within an existing clip
    if (startTime >= clipStart && startTime < clipEnd) {
      return false;
    }

    // Check if the new clip ends within an existing clip
    if (startTime + duration > clipStart && startTime + duration <= clipEnd) {
      return false;
    }

    // Check if the new clip entirely overlaps an existing clip
    if (startTime <= clipStart && startTime + duration >= clipEnd) {
      return false;
    }
  }
  return true;
}

var alertString = function alertString(str) {
  alert(str);
};
var qeDomFunction = function qeDomFunction() {
  if (typeof qe === 'undefined') {
    app.enableQE();
  }
  if (qe) {
    qe.name;
    qe.project.getVideoEffectByName('test');
  }
};
var getProjectDir = function getProjectDir() {
  var throwIfNotFound = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var aepFile = app.project.path;
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
  var file = new File(aepFile);
  return file.fsName;
};
function getActiveSequence() {
  return app.project.activeSequence;
}

var ppro = /*#__PURE__*/__objectFreeze({
  __proto__: null,
  ImportFile: ImportFile,
  RenderToPNG: RenderToPNG,
  selectFolder: selectFolder,
  alertString: alertString,
  qeDomFunction: qeDomFunction,
  getProjectDir: getProjectDir,
  getActiveSequence: getActiveSequence
});

var helloWorld = function helloWorld() {
  app.activeDocument;
  alert("Hello from Photoshop");
};

var phxs = /*#__PURE__*/__objectFreeze({
  __proto__: null,
  helloWorld: helloWorld
});

var main;
switch (BridgeTalk.appName) {
  case 'premierepro':
  case 'premiereprobeta':
    main = ppro;
    break;
  case 'aftereffects':
  case 'aftereffectsbeta':
    main = aeft;
    break;
  case 'illustrator':
  case 'illustratorbeta':
    main = ilst;
    break;
  case 'photoshop':
  case 'photoshopbeta':
    main = phxs;
    break;
  default:
    
    if (app.appName === 'Adobe Animate') {
      main = anim;
    }
    break;
}

var host = typeof $ !== 'undefined' ? $ : window;
host[ns] = main;
})(this);