// straw-android-plugin

straw.http = (function (straw) {
    'use strict';

    var HTTP_PLUGIN = 'http';
    var ACTION_GET = 'get';

    var exports = {
        get: function (url) {
            var d = $.Deferred();

            straw.exec(HTTP_PLUGIN, ACTION_GET, {
                url: url
            }, function (x) {
                d.resolve(x);
            }, function (x) {
                d.reject(x);
            });

            return d;
        }
    };

    return exports;
}(straw));
