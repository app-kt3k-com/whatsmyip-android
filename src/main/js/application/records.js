
window.page = window.page || {};

window.page.records = (function (window) {
    'use strict';

    var $ = window.$;

    var exports = {};
    var records = exports;

    records.initEvents = function () {
        $('.some-class').click(function () {});
    };

    records.startLoading = function () {
    };

    records.main = function () {

        window.common.initI18n().done(function () {

            window.common.scan();

            records.initEvents();

            records.startLoading();

        });

    };

    return exports;

}(window));
