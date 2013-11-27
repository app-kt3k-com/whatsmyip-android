
var describe = window.describe;
var expect = window.expect;
var it = window.it;

var sinon = window.sinon;
var straw = window.straw;

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
            var array = [];
            stub.withArgs('ip-records', array).returns('ok');

            var repo = new IpRecordRepository();
            var result = repo.getAll();

            expect(result).toBe('ok');
        });
    });


    describe('add', function () {
    });


    describe('save', function () {
    });


});
