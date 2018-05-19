module.exports = {
	'cpElse': function (browser) {
		browser
			.resizeWindow(1920, 1080)
			.url('http://localhost:1111/test/e2e/cpElse/template.html')
			.waitForElementVisible('button', 10000)
			.pause(1000)
			.assert.containsText('button', 'Click to show!')
			.click('button')
			.pause(1000)
			.assert.containsText('h1', 'This is an other text.')
			.pause(1000)
			.end();
	}
};
