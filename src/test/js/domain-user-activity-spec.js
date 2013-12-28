
var expect = window.expect;
var describe = window.describe;
var it = window.it;


describe('UserActivity', function () {

    'use strict';

    describe('constructor', function () {

        it('construct the instance', function () {

            expect(new window.UserActivity(1, true)).not.toEqual(null);

        });
    });


    describe('toObject', function () {

        it('returns object representation of the instance', function () {

            var instance = new window.UserActivity(3, true);

            expect(instance.toObject()).toEqual({
                gotIpCount: 3,
                hasReviewed: true
            });
        });

    });

    describe('toJson', function () {

        it('returns JSON representation of the instance', function () {

            var instance = new window.UserActivity(3, true);

            expect(instance.toJson()).toBe('{"gotIpCount":3,"hasReviewed":true}');
        });

    });
});
