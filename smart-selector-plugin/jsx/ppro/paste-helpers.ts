export const ImportFile = (filename: string, createNewComp: boolean) => {
  const sequence = app.project.activeSequence;
  if (!sequence) {
    return {
      success: false,
      message: 'No active sequence found',
    };
  }
  const binName = 'Copy Pasta';

  let binForImportedItems = findBinByName(binName);

  // If bin doesn't exist, create it
  if (!binForImportedItems) {
    binForImportedItems = app.project.rootItem.createBin(binName);
  }

  const importSuccess = app.project.importFiles(
    [filename.toString()],
    true,
    binForImportedItems,
    false
  );

  if (!importSuccess) {
    return {
      success: false,
      message: 'Failed to import file',
    };
  }

  const importedFile =
    binForImportedItems.children[binForImportedItems.children.numItems - 1];
  const insertionTime = sequence.getPlayerPosition().seconds; // Playhead's current position

  let inserted = false;

  const videoTracks = sequence.videoTracks;
  for (let i = 0; i < videoTracks.numTracks && !inserted; i++) {
    if (canInsertClip(videoTracks[i], insertionTime, 1)) {
      videoTracks[i].insertClip(importedFile, insertionTime);
      inserted = true;
    }
  }

  // If no suitable track was found, add a new track and insert there.
  if (!inserted) {
    app.enableQE();
    let qeSequence = qe?.project.getActiveSequence();
    if (!qeSequence) {
      return {
        success: false,
        message: 'No active sequence found',
      };
    }
    qeSequence.addTracks(1, sequence.videoTracks.numTracks);

    videoTracks[sequence.videoTracks.numTracks - 1].insertClip(
      importedFile,
      insertionTime
    );
    inserted = true;
  }

  if (!inserted) {
    // This is just a fallback in case something went wrong with adding the new track, but theoretically, it shouldn't hit this.
    return {
      success: false,
      message: 'Unexpected error inserting clip',
    };
  }

  return {
    success: true,
    message: 'File imported',
  };
};

function findBinByName(binName: string) {
  const rootChildren = app.project.rootItem.children;
  for (let i = 0; i < rootChildren.numItems; i++) {
    const item = rootChildren[i];
    if (item.type === ProjectItemType.BIN && item.name === binName) {
      return item;
    }
  }
  return null;
}

function canInsertClip(
  track: Track,
  startTime: number,
  duration: number
): boolean {
  for (let i = 0; i < track.clips.numItems; i++) {
    const clip = track.clips[i];
    const clipStart = clip.start.seconds;
    const clipEnd = clip.end.seconds;

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
