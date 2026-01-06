
/**
 * CSInterface - v9.4.0
 * Copyright (c) 2018 Adobe Systems Incorporated. All rights reserved.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.CSInterface = factory();
    }
}(this, function () {
    'use strict';

    var CSInterface = function () { };

    CSInterface.THEME_COLOR_CHANGED_EVENT = "com.adobe.csxs.events.ThemeColorChanged";
    CSInterface.PLUGINS_PAGE_URL_CHANGED_EVENT = "com.adobe.csxs.events.PluginsPageUrlChanged";
    CSInterface.WINDOW_VISIBILITY_CHANGED_EVENT = "com.adobe.csxs.events.WindowVisibilityChanged";
    CSInterface.APP_ONLINE_STATUS_CHANGED_EVENT = "com.adobe.csxs.events.AppOnlineStatusChanged";

    CSInterface.prototype.hostEnvironment = window.__adobe_cep__ ? JSON.parse(window.__adobe_cep__.getHostEnvironment()) : null;

    CSInterface.prototype.getHostEnvironment = function () {
        return this.hostEnvironment;
    };

    CSInterface.prototype.closeExtension = function () {
        window.__adobe_cep__.closeExtension();
    };

    CSInterface.prototype.getSystemPath = function (pathType) {
        var path = decodeURI(window.__adobe_cep__.getSystemPath(pathType));
        var OSVersion = this.getOSInformation();
        if (OSVersion.indexOf("Windows") >= 0) {
            path = path.replace("file:///", "");
        } else if (OSVersion.indexOf("Mac") >= 0) {
            path = path.replace("file://", "");
        }
        return path;
    };

    CSInterface.prototype.evalScript = function (script, callback) {
        if (callback === null || callback === undefined) {
            callback = function (result) { };
        }
        window.__adobe_cep__.evalScript(script, callback);
    };

    CSInterface.prototype.getApplicationID = function () {
        var appId = this.hostEnvironment.appId;
        return appId;
    };

    CSInterface.prototype.getHostCapabilities = function () {
        var hostCapabilities = JSON.parse(window.__adobe_cep__.getHostCapabilities());
        return hostCapabilities;
    };

    CSInterface.prototype.dispatchEvent = function (event) {
        if (typeof event.data == "object") {
            event.data = JSON.stringify(event.data);
        }
        window.__adobe_cep__.dispatchEvent(event);
    };

    CSInterface.prototype.addEventListener = function (type, listener, obj) {
        window.__adobe_cep__.addEventListener(type, listener, obj);
    };

    CSInterface.prototype.removeEventListener = function (type, listener, obj) {
        window.__adobe_cep__.removeEventListener(type, listener, obj);
    };

    CSInterface.prototype.requestOpenExtension = function (extensionId, params) {
        window.__adobe_cep__.requestOpenExtension(extensionId, params);
    };

    CSInterface.prototype.getExtensions = function (extensionIds) {
        var extensionIdsStr = JSON.stringify(extensionIds);
        var extensionsStr = window.__adobe_cep__.getExtensions(extensionIdsStr);
        var extensions = JSON.parse(extensionsStr);
        return extensions;
    };

    CSInterface.prototype.getNetworkPreferences = function () {
        var result = window.__adobe_cep__.getNetworkPreferences();
        var networkPre = JSON.parse(result);
        return networkPre;
    };

    CSInterface.prototype.initResourceBundle = function () {
        var resourceBundle = JSON.parse(window.__adobe_cep__.initResourceBundle());
        var resElms = document.querySelectorAll('[data-locale]');
        for (var n = 0; n < resElms.length; n++) {
            var resElm = resElms[n];
            var resKey = resElm.getAttribute('data-locale');
            if (resKey) {
                for (var key in resourceBundle) {
                    if (key.indexOf(resKey) === 0) {
                        var resValue = resourceBundle[key];
                        if (key.length == resKey.length) {
                            resElm.innerText = resValue;
                        } else {
                            var attrKey = key.substring(resKey.length + 1);
                            resElm.setAttribute(attrKey, resValue);
                        }
                    }
                }
            }
        }
        return resourceBundle;
    };

    CSInterface.prototype.dumpInstallationInfo = function () {
        return window.__adobe_cep__.dumpInstallationInfo();
    };

    CSInterface.prototype.getOSInformation = function () {
        var userAgent = navigator.userAgent;
        if ((navigator.platform == "Win32") || (navigator.platform == "Windows")) {
            var winVersion = "Windows";
            var winBit = "";
            if (userAgent.indexOf("Windows NT 10.0") > -1) {
                winVersion = "Windows 10";
            } else if (userAgent.indexOf("Windows NT 6.3") > -1) {
                winVersion = "Windows 8.1";
            } else if (userAgent.indexOf("Windows NT 6.2") > -1) {
                winVersion = "Windows 8";
            } else if (userAgent.indexOf("Windows NT 6.1") > -1) {
                winVersion = "Windows 7";
            }
            if (userAgent.indexOf("WOW64") > -1 || userAgent.indexOf("Win64") > -1) {
                winBit = " 64-bit";
            } else {
                winBit = " 32-bit";
            }
            return winVersion + winBit;
        } else if ((navigator.platform == "MacIntel") || (navigator.platform == "Macintosh")) {
            return "Mac OS X";
        }
        return "Unknown OS";
    };

    CSInterface.prototype.openURLInDefaultBrowser = function (url) {
        return cep.util.openURLInDefaultBrowser(url);
    };

    CSInterface.prototype.getExtensionID = function () {
        return window.__adobe_cep__.getExtensionId();
    };

    CSInterface.prototype.getScaleFactor = function () {
        return window.__adobe_cep__.getScaleFactor();
    };

    CSInterface.prototype.getCurrentApiVersion = function () {
        var apiVersion = JSON.parse(window.__adobe_cep__.getCurrentApiVersion());
        return apiVersion;
    };

    CSInterface.prototype.setPanelFlyoutMenu = function (menu) {
        if ("string" != typeof menu) {
            return;
        }
        window.__adobe_cep__.invokeSync("setPanelFlyoutMenu", menu);
    };

    CSInterface.prototype.updatePanelMenuItem = function (menuItemLabel, enabled, checked) {
        var ret = false;
        if (this.getHostCapabilities().EXTENDED_PANEL_MENU) {
            var itemStatus = new SystemPath();
            itemStatus.enabled = enabled;
            itemStatus.checked = checked;
            ret = window.__adobe_cep__.invokeSync("updatePanelMenuItem", menuItemLabel, JSON.stringify(itemStatus));
        }
        return ret;
    };

    CSInterface.prototype.registerInvalidCertificateCallback = function (callback) {
        return window.__adobe_cep__.registerInvalidCertificateCallback(callback);
    };

    CSInterface.prototype.registerKeyEventsInterest = function (keyEventsInterest) {
        return window.__adobe_cep__.registerKeyEventsInterest(keyEventsInterest);
    };

    CSInterface.prototype.setWindowTitle = function (title) {
        window.__adobe_cep__.invokeSync("setWindowTitle", title);
    };

    CSInterface.prototype.getWindowTitle = function () {
        return window.__adobe_cep__.invokeSync("getWindowTitle", "");
    };

    return CSInterface;
}));
