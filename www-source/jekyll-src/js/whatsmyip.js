var $ = window.$;

var handleDynDNSResponse = function (args) {
    'use strict';

    var obj = parseDynDNS(args.content);

    fillIpAddrAndRemoveProgressBar(obj.addr);
};

var fillIpAddrAndRemoveProgressBar = function (ipAddr) {
    'use strict';

    $('#ip-addr-progress-bar').css('display', 'none');
    $('#ip-addr-label').text(ipAddr).css('display', 'block');
};

var reIpAddr = /(\d+\.\d+\.\d+\.\d+)/;

var extractIpAddrFromText = function (text) {
    'use strict';

    var match = reIpAddr.exec(text);

    if (match) {
        return match[1];
    } else {
        return null;
    }
};

var parseDynDNS = function (text) {
    'use strict';

    var doc = new DOMParser().parseFromString(text, 'text/xml');

    var bodyText = $('body', doc).text();

    return {addr: extractIpAddrFromText(bodyText)};
};


setTimeout(function () {
    'use strict';

    window.straw.exec('ui', 'toast', {text: 'Welcome to My IP Address Finder app!'}, function () {}, function () {});
    window.straw.http.get('http://checkip.dyndns.com/').done(handleDynDNSResponse);
}, 100);
