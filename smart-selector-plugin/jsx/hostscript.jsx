
$._PPP_ = {
    ping: function () {
        return "pong";
    },

    exportCurrentSelection: function () {
        var seq = app.project.activeSequence;
        if (!seq) return '{"error": "No active sequence"}';

        var selection = seq.getSelection();
        if (!selection || selection.length === 0) return '{"error": "No clip selected"}';

        var clip = selection[0];

        // 1. Get Source Path
        var filePath = "";
        if (clip.projectItem) {
            filePath = clip.projectItem.getMediaPath();
        }

        if (!filePath || filePath.length === 0) {
            return '{"error": "Selected clip has no file path (Is it a nested sequence?)"}';
        }

        // 2. Get Timing Info (Seconds)
        var startTime = clip.start.seconds;       // Timeline Start
        var duration = clip.duration.seconds;     // Length
        var inPoint = clip.inPoint.seconds;       // Source In Point (Trim start)

        // 3. Construct JSON Manually (ExtendScript doesn't builtin JSON sometimes)
        // Escape backslashes for JSON: \ -> \\
        var safePath = filePath.replace(/\\/g, "\\\\");

        var json = '{"path": "' + safePath + '", "startTime": ' + startTime + ', "inPoint": ' + inPoint + ', "duration": ' + duration + '}';
        return json;
    },

    importAndPlace: function (path, timeSeconds) {
        var seq = app.project.activeSequence;
        if (!seq) return "false";

        // 1. Import
        app.project.importFiles([path], true, app.project.rootItem, false);

        // 2. Find imported item (Assuming it's the last child)
        var lastItem = app.project.rootItem.children[app.project.rootItem.children.numItems - 1];

        if (lastItem) {
            // 3. Place on the Highest Video Track (Overlay)
            // We want to overlay, so we pick the last available track.
            var vTrack = seq.videoTracks[seq.videoTracks.numTracks - 1];

            // If the user provided a specific time, use it. Otherwise playhead.
            var placeTime = timeSeconds !== undefined ? timeSeconds : seq.getPlayerPosition().seconds;

            // Convert seconds back to Time object if needed, but overwriteClip takes time object usually?
            // Wait, overwriteClip takes a TIME object in ExtendScript.
            // We need to create a new Time object if we only have seconds.
            // But usually we can pass a string or number in some versions. 
            // SAFEST: Use exact ticks if possible, but seconds property is read-only.
            // We have to set `.seconds` on a Time object.

            var timeObj = new Time();
            timeObj.seconds = placeTime;

            vTrack.overwriteClip(lastItem, timeObj.ticks); // .ticks is safer or passing component

            return "true";
        }
        return "false";
    }
};
