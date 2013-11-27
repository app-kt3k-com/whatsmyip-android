
var describe = window.describe;
var expect = window.expect;
var it = window.it;

var sinon = window.sinon;
var straw = window.straw;

var $ = window.$;

describe('IpRecordRepository', function () {
    'use strict';

    //var IpRecord = window.IpRecord;
    var IpRecordRepository = window.IpRecordRepository;

    it('is a function', function () {
        expect(IpRecordRepository).not.toEqual(null);
        expect(typeof IpRecordRepository).toBe('function');
    });


    describe('getAll', function () {

        it('calls get method of straw.sharedPreferences plugin with appropriate arguments and returns its value', function () {

            var stub = sinon.stub(straw.sharedPreferences, 'get');

            stub.withArgs('ip-records', []).returns('ok');

            var repo = new IpRecordRepository();
            var result = repo.getAll();

            expect(result).toBe('ok');

            stub.restore();
        });
    });


    describe('add', function () {

        it('adds item to repository', function () {

            var repo = new IpRecordRepository();

            var array0 = [];
            var array1 = [];

            // create MAX(=256) length arrays
            for (var i = 0; i < 256; i++) {
                array0.push('abc');
                array1.push('abc');
            }

            var stubGetAll = sinon.stub(repo, 'getAll');
            stubGetAll.returns($.Deferred().resolve(array0));

            array1.shift(); // first element is dropped
            array1.push('bcd'); // new item pushed

            var stubSave = sinon.stub(repo, 'save');
            stubSave.withArgs(array1).returns($.Deferred().resolve(true));

            repo.add({toObject: function () {
                return 'bcd';
            }}).done(function (result) {
                expect(result).toBe(true);
            }).fail(function () {
                expect(true).toBe(false);
            });

        });

        it('adds item to repository and drop first one if max num exceeded', function () {

            var repo = new IpRecordRepository();

            var stubGetAll = sinon.stub(repo, 'getAll');
            stubGetAll.returns($.Deferred().resolve(['abc', 'def']));

            var stubSave = sinon.stub(repo, 'save');
            stubSave.withArgs(['abc', 'def', 'ghi']).returns($.Deferred().resolve(true));

            repo.add({toObject: function () {
                return 'ghi';
            }}).done(function (result) {
                expect(result).toBe(true);
            }).fail(function () {
                expect(true).toBe(false);
            });

        });
    });


    describe('save', function () {
    });


});
