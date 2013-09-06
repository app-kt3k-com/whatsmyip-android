
describe('IpAddr', function () {

    it('can be created', function () {
        expect(new IpAddr({
            ipAddr: '8.8.8.8',
            ctime: 1300000000,
            countryCode: 'JPN'
        })).not.toBe(null);
    });

});
