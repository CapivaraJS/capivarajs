module.exports = {
	'cpMin': function (browser) {
		browser
			.resizeWindow(1920, 1080)
			.url('http://localhost:1111/test/e2e/cpMin/template.html')
			.waitForElementVisible('input', 10000)
			.pause(1000)
			.click('input');
		for (let i = 0; i < 100; i++) {
			browser
				.sendKeys('input', browser.Keys.DOWN_ARROW);
		}
		browser
			.assert.containsText('h1', '0')
			.pause(1000)
			.end();
	}
};
