
// Mock CSInterface for browser testing
if (typeof window.__adobe_cep__ === 'undefined') {
    window.__adobe_cep__ = {
        getHostEnvironment: function () {
            return JSON.stringify({
                appId: "PPRO",
                appVersion: "22.0.0",
                appLocale: "en_US"
            });
        },
        evalScript: function (script, callback) {
            console.log("[Mock CEP] Executing Script:", script);
            // Simple mock responses for our specific calls
            if (script.includes("ping")) {
                if (callback) callback("pong");
            } else if (script.includes("exportCurrentSelection")) {
                setTimeout(function () {
                    if (callback) callback("C:\\Temp\\mock_export.mp4");
                }, 500);
            } else if (script.includes("importAndPlace")) {
                setTimeout(function () {
                    if (callback) callback("true");
                }, 500);
            } else {
                if (callback) callback("null");
            }
        },
        addEventListener: function () { },
        removeEventListener: function () { },
        requestOpenExtension: function () { },
        getExtensions: function () { return "[]"; },
        getNetworkPreferences: function () { return "{}"; },
        initResourceBundle: function () { return "{}"; },
        dumpInstallationInfo: function () { return ""; },
        getScaleFactor: function () { return "1"; },
        getCurrentApiVersion: function () { return JSON.stringify({ major: 9, minor: 0, micro: 0 }); },
        invokeSync: function () { return ""; }
    };
}
