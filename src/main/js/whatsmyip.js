var $ = window.$;

var IP_LOADING_ID = '#ip-loading';
var IP_INPUT_ID = '#ip-input';
var IP_RELOAD_BUTTON_ID = '#ip-reload-button';

var uiChangeHook = function () {
    window.i18n.scan();
};

var displayNewIpRecord = function (ipRecord) {
    'use strict';

    // toast welcome message
    window.straw.ui.toast('Done!');

    fillIpAddrAndRemoveProgressBar(ipRecord.ipAddr);
};

var fillIpAddrAndRemoveProgressBar = function (ipAddr) {
    'use strict';

    // set ip label
    $(IP_INPUT_ID).val(ipAddr);

    // stop spin and thumbs up
    $(IP_LOADING_ID).removeClass('fa-refresh').removeClass('fa-spin').addClass('fa-thumbs-o-up');

    // fill info color
    $(IP_RELOAD_BUTTON_ID).addClass('alert-info');

    uiChangeHook();
};

window.startLoading = function () {
    'use strict';

    // toast welcome message
    window.straw.ui.toast('Start checking ip address...');

    // remove ip label
    $(IP_INPUT_ID).val('');

    // spin refresh icon
    $(IP_LOADING_ID).addClass('fa-refresh').addClass('fa-spin').removeClass('fa-thumbs-o-up');

    // remove info color
    $(IP_RELOAD_BUTTON_ID).removeClass('alert-info');

    // fetch ip and display
    window.IpRecordFactory.createUsingDynDNS().done(displayNewIpRecord);

    uiChangeHook();
};

window.indexMain = function () {
    'use strict';

    $.getScript('i18n/en.js').done(function () {

      uiChangeHook();

      $(IP_RELOAD_BUTTON_ID).click(window.startLoading);

      window.startLoading();

    });
};
