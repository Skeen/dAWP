describe("Ice cream: ", function() {
	it("String i textbox should be empty", function() {
		browser.driver.get("http://localhost:8000/index.html");

		var err = browser.driver.findElement(by.id('error'));
		var sS = browser.driver.findElement(by.id('straw_syrup'));
		sS.click();

		expect(err.getAttribute('value')).toBe('');
	});

	it("String in textbox should display warning for sS and cS combo", function() {
		browser.driver.get("http://localhost:8000/index.html");

		var sS = browser.driver.findElement(by.id('straw_syrup'));
		var cS = browser.driver.findElement(by.id('caramel_sauce'));
		var err = browser.driver.findElement(by.id('error'));
		sS.click();
		cS.click();

		expect(err.getAttribute('value')).toBe('Strawberry syrup and caramel sauce cannot be chosen together');
	});

	it("String in textbox should display warning for to many toppings", function() {
		browser.driver.get("http://localhost:8000/index.html");

		var s = browser.driver.findElement(by.id('sprinkles'));
		var cC = browser.driver.findElement(by.id('choco_chip'));
		var sS = browser.driver.findElement(by.id('straw_syrup'));
		var bF = browser.driver.findElement(by.id('banana_flakes'));
		var err = browser.driver.findElement(by.id('error'));
		s.click();
		cC.click();
		sS.click();
		bF.click();

		expect(err.getAttribute('value')).toBe('A maximum of three toppings may be selected');
	});
});
