

window.page = window.page || {};

window.page.index = (function (window, $) {
    'use strict';

    var IP_LOADING_ID = '#ip-loading';
    var IP_INPUT_ID = '#ip-input';
    var IP_RELOAD_BUTTON_CLASS = '.ip-reload-button';
    var IP_INDICATOR_CLASS = '.ip-indicator';

    var COUNTRY_ICON_CLASS = '.country-icon';
    var COUNTRY_ICON_DEFAULT = 'flag country-icon';

    var IP_LOAD_DONE = '.ip-load-done';

    var LINK_TO_HISTORY = '.link-to-records';

    var i18n = window.i18n;

    var exports = {};
    var index = exports;

    var askReview = function (userActivity) {

        setTimeout(function () {

            if (window.confirm(window.i18n.t('common.thanks_using_and_ask_review'))) {

                userActivity.hasReviewed = true;

                var repository = new window.UserActivityRepository();

                repository.store(userActivity);

                window.straw.browser.open('https://play.google.com/store/apps/details?id=com.kt3k.app.whatsmyip');

            }

        });

    };

    var handleUserActivity = function () {

        var repository = new window.UserActivityRepository();

        repository.retrieve().done(function (userActivity) {

            userActivity.incrementGotIpCount();

            repository.store(userActivity);

            if (window.ReviewRemindingSpecification.shouldRemindReview(userActivity)) {

                askReview(userActivity);

            }

        });
    };

    var gotNewIpRecord = function (ipRecord) {

        // toast welcome message
        window.straw.ui.toast(i18n.t('ip.done'));

        handleUserActivity();

        // new repository
        var repository = new window.IpRecordRepository();

        // record latest
        repository.getLatest().done(function (lastRecord) {

            repository.setLatest(ipRecord);

            if (ipRecord.ipAddr === lastRecord.ipAddr && ipRecord.isSameDay(new Date(lastRecord.createdAt))) {
                // if gotten record is same as the latest and recorded date is same
                // then skip history recoding
                return;
            }

            // add to list
            repository.add(ipRecord);
        });

        gotIpRecord(ipRecord);
    };

    var gotIpRecord = function (ipRecord) {

        fillIpAddr(ipRecord.ipAddr);
        fillCountryCode(ipRecord.countryCode);
    };

    var fillCountryCode = function (countryCode) {

        if (countryCode == null) {
            return;
        }

        $(COUNTRY_ICON_CLASS).addClass('flag-' + countryCode.toLowerCase());
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

        // reset country icon
        $(COUNTRY_ICON_CLASS).attr('class', COUNTRY_ICON_DEFAULT);

        // fetch ip and display
        window.IpRecordFactory.createFromGeoipReflector()
            .done(gotNewIpRecord)
            .fail(index.startLoading);

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
        $(IP_RELOAD_BUTTON_CLASS).click(index.startLoading);

        $(LINK_TO_HISTORY).click(function () {
            window.location.href = 'records.html';
        });
    };

    return exports;

}(window, window.$));
