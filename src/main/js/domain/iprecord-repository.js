// Ip record repository class

window.IpRecordRepository = (function ($, straw) {
    'use strict';

    var MAX_NUM_IP_RECORD = 256;

    var IP_RECORD_KEY = 'ip-records';
    var IP_LATEST_KEY = 'ip-latest';

    var exports = function () {
    };

    var prototype = exports.prototype;


    prototype.getAll = function () {
        return straw.sharedPreferences.get(IP_RECORD_KEY, []).pipe(function (records) {
            return records.map(function (obj) {
                return window.IpRecordFactory.createFromObject(obj);
            });
        });
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


    prototype.getLatest = function () {
        return straw.sharedPreferences.get(IP_LATEST_KEY, []).pipe(function (obj) {
            return new window.IpRecordFactory.createFromObject(obj);
        });
    };


    prototype.setLatest = function (ipRecord) {
        return straw.sharedPreferences.set(IP_LATEST_KEY, ipRecord.toObject());
    };


    return exports;

}(window.$, window.straw));
