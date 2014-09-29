
window.infrastructure = window.infrastructure || {};

window.infrastructure.externalService = (function (straw) {
    'use strict';

    var APP_ID = 'com.kt3k.app.whatsmyip';

    var exports = {};

    exports.openMarketLink = function () {

        straw.uri.open('market://details?id=' + APP_ID).then(null, function () {

            straw.browser.open('https://play.google.com/store/apps/id=' + APP_ID);

        });

    };

    return exports;

}(window.straw));
