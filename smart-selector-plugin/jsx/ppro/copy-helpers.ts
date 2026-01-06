import { getActiveSequence } from './ppro';
import { randomTemporaryFilename } from '../utils/utils';

export const RenderToPNG = ({
  useRenderQueue,
  copySelectedLayers,
}: {
  useRenderQueue: boolean;
  copySelectedLayers: boolean;
}) => {
  const temporaryFile = randomTemporaryFilename('png');
  exportCurrentFrameAsPNG(temporaryFile);
  return temporaryFile;
};

function exportCurrentFrameAsPNG(outFilepath: string) {
  var qeRes = app.enableQE();
  // var seq = getActiveSequence();
  var activeSequence = qe?.project.getActiveSequence(); // note: make sure a sequence is active in PPro UI
  if (activeSequence) {
    // var currentTime = seq.getPlayerPosition();
    // alert('here');
    var currentTime = activeSequence.CTI.timecode; // CTI = Current Time Indicator.
    // alert(currentTime);
    activeSequence.exportFramePNG(currentTime, outFilepath);
  }
}
