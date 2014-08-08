
window.common = (function (window, $, t10, straw) {
    'use strict';

    var APP_ID = 'com.kt3k.app.whatsmyip';

    var exports = {};

    exports.scan = function () {
        t10.scan();
    };

    exports.getLanguage = function (language) {

        if (language) {
            return $.Deferred().resolve(language).promise();
        }

        return straw.locale.getLanguage();
    };

    exports.initI18n = function () {

        t10.setAvailableLanguages(['en', 'ja']);

        return exports.getLanguage(window.config.language).pipe(function (language) {

            t10.setLanguage(language);

            return t10.loadScript('i18n/{LANGUAGE}.js');

        });
    };

    exports.openMarketLink = function (id) {

        if (id == null) {
            id = APP_ID;
        }

        straw.uri.open('market://details?id=' + id).fail(function () {
            straw.browser.open('https://play.google.com/store/apps/id=' + id);
        });
    };

    return exports;

}(window, window.$, window.t10, window.straw));
