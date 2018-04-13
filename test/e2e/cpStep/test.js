module.exports = {
	'cpStep': function (browser) {
		browser
			.resizeWindow(1920, 1080)
			.url('http://localhost:1111/test/e2e/cpStep/template.html')
			.waitForElementVisible('input', 10000)
			.pause(1000)
			.click('input');
		for (var i = 0; i < 10; i++) {
			browser
				.sendKeys('input', browser.Keys.UP_ARROW);
		}
		browser
			.assert.containsText('h1', '30')
			.pause(1000)
			.end();
	}
};
