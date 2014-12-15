describe('Fun Sort1', function() {
	it('gelValue should be undefined', function() {
		expect(getValue('1')).toBe(undefined);
	});

	it('gelValue should return string 3', function() {
		expect(getValue('3 dsaasd 2')).toEqual('2');
	});
});
