// IpAddr model and its factory class

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

window.IpRecordFactory = (function () {

    var exports = {};

    exports.createFromDynDNSResponse = function (text) {
        var obj = parseDynDNS(text);

        return new window.IpAddr({
            ipAddr: obj.addr,
            ctime: (new Date).getTime()
        });
    };

    exports.createFromSerializedString = function (str) {
        var args;

        try {
            args = JSON.parse(str);
        } catch (e) {
            return null;
        };

        return new window.IpAddr(args);
    };

    var reIpAddr = /(\d+\.\d+\.\d+\.\d+)/;

    var extractIpAddrFromText = function (text) {
        var match = reIpAddr.exec(text);

        if (match) {
            return match[1];
        } else {
            return null;
        }
    };

    var parseDynDNS = function (text) {
        var doc = new DOMParser().parseFromString(text, 'text/xml');

        var bodyText = $('body', doc).text();

        return {
            addr: extractIpAddrFromText(bodyText)
        };
    };

    return exports;

}());
