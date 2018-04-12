module.exports = {
	'cpIf': function (browser) {
		browser
			.resizeWindow(1920, 1080)
			.url('http://localhost:1111/test/e2e/cpIf/template.html')
			.waitForElementVisible('button', 10000)
			.waitForElementNotPresent('h1', 1000)
			.pause(1000)
			.click('button')
			.pause(1000)
			.assert.containsText('h1', 'This is a simple text.')
			.pause(1000)
			.end();
	}
};