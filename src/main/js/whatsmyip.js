var $ = window.$;

var IP_ADDR_PROGRESS_BAR_ID = '#ip-addr-progress-bar';
var IP_ADDR_LABEL_ID = '#ip-addr-label';

var displayNewIpRecord = function (ipRecord) {
    'use strict';

    fillIpAddrAndRemoveProgressBar(ipRecord.ipAddr);
};

var fillIpAddrAndRemoveProgressBar = function (ipAddr) {
    'use strict';

    $(IP_ADDR_PROGRESS_BAR_ID).css('display', 'none');
    $(IP_ADDR_LABEL_ID).text(ipAddr).css('display', 'block');
};

$(function () {
    'use strict';

    window.straw.exec('ui', 'toast', {text: 'Welcome to My IP Address Finder app!'}, function () {}, function () {});
    window.IpRecordFactory.createUsingDynDNS().done(displayNewIpRecord);
});
