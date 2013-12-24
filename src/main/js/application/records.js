
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
            //$('.debug').text(JSON.stringify(ipRecords));

            var table = $('<table class="table" />');

            table.append($('<tr><th>ip address</th><th>date</th></tr>'));

            for (var i = 0; i < ipRecords.length; i++) {
                var record = ipRecords[i];

                var date = new Date(record.createdAt);

                var format = date.getFullYear() + '/' + date.getMonth() + '/' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

                table.append($('<tr><td>' + record.ipAddr + '</td><td>' + format + '</td></tr>'));
            }

            $('.debug').append(table);
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
