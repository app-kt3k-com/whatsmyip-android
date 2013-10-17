// Ip record factory class

window.IpRecordFactory = (function ($, straw) {
    'use strict';

    var exports = {};

    /**
     * (Async) create IpRecord object from a http request to checkip.dyndns.com/
     * @return promise which will be done with IpRecord object or failed with error messages
     */
    exports.createUsingDynDNS = function () {
        return straw.http.get('http://checkip.dyndns.com/').pipe(function (obj) {
            return new exports.createFromDynDNSResponseText(obj.content);
        });
    };

    /**
     * create IpRecord object from response text from http://checkip.dyndns.com/
     * @param {string} text response text from http://checkip.dyndns.com/
     * @return {IpRecord} IpRecord object representing current ip address
     */
    exports.createFromDynDNSResponseText = function (text) {
        var obj = parseDynDNS(text);

        return new window.IpRecord({
            ipAddr: obj.addr,
            ctime: new Date().getTime()
        });
    };

    /**
     * create IpRecord object from serialized JSON expression
     * @param {string} str JSON expression of IpRecord
     * @return {IpRecord} IpRecord represented by given JSON expression
     */
    exports.createFromSerializedString = function (str) {
        var args;

        try {
            args = JSON.parse(str);
        } catch (e) {
            return null;
        }

        return new window.IpRecord(args);
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
