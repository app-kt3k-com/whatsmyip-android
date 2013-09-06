
describe('IpRecord', function () {

    it('can be created', function () {
        expect(new IpRecord({
            ipAddr: '8.8.8.8',
            ctime: 1300000000,
            countryCode: 'JPN'
        })).not.toBe(null);
    });

    it('has fields ipAddr, ctime and countryCode', function () {
        var ipRec = new IpRecord({
            ipAddr: '8.8.8.8',
            ctime: 1300000000,
            countryCode: 'JPN'
        });

        expect(ipRec.ipAddr).toBe('8.8.8.8');
        expect(ipRec.ctime).toBe(1300000000);
        expect(ipRec.countryCode).toBe('JPN');
    });

    it('is serializable as JSON format of object with 3 keys ipAddr, ctime and countryCode', function () {
        var ipRec = new IpRecord({
            ipAddr: '8.8.8.8',
            ctime: 1300000000,
            countryCode: 'JPN'
        });

        var json = ipRec.serialize();

        expect(typeof json).toBe('string');

        var object = JSON.parse(json);

        expect(object).toEqual({
            ipAddr: '8.8.8.8',
            ctime: 1300000000,
            countryCode: 'JPN'
        });
    });

});
