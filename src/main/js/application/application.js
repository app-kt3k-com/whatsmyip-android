var $ = window.$;

var IP_LOADING_ID = '#ip-loading';
var IP_INPUT_ID = '#ip-input';
var IP_RELOAD_BUTTON_ID = '#ip-reload-button';

var uiChangeHook = function () {
    'use strict';

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
    window.IpRecordFactory.createUsingDynDNS()
        .done(displayNewIpRecord)
        .fail(window.startLoading);

    uiChangeHook();
};

window.index = {};

window.index.main = function () {
    'use strict';

    var i18n = window.i18n;

    i18n.setAvailableLanguages(['en', 'ja']);

    window.straw.locale.getLanguage().done(function (language) {
        window.alert(language);
        i18n.setLanguage(language);


        i18n.loadScript('i18n/{LANGUAGE}.js').done(function () {

            uiChangeHook();

            $(IP_RELOAD_BUTTON_ID).click(window.startLoading);

            window.startLoading();

        });

    });

};
