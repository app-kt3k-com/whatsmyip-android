

describe('IpRecordFactory', function () {
    'use strict';

    var IpRecord = window.IpRecord;
    var IpRecordFactory = window.IpRecordFactory;

    it('is a object', function () {
        expect(IpRecordFactory).not.toEqual(null);
        expect(typeof IpRecordFactory).toBe('object');
    });

    describe('createFromDynDNSResponseText', function () {

        it('creates a IpRecord from dyndns api response text', function () {
            var ipRec = IpRecordFactory.createFromDynDNSResponseText('<html><body>Ip Address is: 8.8.8.8</body></html>');

            expect(ipRec).not.toEqual(null);
            expect(ipRec instanceof IpRecord).toBe(true);

            expect(ipRec.ipAddr).toBe('8.8.8.8');
            expect(typeof ipRec.createdAt).toBe('number');
            expect(ipRec.countryCode).toEqual(null);
        });

    });

});
