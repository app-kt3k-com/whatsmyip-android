// Ip record repository class

window.IpRecordRepository = (function ($, straw) {
    'use strict';

    var MAX_NUM_IP_RECORD = 256;

    var IP_RECORD_KEY = 'ip-records';

    var exports = function () {
    };

    var prototype = exports.prototype;

    prototype.getAll = function () {
        return straw.sharedPreferences.get(IP_RECORD_KEY, []);
    };

    prototype.add = function (ipRecord) {

        var self = this;

        return this.getAll().pipe(function (records) {

            records.push(ipRecord.toObject());

            records = records.slice(-MAX_NUM_IP_RECORD);

            return self.save(records);

        }).promise();
    };

    prototype.save = function (records) {
        return straw.sharedPreferences.set(IP_RECORD_KEY, records);

    };

    return exports;

}(window.$, window.straw));
