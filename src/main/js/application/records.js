
window.page = window.page || {};

window.page.records = (function (window) {
    'use strict';

    var $ = window.$;

    var exports = {};
    var recoeds = exports;

    recoeds.initEvents = function () {
        $('.some-class').click(function () {});
    };

    recoeds.startLoading = function () {
    };

    recoeds.main = function () {

        window.common.initI18n().done(function () {

            window.common.scan();

            recoeds.initEvents();

            recoeds.startLoading();

        });

    };

    return exports;

}(window));
