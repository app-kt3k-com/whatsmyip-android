
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

            table.append($('<tr><th><i class="fa fa-info-circle"></i> IP Address</th><th><i class="fa fa-calendar-o"></i> Date</th><th><i class="fa fa-globe"></i></th></tr>'));

            for (var i = 0; i < ipRecords.length; i++) {
                var record = ipRecords[i];

                var date = new Date(record.createdAt);

                var format = date.getFullYear() + '/' + date.getMonth() + '/' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

                var countryFlagClass = record.countryCode != null ? record.countryCode.toLowerCase() : 'null';

                table.append($('<tr><td>' + record.ipAddr + '</td><td>' + format + '</td><td><img class="flag flag-' + countryFlagClass + '" /></td></tr>'));
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
