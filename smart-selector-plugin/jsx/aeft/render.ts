const storeRenderQueue = () => {
  const checkedItems = [];
  for (let p = 1; p <= app.project.renderQueue.numItems; p++) {
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

const restoreRenderQueue = (checkedItems: any[any]) => {
  alert(checkedItems.length);
  checkedItems.forEach((checkedItem: number) => {
    app.project.renderQueue.item(checkedItem).render = true;
  });
};

export const renderFrameToPNG = (outputLocation: string, comp: CompItem) => {
  // If the resolution is not full, store the current resolution and set to Full.
  let res: [number, number] = [1, 1];

  res = comp.resolutionFactor;
  comp.resolutionFactor = [1, 1];

  app.project.renderQueue.showWindow(false);

  const renderQueueBackup = storeRenderQueue();
  if (
    renderQueueBackup.length > 0 &&
    renderQueueBackup[renderQueueBackup.length - 1] === 'rendering'
  ) {
    throw new Error(
      'Cannot render frame to PNG when currently rendering a file.'
    );
  }

  // "Save Frame As" command, adds the current frame to the render queue.
  app.executeCommand(2104);
  const renderQueueItem = app.project.renderQueue.item(
    app.project.renderQueue.numItems
  );
  renderQueueItem.render = true;
  const colorDepth = app.project.bitsPerChannel;
  const templateName = `_HIDDEN X-Factor ${colorDepth} Premul`;
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
