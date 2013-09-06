// Ip record factory class

window.IpRecordFactory = (function ($, straw) {
    'use strict';

    var exports = {};

    exports.createUsingDynDNS = function () {
        return straw.http.get('http://checkip.dyndns.com/').pipe(function (obj) {
            return new exports.createFromDynDNSRespnseText(obj.content);
        });
    };

    exports.createFromDynDNSResponseText = function (text) {
        var obj = parseDynDNS(text);

        return new window.IpAddr({
            ipAddr: obj.addr,
            ctime: new Date().getTime()
        });
    };

    exports.createFromSerializedString = function (str) {
        var args;

        try {
            args = JSON.parse(str);
        } catch (e) {
            return null;
        }

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

}(window.$, window.straw));
