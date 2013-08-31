var handleDynDNSResponse = function (args) {
    var obj = parseDynDNS(args.content);

    alert(obj.addr);
}

var reIPAddr = /(\d+\.\d+\.\d+\.\d+)/;

var extractIPAddrFromText = function (text) {
    var match = reIPAddr.exec(text);

    if (match) {
        return match[1];
    } else {
        return null;
    }
};

var parseDynDNS = function (text) {
    var doc = new DOMParser().parseFromString(text, 'text/xml');

    var bodyText = $('body', doc).text();

    return {addr: extractIPAddrFromText(bodyText)};
};


setTimeout(function () {
    window.straw.exec('ui', 'toast', {text: 'toast through straw plugin'}, function () {}, function () {});
    window.straw.http.get('http://checkip.dyndns.com/').done(handleDynDNSResponse);
}, 100);

