module.exports = {
	'cpRepeat': function (browser) {
		browser
			.resizeWindow(1920, 1080)
			.url('http://localhost:1111/test/e2e/cpRepeat/template.html')
			.waitForElementVisible('button', 10000)
			.pause(1000)
			.assert.containsText('li:nth-child(1) p', 'John')
			.assert.containsText('li:nth-child(2) p', 'Bob')
			.click('button')
			.pause(1000)
			.assert.containsText('li:nth-child(3) p', 'Anna')
			.end();
	}
};