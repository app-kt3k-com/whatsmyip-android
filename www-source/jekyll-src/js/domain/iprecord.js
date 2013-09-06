// Ip record model class

window.IpRecord = (function () {
    'use strict';

    var exports = function (args) {
        this.ipAddr = args.ipAddr;
        this.ctime = args.ctime;
        this.countryCode = args.countryCode;
    };

    var pt = exports.prototype;

    pt.setCountryCode = function (code) {
        this.countryCode = code;
    };

    pt.serialize = function () {
        return JSON.stringify({
            ipAddr: this.ipAddr,
            ctime: this.ctime,
            countryCode: this.countryCode
        });
    };

    return exports;
}());
