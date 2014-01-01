
window.common = (function (window, $) {
    'use strict';

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

    return exports;

}(window, window.$));
