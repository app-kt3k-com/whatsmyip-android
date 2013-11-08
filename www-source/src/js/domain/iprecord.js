// Ip record model class

window.IpRecord = (function () {
    'use strict';

    var exports = function (args) {
        this.ipAddr = args.ipAddr;
        this.createdAt = args.createdAt;
        this.countryCode = args.countryCode;
    };

    var pt = exports.prototype;

    pt.setCountryCode = function (code) {
        this.countryCode = code;
    };


    pt.serialize = function () {
        return JSON.stringify(this.toObject());
    };


    pt.toObject = function () {
        return {
            ipAddr: this.ipAddr,
            createdAt: this.createdAt,
            countryCode: this.countryCode
        };
    };


    return exports;

}());
