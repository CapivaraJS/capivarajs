module.exports = {
	'cpMax': function (browser) {
		browser
			.resizeWindow(1920, 1080)
			.url('http://localhost:1111/test/e2e/cpMax/template.html')
			.waitForElementVisible('input', 10000)
			.pause(1000)
			.setValue('input', ' 4')
			.pause(1000)
			.assert.containsText('input', '4')
			.click('input')
			.pause(1000)
			.assert.containsText('input', '5')
			.end();
	}
};
