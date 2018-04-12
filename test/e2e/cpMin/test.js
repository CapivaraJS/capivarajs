module.exports = {
	'cpMax': function (browser) {
		browser
			.resizeWindow(1920, 1080)
			.url('http://localhost:1111/test/e2e/cpMin/template.html')
			.waitForElementVisible('input', 10000)
			.pause(1000)
			.setValue('input', ' 1')
			.pause(1000)
			.assert.containsText('input', '1')
			.click('input')
			.pause(1000)
			.assert.containsText('input', '0')
			.end();
	}
};
