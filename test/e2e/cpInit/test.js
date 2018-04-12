module.exports = {
	'cpInit': function (browser) {
		browser
			.resizeWindow(1920, 1080)
			.url('http://localhost:1111/test/e2e/cpInit/template.html')
			.waitForElementVisible('h1', 10000)
			.assert.containsText('h1', 'CpInit Test')
			.pause(5000)
			.assert.containsText('h1', 'CpInit complete')
			.end();
	}
};