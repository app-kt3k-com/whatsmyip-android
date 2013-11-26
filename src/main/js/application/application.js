var $ = window.$;

var IP_LOADING_ID = '#ip-loading';
var IP_INPUT_ID = '#ip-input';
var IP_RELOAD_BUTTON_CLASS = '.ip-reload-button';
var IP_INDICATOR_CLASS = '.ip-indicator';

var IP_LOAD_DONE = '.ip-load-done';

var LINK_TO_HISTORY = '.link-to-history';

window.common = {};

window.index = {};

window.common.scan = function () {
    'use strict';

    window.i18n.scan();
};

var displayNewIpRecord = function (ipRecord) {
    'use strict';

    var i18n = window.i18n;

    // toast welcome message
    window.straw.ui.toast(i18n.t('ip.done'));

    fillIpAddr(ipRecord.ipAddr);
};

var fillIpAddr = function (ipAddr) {
    'use strict';

    // set ip label
    $(IP_INPUT_ID).val(ipAddr);

    // stop spin and thumbs up
    $(IP_LOADING_ID).removeClass('fa-refresh').removeClass('fa-spin').addClass('fa-thumbs-o-up');

    // fill info color
    $(IP_INDICATOR_CLASS).addClass('alert-info');


    $(IP_LOAD_DONE).css('display', 'block');

    window.common.scan();
};

window.index.startLoading = function () {
    'use strict';

    var i18n = window.i18n;

    // toast welcome message
    window.straw.ui.toast(i18n.t('ip.start_loading'));

    // remove ip label
    $(IP_INPUT_ID).val('');

    // spin refresh icon
    $(IP_LOADING_ID).addClass('fa-refresh').addClass('fa-spin').removeClass('fa-thumbs-o-up');

    // remove info color
    $(IP_INDICATOR_CLASS).removeClass('alert-info');

    $(IP_LOAD_DONE).css('display', 'none');

    // fetch ip and display
    window.IpRecordFactory.createUsingDynDNS()
        .done(displayNewIpRecord)
        .fail(window.index.startLoading);

    window.common.scan();
};

window.common.initI18n = function () {
    'use strict';

    var i18n = window.i18n;

    i18n.setAvailableLanguages(['en', 'ja']);

    return window.common.getLanguage(window.config.language).pipe(function (language) {

        i18n.setLanguage(language);

        return i18n.loadScript('i18n/{LANGUAGE}.js');

    });
};

window.common.getLanguage = function (language) {
    'use strict';

    if (language) {
        return $.Deferred().resolve(language).promise();
    }

    return window.straw.locale.getLanguage();
};

window.index.main = function () {
    'use strict';

    window.common.initI18n().done(function () {

        window.common.scan();

        window.index.initEvents();

        window.index.startLoading();

    });

};

window.index.initEvents = function () {
    'use strict';

    $(IP_RELOAD_BUTTON_CLASS).click(window.index.startLoading);

    $(LINK_TO_HISTORY).click(function () {
        window.location.href = 'history.html';
    });
};
