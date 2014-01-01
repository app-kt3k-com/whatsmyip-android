
window.common = (function (window, $) {
    'use strict';

    var APP_ID = 'com.kt3k.app.whatsmyip';

    var exports = {};

    var common = exports;

    common.scan = function () {
        window.i18n.scan();
    };

    common.getLanguage = function (language) {

        if (language) {
            return $.Deferred().resolve(language).promise();
        }

        return window.straw.locale.getLanguage();
    };

    common.initI18n = function () {

        var i18n = window.i18n;

        i18n.setAvailableLanguages(['en', 'ja']);

        return window.common.getLanguage(window.config.language).pipe(function (language) {

            i18n.setLanguage(language);

            return i18n.loadScript('i18n/{LANGUAGE}.js');

        });
    };

    exports.openMarketLink = function (id) {

        if (id == null) {
            id = APP_ID;
        }

        window.straw.uri.open('market://details?id=' + id).fail(function () {
            window.straw.browser.open('https://play.google.com/store/apps/id=' + id);
        });
    };

    return exports;

}(window, window.$));
