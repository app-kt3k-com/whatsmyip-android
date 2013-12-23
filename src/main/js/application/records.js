
window.page = window.page || {};

window.page.records = (function (window) {
    'use strict';

    var $ = window.$;

    var exports = {};
    var records = exports;

    records.initEvents = function () {
        $('.some-class').click(function () {});
    };


    records.init = function () {

        // init repository
        var repository = new window.IpRecordRepository();

        repository.getAll().done(function (ipRecords) {
            $('.debug').text(JSON.stringify(ipRecords));
        });

    };


    records.main = function () {

        window.common.initI18n().done(function () {

            window.common.scan();

            records.initEvents();

            records.init();

        });

    };

    return exports;

}(window));
