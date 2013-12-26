var $ = window.$;

var IP_LOADING_ID = '#ip-loading';
var IP_INPUT_ID = '#ip-input';
var IP_RELOAD_BUTTON_CLASS = '.ip-reload-button';
var IP_INDICATOR_CLASS = '.ip-indicator';

var IP_LOAD_DONE = '.ip-load-done';

var LINK_TO_HISTORY = '.link-to-records';

window.common = (function (window) {
    'use strict';

    var exports = {};

    var common = exports;

    common.scan = function () {
        window.i18n.scan();
    };

    common.getLanguage = function (language) {

        if (language) {
            return $.Deferred().resolve(language).promise();
        }

        return window.straw.locale.getLanguage();
    };

    common.initI18n = function () {

        var i18n = window.i18n;

        i18n.setAvailableLanguages(['en', 'ja']);

        return window.common.getLanguage(window.config.language).pipe(function (language) {

            i18n.setLanguage(language);

            return i18n.loadScript('i18n/{LANGUAGE}.js');

        });
    };

    return exports;

}(window));

window.index = (function (window) {
    'use strict';

    var i18n = window.i18n;

    var exports = {};
    var index = exports;

    var gotIpRecord = function (ipRecord) {

        // toast welcome message
        window.straw.ui.toast(i18n.t('ip.done'));

        // new repository
        var repository = new window.IpRecordRepository();

        // record latest
        repository.setLatest(ipRecord);

        // add to list
        repository.add(ipRecord);

        fillIpAddr(ipRecord.ipAddr);
    };

    var fillIpAddr = function (ipAddr) {

        // set ip label
        $(IP_INPUT_ID).val(ipAddr);

        // stop spin and thumbs up
        $(IP_LOADING_ID).removeClass('fa-refresh').removeClass('fa-spin').addClass('fa-thumbs-o-up');

        // fill info color
        $(IP_INDICATOR_CLASS).addClass('alert-info');


        $(IP_LOAD_DONE).css('display', 'block');

        window.common.scan();
    };

    index.startLoading = function () {

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
            .done(gotIpRecord)
            .fail(window.index.startLoading);

        window.common.scan();
    };

    index.main = function () {

        window.common.initI18n().done(function () {

            window.common.scan();

            index.initEvents();

            var repository = new window.IpRecordRepository();

            repository.getLatest().done(function (ipRecord) {

                if (ipRecord != null && ipRecord.isFresh()) {

                    gotIpRecord(ipRecord);

                } else {

                    index.startLoading();

                }

            });

        });

    };

    index.initEvents = function () {
        $(IP_RELOAD_BUTTON_CLASS).click(window.index.startLoading);

        $(LINK_TO_HISTORY).click(function () {
            window.location.href = 'records.html';
        });
    };

    return exports;

}(window));
