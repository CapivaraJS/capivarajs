module.exports = {
	'cpMax': function (browser) {
		browser
			.resizeWindow(1920, 1080)
			.url('http://localhost:1111/test/e2e/cpMax/template.html')
			.waitForElementVisible('input', 10000)
			.pause(1000)
			.click('input');
		for (let i = 0; i < 10; i++) {
			browser
				.sendKeys('input', browser.Keys.RIGHT_ARROW);
		}
		browser
			.assert.containsText('h1', '5')
			.pause(1000)
			.end();
	}
};
