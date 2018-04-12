module.exports = {
	'cpStep': function (browser) {
		browser
			.resizeWindow(1920, 1080)
			.url('http://localhost:1111/test/e2e/cpStep/template.html')
			.waitForElementVisible('input', 10000)
			.pause(1000)
			.setValue('input', ' 0')
			.pause(1000)
			.assert.containsText('input', '0')
			.click('input')
			.pause(1000)
			.assert.containsText('input', '3')
			.end();
	}
};
