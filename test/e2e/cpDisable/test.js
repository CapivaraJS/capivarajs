module.exports = {
	'cpDisable': function (browser) {
		browser
			.resizeWindow(1920, 1080)
			.url('http://localhost:1111/test/e2e/cpDisable/template.html')
			.waitForElementVisible('button', 10000)
			.pause(1000)
			.assert.containsText('button', 'Click me')
			.click('button')
			.pause(1000)
			.assert.containsText('button', 'Click me')
			.pause(1000)
			.end();
	}
};